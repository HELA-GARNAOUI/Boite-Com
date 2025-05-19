from rest_framework import serializers
from .models import Campaign, CampaignMetric

class CampaignMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignMetric
        fields = ['id', 'date', 'impressions', 'clicks', 'conversions', 'spend', 'revenue']

class CampaignSerializer(serializers.ModelSerializer):
    metrics = CampaignMetricSerializer(many=True, read_only=True)
    created_by = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = Campaign
        fields = [
            'id', 'name', 'description', 'status', 'start_date', 'end_date',
            'budget', 'created_by', 'created_at', 'updated_at', 'metrics'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at'] 