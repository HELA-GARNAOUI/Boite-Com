from rest_framework import serializers
from .models import DashboardSettings, Notification

class DashboardSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardSettings
        fields = ['notifications', 'theme', 'language']
        read_only_fields = ['created_at', 'updated_at']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'read', 'created_at']
        read_only_fields = ['created_at'] 