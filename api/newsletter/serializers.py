from rest_framework import serializers
from .models import NewsletterSubscription

class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['id', 'email', 'is_active', 'created_at']
        read_only_fields = ['created_at'] 