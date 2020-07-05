from django.shortcuts import render, HttpResponse
from django.views.generic import ListView, DetailView 
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Product, Client, Location

from .serializers import (ProductSerializer, 
LocationSerializer, ClientSerializer, CreateUserSerializer, 
UserSerializer, WeatherApiSerializer, ImageApiSerializer)

from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin
from django.urls import reverse_lazy
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authentication import SessionAuthentication 
from rest_framework_simplejwt import authentication as jwtauth
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework import status
import time
import requests

#from django.views.decorators.csrf import csrf_exempt

# Create your views here.
weather_api_key = '88bf74f6ac2d0e7a281ab4aa28e64f57'
images_api_key = '12729179-5d5cbd96245c61e2ec0a81dde'


## API VIEWS


class RegistrationAPI(GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data
        })





class ProductViewset(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)

    
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = (jwtauth.JWTAuthentication,)
    permission_classes = (IsAuthenticated,)


    def create(self, request): # Here is the new update comes <<<<
        #post_data = request.data
        #print(request.data, "ESTA es la data enviada")
        # do something with post data
        #return HttpResponse(post_data, "return data")

        product_serializer = ProductSerializer(data=request.data)
        if product_serializer.is_valid():
            product_serializer.save()
            return Response(product_serializer.data, status=status.HTTP_201_CREATED)
        else:
        #    print('error', product_serializer.errors)
            print(product_serializer.errors, "ERRORES AL CREAR PRDUCT")
            return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        
        #partial = True
        instance = self.get_object()

        #print(request.data, "ESTA es la data enviada para MODIFFFF")
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        
        
        self.perform_update(serializer)
        return Response(serializer.data)


class LocationViewset(ModelViewSet):
    
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    authentication_classes = (jwtauth.JWTAuthentication,)
    permission_classes = (IsAuthenticated,)


class ClientViewset(ModelViewSet):
    
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    authentication_classes = (jwtauth.JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

MAX_RETRIES = 2

class WeatherApi(APIView):
    
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
    
        if request:
            #print(request.data['location'], "ESTA ES REQUEST DATA")
            attempt_num = 0  # keep track of how many times we've retried
            while attempt_num < MAX_RETRIES:
                try:
                    r = requests.get(f"https://api.openweathermap.org/data/2.5/weather?q={request.data['location']}&appid={weather_api_key}&units=metric", timeout=5)
                    if r.status_code == 200:
                        data = r.json()
                        return Response(data, status=status.HTTP_200_OK)
                    else:
                        attempt_num += 1
                except requests.exceptions.ConnectionError as error:
                        return Response({"error": "Timeout Request"}, status=status.HTTP_408_REQUEST_TIMEOUT)

                # You can probably use a logger to log the error here
                time.sleep(3)  # Wait for 3 seconds before re-trying
            return Response({"error": "Request failed"}, status=r.status_code)
        else:
            return Response({"error": "Method not allowed"}, 
            status=status.HTTP_400_BAD_REQUEST)

class ImagesApi(APIView):
    
    
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
    
        if request:
            #print(request.data['location'], "ESTA ES REQUEST DATA")
            attempt_num = 0  # keep track of how many times we've retried
            while attempt_num < MAX_RETRIES:
                try:
                    r = requests.get(f"https://pixabay.com/api/?key={images_api_key}&q={request.data['location']}", timeout=5)
                    if r.status_code == 200:
                        data = r.json()
                        return Response(data, status=status.HTTP_200_OK)
                    else:
                        attempt_num += 1
                except requests.exceptions.ConnectionError as error:
                        return Response({"error": "Timeout Request"}, status=status.HTTP_408_REQUEST_TIMEOUT)
                # You can probably use a logger to log the error here
                time.sleep(3)  # Wait for 3 seconds before re-trying
            return Response({"error": "Request failed"}, status=r.status_code)
        else:
            return Response({"error": "Method not allowed"}, 
            status=status.HTTP_400_BAD_REQUEST)
        
        
        # serializer = ImageApiSerializer(request.data)
        # serializer.is_valid(raise_exception=True)
        
        # return Response({
        #     "image_url": ImageApiSerializer(user, context=self.get_serializer_context()).data
        # })