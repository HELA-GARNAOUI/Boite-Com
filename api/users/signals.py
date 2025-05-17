from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import ClientProfile

User = get_user_model()

@receiver(post_save, sender=User)
def create_client_profile(sender, instance, created, **kwargs):
    """
    Create a ClientProfile for new users with role 'client'
    """
    if created and instance.role == 'client':
        if not hasattr(instance, 'client_profile'):
            ClientProfile.objects.create(
                user=instance,
                company_name='',
                industry=''
            )