from django.contrib import admin
from .models import UserProfile, Item

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'created_at', 'updated_at')
    list_filter = ('role',)
    search_fields = ('user__username', 'user__email')

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'created_by', 'created_at', 'updated_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'description', 'created_by__username')