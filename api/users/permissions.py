from rest_framework import permissions


class IsOwnProfile(permissions.BasePermission):
    """
    Permission to only allow users to edit their own profile.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Write permissions are only allowed to the profile owner
        return obj == request.user


class IsAdminUser(permissions.BasePermission):
    """
    Permission to only allow admin users to access the view.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsClientUser(permissions.BasePermission):
    """
    Permission to only allow client users to access the view.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'client'


class IsStaffUser(permissions.BasePermission):
    """
    Permission to only allow staff users to access the view.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and (
            request.user.role == 'staff' or request.user.role == 'admin'
        )