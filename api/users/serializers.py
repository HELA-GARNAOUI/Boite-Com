from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import ClientProfile

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'role', 'date_joined')
        read_only_fields = ('id', 'date_joined')


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)
    first_name = serializers.CharField(required=True, allow_blank=False)
    last_name = serializers.CharField(required=True, allow_blank=False)
    email = serializers.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ('email', 'password', 'confirm_password', 'first_name', 'last_name')
    
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def validate(self, data):
        if not data.get('password'):
            raise serializers.ValidationError({"password": "Password is required."})
        if not data.get('confirm_password'):
            raise serializers.ValidationError({"confirm_password": "Confirm password is required."})
        if not data.get('first_name'):
            raise serializers.ValidationError({"first_name": "First name is required."})
        if not data.get('last_name'):
            raise serializers.ValidationError({"last_name": "Last name is required."})
            
        password = data.get('password')
        confirm_password = data.pop('confirm_password', None)
        
        if password != confirm_password:
            raise serializers.ValidationError({
                "confirm_password": "Passwords don't match"
            })
        
        return data
    
    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
                first_name=validated_data.get('first_name', ''),
                last_name=validated_data.get('last_name', ''),
                role='client'
            )
            return user
        except Exception as e:
            raise serializers.ValidationError(f"Error creating user: {str(e)}")


class ClientProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    
    class Meta:
        model = ClientProfile
        fields = ('id', 'email', 'first_name', 'last_name', 'company_name', 
                  'industry', 'company_size', 'digital_maturity_score', 
                  'subscription_plan', 'website', 'phone_number', 
                  'address', 'notes', 'created_at', 'updated_at')
        read_only_fields = ('id', 'digital_maturity_score', 'created_at', 'updated_at')


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(required=False)
    industry = serializers.CharField(required=False)
    company_size = serializers.CharField(required=False)
    website = serializers.URLField(required=False)
    phone_number = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'company_name', 'industry', 
                  'company_size', 'website', 'phone_number', 'address')
    
    def update(self, instance, validated_data):
        # Extract ClientProfile fields
        profile_fields = ['company_name', 'industry', 'company_size', 
                          'website', 'phone_number', 'address']
        profile_data = {}
        
        for field in profile_fields:
            if field in validated_data:
                profile_data[field] = validated_data.pop(field)
        
        # Update User fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        
        # Update or create ClientProfile
        if profile_data:
            ClientProfile.objects.update_or_create(
                user=instance,
                defaults=profile_data
            )
        
        return instance