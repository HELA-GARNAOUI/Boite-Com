from django.contrib.auth import get_user_model
from rest_framework import status, viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserRegistrationSerializer, 
    UserSerializer, 
    ClientProfileSerializer,
    UserProfileUpdateSerializer
)
from .models import ClientProfile
from .permissions import IsOwnProfile, IsAdminUser

User = get_user_model()


class RegisterAPIView(generics.CreateAPIView):
    """
    API endpoint for user registration
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            
            # Create client profile for the user
            ClientProfile.objects.create(
                user=user,
                company_name=request.data.get('company_name', ''),
                industry=request.data.get('industry', '')
            )
            
            return Response({
                'user': UserSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OdooLoginView(TokenObtainPairView):
    """
    API endpoint for login with Odoo integration
    """
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        # Here you would validate with Odoo
        # This is a placeholder for Odoo integration
        # You would replace this with actual Odoo API calls
        
        return response


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