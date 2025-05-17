from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
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
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'client':
            try:
                client_profile = user.client_profile
                return self.queryset.filter(client=client_profile)
            except ClientProfile.DoesNotExist:
                return DigitalPostureAnalysis.objects.none()
        # Staff and admins can see all analyses
        return self.queryset
    
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