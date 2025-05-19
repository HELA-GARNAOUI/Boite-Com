from django.db import models
from django.conf import settings

class Campaign(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('active', 'Active'),
        ('paused', 'Paused'),
        ('completed', 'Completed'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class CampaignMetric(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='metrics')
    date = models.DateField()
    impressions = models.IntegerField(default=0)
    clicks = models.IntegerField(default=0)
    conversions = models.IntegerField(default=0)
    spend = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    revenue = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        ordering = ['-date']
        unique_together = ['campaign', 'date']

    def __str__(self):
        return f"{self.campaign.name} - {self.date}" 