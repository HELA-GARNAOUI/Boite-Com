from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.db.models import Count, Q, Sum
from django.utils import timezone
from datetime import timedelta
from .models import DashboardSettings, Notification
from .serializers import DashboardSettingsSerializer, NotificationSerializer
from marketing.models import Campaign
from users.models import ClientProfile
from analysis.models import DigitalPostureAnalysis
import logging

logger = logging.getLogger(__name__)

class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

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

    @action(detail=False, methods=['get', 'post'])
    def settings(self, request):
        if request.method == 'GET':
            try:
                user_settings = DashboardSettings.objects.get(user=request.user)
                serializer = DashboardSettingsSerializer(user_settings)
                return Response(serializer.data)
            except DashboardSettings.DoesNotExist:
                # Return default settings if none exist
                default_settings = {
                    'notifications': True,
                    'theme': 'light',
                    'language': 'en'
                }
                return Response(default_settings)
        
        elif request.method == 'POST':
            try:
                user_settings = DashboardSettings.objects.get(user=request.user)
                serializer = DashboardSettingsSerializer(user_settings, data=request.data)
            except DashboardSettings.DoesNotExist:
                serializer = DashboardSettingsSerializer(data=request.data)
            
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def overview(self, request):
        try:
            # Get or create client profile
            client_profile = self._get_client_profile(request.user)
            
            # Get campaign statistics
            total_campaigns = Campaign.objects.filter(created_by=request.user).count()
            active_campaigns = Campaign.objects.filter(
                created_by=request.user,
                status='active'
            ).count()
            
            # Get analysis statistics
            analysis = DigitalPostureAnalysis.objects.filter(
                client=client_profile
            ).order_by('-analysis_date').first()
            
            # Use score instead of digital_maturity_score
            analysis_score = analysis.score if analysis else 0.0
            
            # Get recent activities (last 7 days)
            recent_date = timezone.now() - timedelta(days=7)
            recent_activities = []
            
            try:
                # Add campaign activities
                recent_campaigns = Campaign.objects.filter(
                    created_by=request.user,
                    created_at__gte=recent_date
                ).order_by('-created_at')[:5]
                
                for campaign in recent_campaigns:
                    recent_activities.append({
                        'id': campaign.id,
                        'type': 'campaign',
                        'description': f"Campaign '{campaign.name}' was created",
                        'timestamp': campaign.created_at.isoformat()
                    })
            except Exception as e:
                logger.warning(f"Error fetching campaign activities: {str(e)}")
                # Continue without campaign activities
            
            # Add analysis activities if they exist
            if analysis:
                recent_activities.append({
                    'id': str(analysis.id),
                    'type': 'analysis',
                    'description': f"Digital posture analysis completed with score: {analysis.score}",
                    'timestamp': analysis.analysis_date.isoformat()
                })
            
            # Sort activities by timestamp
            recent_activities.sort(key=lambda x: x['timestamp'], reverse=True)
            
            # Return the overview data with initial state if empty
            return Response({
                'total_campaigns': total_campaigns,
                'active_campaigns': active_campaigns,
                'analysis_score': analysis_score,
                'recent_activities': recent_activities[:5],  # Limit to 5 most recent
                'company_name': client_profile.company_name,
                'industry': client_profile.industry,
                'subscription_plan': client_profile.subscription_plan,
                'is_setup_complete': bool(analysis and total_campaigns > 0),
                'setup_tasks': [
                    {
                        'id': 'profile',
                        'title': 'Complete Company Profile',
                        'completed': bool(client_profile.company_name and client_profile.industry != 'Not specified'),
                        'description': 'Add your company details to get personalized recommendations'
                    },
                    {
                        'id': 'analysis',
                        'title': 'Generate Digital Posture Analysis',
                        'completed': bool(analysis),
                        'description': 'Get your digital maturity score and recommendations'
                    },
                    {
                        'id': 'campaign',
                        'title': 'Create Your First Campaign',
                        'completed': bool(total_campaigns > 0),
                        'description': 'Start your first marketing campaign'
                    }
                ]
            })
            
        except Exception as e:
            logger.error(f"Error in dashboard overview: {str(e)}", exc_info=True)
            # Return a more user-friendly error response
            return Response({
                'error': 'Failed to load dashboard data',
                'message': 'Please try again later or contact support if the issue persists',
                'details': str(e) if settings.DEBUG else None
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'])
    def analytics(self, request):
        try:
            client_profile = self._get_client_profile(request.user)
            
            # Get campaign performance data
            campaign_performance = []
            try:
                campaigns = Campaign.objects.filter(created_by=request.user)
                for campaign in campaigns:
                    campaign_performance.append({
                        'id': campaign.id,
                        'name': campaign.name,
                        'status': campaign.status,
                        'created_at': campaign.created_at.isoformat(),
                        'metrics': {
                            'reach': campaign.metrics.aggregate(total_impressions=Sum('impressions'))['total_impressions'] or 0,
                            'engagement': campaign.metrics.aggregate(total_clicks=Sum('clicks'))['total_clicks'] or 0,
                            'conversion': campaign.metrics.aggregate(total_conversions=Sum('conversions'))['total_conversions'] or 0
                        }
                    })
            except Exception as e:
                logger.warning(f"Error fetching campaign performance: {str(e)}")
                # Continue with empty campaign performance
            
            # Get analysis history
            analysis_history = []
            try:
                analyses = DigitalPostureAnalysis.objects.filter(
                    client=client_profile
                ).order_by('-analysis_date')[:5]
                
                analysis_history = [{
                    'id': str(analysis.id),
                    'date': analysis.analysis_date.isoformat(),
                    'score': analysis.score,  # Use score instead of digital_maturity_score
                    'recommendations_count': analysis.recommendations.count() if hasattr(analysis, 'recommendations') else 0
                } for analysis in analyses]
            except Exception as e:
                logger.warning(f"Error fetching analysis history: {str(e)}")
                # Continue with empty analysis history
            
            return Response({
                'campaign_performance': campaign_performance,
                'analysis_history': analysis_history,
                'digital_maturity_trend': {
                    'current_score': client_profile.digital_maturity_score,
                    'history': analysis_history
                }
            })
            
        except Exception as e:
            logger.error(f"Error in dashboard analytics: {str(e)}", exc_info=True)
            # Return a more user-friendly error response
            return Response({
                'error': 'Failed to load analytics data',
                'message': 'Please try again later or contact support if the issue persists',
                'details': str(e) if settings.DEBUG else None
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'])
    def notifications(self, request):
        notifications = Notification.objects.filter(user=request.user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def mark_notification_read(self, request, pk=None):
        try:
            notification = Notification.objects.get(pk=pk, user=request.user)
            notification.read = True
            notification.save()
            return Response({'status': 'success'})
        except Notification.DoesNotExist:
            return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['delete'])
    def delete_notification(self, request, pk=None):
        try:
            notification = Notification.objects.get(pk=pk, user=request.user)
            notification.delete()
            return Response({'status': 'success'})
        except Notification.DoesNotExist:
            return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND) 