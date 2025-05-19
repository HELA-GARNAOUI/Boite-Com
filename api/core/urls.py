from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# API Schema view
schema_view = get_schema_view(
    openapi.Info(
        title="Digital Agency API",
        default_version='v1',
        description="API for Digital Agency Backend",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# API v1 endpoints
api_v1_patterns = [
    path('auth/', include('users.urls')),
    path('analysis/', include('analysis.urls')),
    path('content/', include('content.urls')),
    path('services/', include('services.urls')),
    path('contact/', include('contact.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('marketing/', include('marketing.urls')),
    path('chat/', include('chat.urls')),
]

# Main URL patterns
urlpatterns = [
    # Root URL redirects to API documentation
    path('', RedirectView.as_view(url='/docs/', permanent=False), name='index'),
    
    # Admin interface
    path('admin/', admin.site.urls),
    
    # API documentation
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # API endpoints with versioning
    path('api/v1/', include(api_v1_patterns)),
    
    # API schema URLs
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Serve static and media files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)