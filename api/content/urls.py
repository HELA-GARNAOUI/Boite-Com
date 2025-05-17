from django.urls import path
from .views import ContentListView

urlpatterns = [
    path('', ContentListView.as_view(), name='content-list'),
] 