from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import NewsletterSubscription
from .serializers import NewsletterSubscriptionSerializer

class NewsletterSubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = NewsletterSubscriptionSerializer
    http_method_names = ['post']  # Only allow POST requests

    def create(self, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {'error': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            subscription, created = NewsletterSubscription.objects.get_or_create(
                email=email,
                defaults={'is_active': True}
            )
            
            if not created and not subscription.is_active:
                subscription.is_active = True
                subscription.save()
                message = 'Your subscription has been reactivated.'
            elif created:
                message = 'Thank you for subscribing to our newsletter!'
            else:
                message = 'You are already subscribed to our newsletter.'

            return Response({
                'message': message,
                'email': subscription.email
            }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            ) 