import logging
from django.contrib.auth import get_user_model
from rest_framework import status, viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import (
    UserRegistrationSerializer, 
    UserSerializer, 
    ClientProfileSerializer,
    UserProfileUpdateSerializer
)
from .models import ClientProfile
from .permissions import IsOwnProfile, IsAdminUser
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)
User = get_user_model()


class RegisterAPIView(generics.CreateAPIView):
    """
    API endpoint for user registration
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        try:
            logger.info(f"Registration request data: {request.data}")
            serializer = self.get_serializer(data=request.data)
            
            if not serializer.is_valid():
                logger.error(f"Registration validation errors: {serializer.errors}")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                user = serializer.save()
                refresh = RefreshToken.for_user(user)
                
                # Create client profile for the user
                try:
                    ClientProfile.objects.create(
                        user=user,
                        company_name=request.data.get('company_name', ''),
                        industry=request.data.get('industry', '')
                    )
                except Exception as profile_error:
                    logger.error(f"Error creating client profile: {str(profile_error)}")
                    # Don't fail registration if profile creation fails
                    pass
                
                return Response({
                    'user': UserSerializer(user).data,
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }, status=status.HTTP_201_CREATED)
                
            except Exception as save_error:
                logger.error(f"Error saving user: {str(save_error)}")
                return Response({
                    'detail': f"Error creating user: {str(save_error)}"
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            logger.error(f"Unexpected registration error: {str(e)}")
            return Response({
                'detail': f"An unexpected error occurred: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginView(APIView):
    """
    API endpoint for login with email and password
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({
                'detail': 'Please provide both email and password.'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request=request, email=email, password=password)

        if not user:
            return Response({
                'detail': 'Invalid email or password.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_active:
            return Response({
                'detail': 'User account is disabled.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': UserSerializer(user).data
        })


class LogoutAPIView(APIView):
    """
    API endpoint for user logout
    """
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    """
    API endpoint for retrieving and updating user profile
    """
    permission_classes = [permissions.IsAuthenticated, IsOwnProfile]
    serializer_class = UserProfileUpdateSerializer
    
    def get_object(self):
        return self.request.user
    
    def get(self, request, *args, **kwargs):
        user = self.get_object()
        try:
            client_profile = user.client_profile
            serializer = ClientProfileSerializer(client_profile)
        except ClientProfile.DoesNotExist:
            serializer = UserSerializer(user)
        
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            # Get updated profile data
            try:
                client_profile = user.client_profile
                profile_serializer = ClientProfileSerializer(client_profile)
                return Response(profile_serializer.data)
            except ClientProfile.DoesNotExist:
                return Response(UserSerializer(user).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    """
    API endpoint for requesting password reset
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Don't reveal that the user doesn't exist
            return Response({'message': 'If an account exists with this email, you will receive password reset instructions.'}, 
                          status=status.HTTP_200_OK)

        # Generate token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # Create reset link
        reset_link = f"{settings.FRONTEND_URL}/client/reset-password/{uid}/{token}"
        
        # Send email
        subject = 'Password Reset Request'
        message = f'Please click the following link to reset your password: {reset_link}'
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = [email]
        
        try:
            send_mail(subject, message, from_email, recipient_list)
            return Response({'message': 'If an account exists with this email, you will receive password reset instructions.'}, 
                          status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to send password reset email: {str(e)}")
            return Response({'error': 'Failed to send password reset email'}, 
                          status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordResetConfirmView(APIView):
    """
    API endpoint for confirming password reset
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        
        if not all([uid, token, new_password]):
            return Response({'error': 'Missing required fields'}, 
                          status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'error': 'Invalid reset link'}, 
                          status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired reset link'}, 
                          status=status.HTTP_400_BAD_REQUEST)

        # Set new password
        user.set_password(new_password)
        user.save()
        
        return Response({'message': 'Password has been reset successfully'}, 
                      status=status.HTTP_200_OK)