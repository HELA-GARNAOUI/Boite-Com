from rest_framework import serializers
from .models import DigitalPostureAnalysis, Recommendation, ActionPlan


class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recommendation
        fields = ('id', 'title', 'description', 'category', 'priority', 
                  'estimated_effort', 'estimated_impact', 'created_at')
        read_only_fields = ('id', 'created_at')


class DigitalPostureAnalysisSerializer(serializers.ModelSerializer):
    recommendations = RecommendationSerializer(many=True, read_only=True)
    client_name = serializers.CharField(source='client.company_name', read_only=True)
    
    class Meta:
        model = DigitalPostureAnalysis
        fields = ('id', 'client', 'client_name', 'score', 'analysis_date', 
                  'metrics', 'report_file', 'recommendations', 'created_at')
        read_only_fields = ('id', 'analysis_date', 'created_at')


class DigitalPostureCreateSerializer(serializers.ModelSerializer):
    website_url = serializers.URLField(write_only=True)
    social_media_urls = serializers.ListField(
        child=serializers.URLField(),
        required=False,
        write_only=True
    )
    
    class Meta:
        model = DigitalPostureAnalysis
        fields = ('client', 'website_url', 'social_media_urls')
    
    def create(self, validated_data):
        # Extract and remove non-model fields
        website_url = validated_data.pop('website_url')
        social_media_urls = validated_data.pop('social_media_urls', [])
        
        # Here you would call the AI service to analyze the website and social media
        # This is a placeholder - replace with actual AI analysis
        # We're using dummy values for demonstration
        score = 65.5
        metrics = {
            'seo_score': 70.0,
            'social_media_score': 60.0,
            'website_performance': 65.0,
            'brand_presence': 55.0,
            'technology_stack': 80.0,
            'details': {
                'website': {
                    'loading_speed': 75.0,
                    'mobile_friendliness': 60.0,
                    'security': 85.0,
                    'seo_optimization': 65.0
                },
                'social_media': {
                    'engagement_rate': 55.0,
                    'posting_frequency': 70.0,
                    'audience_growth': 60.0,
                    'content_quality': 65.0
                }
            }
        }
        
        # Create the analysis
        analysis = DigitalPostureAnalysis.objects.create(
            client=validated_data['client'],
            score=score,
            metrics=metrics
        )
        
        # Generate recommendations based on the analysis
        self._generate_recommendations(analysis, metrics)
        
        # Update client's digital maturity score
        client = validated_data['client']
        client.digital_maturity_score = score
        client.save()
        
        return analysis
    
    def _generate_recommendations(self, analysis, metrics):
        """
        Generate recommendations based on the analysis metrics
        This is a placeholder - replace with actual AI-based recommendation generation
        """
        # Example recommendations based on metrics
        if metrics.get('seo_score', 0) < 70:
            Recommendation.objects.create(
                analysis=analysis,
                title="Improve SEO Strategy",
                description="Your website's SEO score is below optimal levels. Consider implementing a comprehensive SEO strategy including keyword optimization, meta tags improvement, and content enhancement.",
                category="seo",
                priority="high",
                estimated_effort="Medium (2-3 weeks)",
                estimated_impact="High - Potential 30% increase in organic traffic"
            )
        
        if metrics.get('website_performance', 0) < 70:
            Recommendation.objects.create(
                analysis=analysis,
                title="Optimize Website Performance",
                description="Your website loading speed can be improved. Consider image optimization, caching implementation, and code minification to enhance user experience and SEO rankings.",
                category="website",
                priority="medium",
                estimated_effort="Low (1 week)",
                estimated_impact="Medium - Improved user retention and conversion rates"
            )
        
        if metrics.get('social_media_score', 0) < 70:
            Recommendation.objects.create(
                analysis=analysis,
                title="Enhance Social Media Presence",
                description="Your social media engagement is below industry standards. Consider implementing a content calendar, engagement strategy, and possibly paid promotion to boost visibility.",
                category="social_media",
                priority="high",
                estimated_effort="Medium (Ongoing)",
                estimated_impact="High - Increased brand awareness and customer engagement"
            )
        
        # Add more generic recommendations
        Recommendation.objects.create(
            analysis=analysis,
            title="Implement Content Marketing Strategy",
            description="Regular, high-quality content can significantly improve your digital presence. Consider creating a blog with industry insights, case studies, and valuable resources for your audience.",
            category="marketing",
            priority="medium",
            estimated_effort="High (3-6 months)",
            estimated_impact="Medium to High - Establishes authority and improves SEO"
        )


class ActionPlanSerializer(serializers.ModelSerializer):
    recommendations = RecommendationSerializer(many=True, read_only=True)
    recommendation_ids = serializers.ListField(
        child=serializers.UUIDField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = ActionPlan
        fields = ('id', 'client', 'title', 'description', 'status', 'start_date', 
                  'end_date', 'recommendations', 'recommendation_ids', 'created_at')
        read_only_fields = ('id', 'created_at')
    
    def create(self, validated_data):
        recommendation_ids = validated_data.pop('recommendation_ids', [])
        
        action_plan = ActionPlan.objects.create(**validated_data)
        
        if recommendation_ids:
            recommendations = Recommendation.objects.filter(id__in=recommendation_ids)
            action_plan.recommendations.set(recommendations)
        
        return action_plan
    
    def update(self, instance, validated_data):
        recommendation_ids = validated_data.pop('recommendation_ids', None)
        
        # Update ActionPlan fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update recommendations if provided
        if recommendation_ids is not None:
            recommendations = Recommendation.objects.filter(id__in=recommendation_ids)
            instance.recommendations.set(recommendations)
        
        return instance