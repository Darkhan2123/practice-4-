from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow admin users to perform certain actions.
    """
    def has_permission(self, request, view):
        # Check if the user has a profile and is an admin
        return hasattr(request.user, 'profile') and request.user.profile.role == 'admin'


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or admins to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request, so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
            
        # Check if the user is an admin
        if hasattr(request.user, 'profile') and request.user.profile.role == 'admin':
            return True
            
        # Write permissions are only allowed to the owner of the item
        return obj.created_by == request.user