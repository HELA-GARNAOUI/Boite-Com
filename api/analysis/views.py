from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.utils import timezone
from users.models import ClientProfile
from users.permissions import IsStaffUser, IsClientUser
from .models import DigitalPostureAnalysis, Recommendation, ActionPlan
from .serializers import (
    DigitalPostureAnalysisSerializer, 
    DigitalPostureCreateSerializer,
    RecommendationSerializer, 
    ActionPlanSerializer
)
from .tasks import generate_analysis_report
import logging

logger = logging.getLogger(__name__)

class DigitalPostureAnalysisViewSet(viewsets.ModelViewSet):
    """
    API endpoint for digital posture analysis
    """
    queryset = DigitalPostureAnalysis.objects.all().order_by('-analysis_date')
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return DigitalPostureCreateSerializer
        return DigitalPostureAnalysisSerializer
    
    def _get_client_profile(self, user):
        """Helper method to get or create client profile"""
        try:
            return user.client_profile
        except ClientProfile.DoesNotExist:
            # Create a basic client profile if it doesn't exist
            return ClientProfile.objects.create(
                user=user,
                company_name=f"{user.get_full_name()}'s Company",
                industry="Not specified",
                digital_maturity_score=0.0
            )
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            try:
                client_profile = user.client_profile
                return self.queryset.filter(client=client_profile)
            except ClientProfile.DoesNotExist:
                client_profile = self._get_client_profile(user)
                return self.queryset.filter(client=client_profile)
        # Staff and admins can see all analyses
        return self.queryset
    
    def list(self, request, *args, **kwargs):
        """Get all analyses for the client with initial state if none exist"""
        queryset = self.get_queryset()
        
        if not queryset.exists() and request.user.role == 'client':
            # Return initial state for new clients
            client_profile = self._get_client_profile(request.user)
            return Response({
                'analyses': [],
                'initial_state': {
                    'has_analysis': False,
                    'client_profile': {
                        'company_name': client_profile.company_name,
                        'industry': client_profile.industry,
                        'digital_maturity_score': client_profile.digital_maturity_score
                    },
                    'setup_required': True,
                    'setup_steps': [
                        {
                            'id': 'profile',
                            'title': 'Complete Company Profile',
                            'completed': bool(client_profile.company_name and client_profile.industry != 'Not specified'),
                            'description': 'Add your company details to get personalized recommendations'
                        },
                        {
                            'id': 'analysis',
                            'title': 'Generate Digital Posture Analysis',
                            'completed': False,
                            'description': 'Get your digital maturity score and recommendations'
                        }
                    ]
                }
            })
        
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'analyses': serializer.data,
            'initial_state': None
        })
    
    def create(self, request, *args, **kwargs):
        """Create a new analysis with initial recommendations"""
        try:
            client_profile = self._get_client_profile(request.user)
            
            # Create the analysis
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                analysis = serializer.save(client=client_profile)
                
                # Create initial recommendations
                self._create_initial_recommendations(analysis)
                
                # Update client's digital maturity score
                client_profile.digital_maturity_score = analysis.digital_maturity_score
                client_profile.save()
                
                return Response(
                    self.get_serializer(analysis).data,
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            logger.error(f"Error creating analysis: {str(e)}", exc_info=True)
            return Response({
                'error': 'An error occurred while creating the analysis',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def _create_initial_recommendations(self, analysis):
        """Create initial recommendations based on the analysis"""
        # Add basic recommendations based on the analysis score
        score = analysis.digital_maturity_score
        
        recommendations = [
            {
                'title': 'Complete Company Profile',
                'description': 'Add detailed information about your company to get more personalized recommendations',
                'priority': 'high',
                'category': 'profile'
            },
            {
                'title': 'Set Up Social Media Presence',
                'description': 'Create and optimize your social media profiles to increase your online visibility',
                'priority': 'medium' if score < 50 else 'low',
                'category': 'social'
            },
            {
                'title': 'Optimize Website',
                'description': 'Improve your website performance and user experience',
                'priority': 'high' if score < 30 else 'medium',
                'category': 'website'
            }
        ]
        
        for rec in recommendations:
            Recommendation.objects.create(
                analysis=analysis,
                title=rec['title'],
                description=rec['description'],
                priority=rec['priority'],
                category=rec['category']
            )
    
    def retrieve(self, request, pk=None):
        """Get a specific analysis by client ID"""
        queryset = self.get_queryset()
        
        # Check if pk is a client_id
        if pk and len(pk) > 10:  # Assuming UUID is longer than 10 chars
            try:
                client_profile = ClientProfile.objects.get(id=pk)
                analysis = queryset.filter(client=client_profile).order_by('-analysis_date').first()
                if not analysis:
                    return Response(
                        {"detail": "No analysis found for this client"}, 
                        status=status.HTTP_404_NOT_FOUND
                    )
            except ClientProfile.DoesNotExist:
                return Response(
                    {"detail": "Client not found"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            analysis = get_object_or_404(queryset, pk=pk)
        
        serializer = self.get_serializer(analysis)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def generate_report(self, request, pk=None):
        """Generate PDF report for the analysis"""
        analysis = self.get_object()
        
        # Queue the report generation task
        generate_analysis_report.delay(str(analysis.id))
        
        return Response(
            {"detail": "Report generation has been scheduled"}, 
            status=status.HTTP_202_ACCEPTED
        )


class RecommendationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for recommendations (read-only)
    """
    queryset = Recommendation.objects.all()
    serializer_class = RecommendationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            try:
                client_profile = user.client_profile
                return Recommendation.objects.filter(
                    analysis__client=client_profile
                ).order_by('priority', 'category')
            except ClientProfile.DoesNotExist:
                return Recommendation.objects.none()
        # Staff and admins can see all recommendations
        return self.queryset
    
    def list(self, request, *args, **kwargs):
        """Get recommendations for a specific client"""
        client_id = request.query_params.get('client_id')
        if client_id:
            try:
                client_profile = ClientProfile.objects.get(id=client_id)
                if request.user.role == 'client' and request.user.client_profile.id != client_profile.id:
                    return Response(
                        {"detail": "Not authorized to view these recommendations"}, 
                        status=status.HTTP_403_FORBIDDEN
                    )
                
                analysis = DigitalPostureAnalysis.objects.filter(
                    client=client_profile
                ).order_by('-analysis_date').first()
                
                if not analysis:
                    return Response(
                        {"detail": "No analysis found for this client"}, 
                        status=status.HTTP_404_NOT_FOUND
                    )
                
                recommendations = Recommendation.objects.filter(
                    analysis=analysis
                ).order_by('priority', 'category')
                
                serializer = self.get_serializer(recommendations, many=True)
                return Response(serializer.data)
            except ClientProfile.DoesNotExist:
                return Response(
                    {"detail": "Client not found"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
        
        return super().list(request, *args, **kwargs)


class ActionPlanViewSet(viewsets.ModelViewSet):
    """
    API endpoint for action plans
    """
    queryset = ActionPlan.objects.all()
    serializer_class = ActionPlanSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            try:
                client_profile = user.client_profile
                return ActionPlan.objects.filter(client=client_profile)
            except ClientProfile.DoesNotExist:
                return ActionPlan.objects.none()
        # Staff and admins can see all action plans
        return self.queryset
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        """Generate an AI-powered action plan based on recommendations"""
        client_id = request.data.get('client_id')
        if not client_id:
            return Response(
                {"detail": "client_id is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            client_profile = ClientProfile.objects.get(id=client_id)
            
            # Check permission
            if request.user.role == 'client' and request.user.client_profile.id != client_profile.id:
                return Response(
                    {"detail": "Not authorized to generate action plan for this client"}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Get latest analysis
            analysis = DigitalPostureAnalysis.objects.filter(
                client=client_profile
            ).order_by('-analysis_date').first()
            
            if not analysis:
                return Response(
                    {"detail": "No analysis found for this client"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Get high priority recommendations
            recommendations = Recommendation.objects.filter(
                analysis=analysis, 
                priority='high'
            )
            
            if not recommendations:
                return Response(
                    {"detail": "No high priority recommendations found"}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Create a new action plan
            action_plan = ActionPlan.objects.create(
                client=client_profile,
                title=f"Action Plan for {client_profile.company_name}",
                description="AI-generated action plan based on high-priority recommendations",
                status="draft"
            )
            
            # Add recommendations to the action plan
            action_plan.recommendations.set(recommendations)
            
            serializer = self.get_serializer(action_plan)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except ClientProfile.DoesNotExist:
            return Response(
                {"detail": "Client not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )