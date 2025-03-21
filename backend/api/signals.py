from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """Create a UserProfile for every new User."""
    if created:
        # Check if the profile already exists (may happen when using the registration endpoint)
        if not hasattr(instance, 'profile'):
            UserProfile.objects.create(user=instance)