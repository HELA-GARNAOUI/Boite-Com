from django.urls import path
from .views import MarketingListView

urlpatterns = [
    path('', MarketingListView.as_view(), name='marketing-list'),
] 