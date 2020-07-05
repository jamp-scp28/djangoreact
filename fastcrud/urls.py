"""fastcrud URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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
from django.urls import path, include, re_path
from django.conf.urls import url
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from fastcrud.api import router
from simplecrud.views import RegistrationAPI, WeatherApi, ImagesApi
from rest_framework_simplejwt.views import (

    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    
    path('admin/', admin.site.urls),
    #path('', TemplateView.as_view(template_name="home.html"), name="home"),
    path('app/', include(('simplecrud.urls', 'simplecrud'), namespace='app')),
    #path('app0', include(('app0.urls', 'app0'), namespace='app0')),
    path('api/v1/', include(router.urls)),
    path('api-token-auth/', TokenObtainPairView.as_view(), name='api_token_auth'),
    path('api-token-refresh/', TokenRefreshView.as_view(), name='api_token_refresh'),
    path('api-register/', RegistrationAPI.as_view(), name="api-user-register"),
    path('weather_api/', WeatherApi.as_view(), name="weather_api"),
    path('images_api/', ImagesApi.as_view(), name="images_api"),
    ###  ENABLE  FOR HEROKU DEPLOY 
    #re_path('.*', TemplateView.as_view(template_name="index.html"), name="home")
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)