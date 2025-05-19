import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone
from users.models import ClientProfile


class DigitalPostureAnalysis(models.Model):
    """Model for storing digital posture analysis data"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE, related_name='analyses')
    analysis_date = models.DateTimeField(default=timezone.now)
    score = models.FloatField(default=0.0)  # Digital maturity score (0-100)
    recommendations = models.JSONField(default=list)
    metrics = models.JSONField(default=dict)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Digital Posture Analysis'
        verbose_name_plural = 'Digital Posture Analyses'
        ordering = ['-analysis_date']
    
    def __str__(self):
        return f"{self.client.company_name} - {self.analysis_date.strftime('%Y-%m-%d')}"

    def save(self, *args, **kwargs):
        # Update client's digital maturity score when analysis is saved
        if self.client:
            self.client.digital_maturity_score = self.score
            self.client.save()
        super().save(*args, **kwargs)


class Recommendation(models.Model):
    """Model for storing recommendations based on digital posture analysis"""
    CATEGORY_CHOICES = (
        ('seo', 'SEO'),
        ('social_media', 'Social Media'),
        ('website', 'Website'),
        ('branding', 'Branding'),
        ('marketing', 'Marketing'),
        ('technology', 'Technology'),
        ('other', 'Other'),
    )
    
    PRIORITY_CHOICES = (
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    analysis = models.ForeignKey(DigitalPostureAnalysis, on_delete=models.CASCADE, related_name='recommendation_set')
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    estimated_effort = models.CharField(max_length=255, blank=True)
    estimated_impact = models.CharField(max_length=255, blank=True)
    ai_generated = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Recommendation'
        verbose_name_plural = 'Recommendations'
        ordering = ['priority', 'category']
    
    def __str__(self):
        return self.title


class ActionPlan(models.Model):
    """Model for storing action plans based on recommendations"""
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE, related_name='action_plans')
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    recommendations = models.ManyToManyField(Recommendation, related_name='action_plans')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Action Plan'
        verbose_name_plural = 'Action Plans'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title