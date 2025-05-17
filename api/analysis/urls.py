from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from .views import (
    DigitalPostureAnalysisViewSet,
    RecommendationViewSet,
    ActionPlanViewSet
)

router = DefaultRouter()
router.register(r'digital-posture', DigitalPostureAnalysisViewSet)
router.register(r'recommendations', RecommendationViewSet)
router.register(r'action-plans', ActionPlanViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('generate-action-plan/', ActionPlanViewSet.as_view({'post': 'generate'}), name='generate-action-plan'),
]