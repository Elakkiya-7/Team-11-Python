"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import UserViewSet
from users.auth_views import login_view, register_view, current_user_view, logout_view
from resources.views import ResourceViewSet
from bookings.views import BookingViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'resources', ResourceViewSet, basename='resources')
router.register(r'bookings', BookingViewSet, basename='bookings')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/login/', login_view, name='login'),
    path('api/auth/register/', register_view, name='register'),
    path('api/auth/me/', current_user_view, name='current-user'),
    path('api/auth/logout/', logout_view, name='logout'),
]

