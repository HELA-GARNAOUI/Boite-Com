from django.db import models
from django.conf import settings

class DashboardSettings(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    notifications = models.BooleanField(default=True)
    theme = models.CharField(
        max_length=10,
        choices=[
            ('light', 'Light'),
            ('dark', 'Dark'),
            ('system', 'System')
        ],
        default='light'
    )
    language = models.CharField(
        max_length=2,
        choices=[
            ('en', 'English'),
            ('fr', 'Français'),
            ('es', 'Español')
        ],
        default='en'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Dashboard Settings'
        verbose_name_plural = 'Dashboard Settings'

    def __str__(self):
        return f"{self.user.username}'s Dashboard Settings"

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.user.username}" 