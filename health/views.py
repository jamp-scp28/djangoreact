from django.shortcuts import render, HttpResponse
from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView

from .serializers import (
    EmployeeSerializer, HrecordsSerializer, AbsenceSerializer, Ciie10Serializer)

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

from .models import Employee, Hrecords, Absence, Ciie10


class Ciie10Viewset(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Ciie10.objects.all()
    serializer_class = Ciie10Serializer
    authentication_classes = (jwtauth.JWTAuthentication,)
    permission_classes = (IsAuthenticated,)


class EmployeeViewset(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    authentication_classes = (jwtauth.JWTAuthentication,)
    permission_classes = (IsAuthenticated,)


class HrecordsViewset(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Hrecords.objects.all()
    serializer_class = HrecordsSerializer
    authentication_classes = (jwtauth.JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        hrecords_serializer = HrecordsSerializer(data=request.data)
        if hrecords_serializer.is_valid():
            hrecords_serializer.save()
            return Response(hrecords_serializer.data, status=status.HTTP_201_CREATED)
        else:
            #    print('error', product_serializer.errors)
            print(hrecords_serializer.errors, "Cant create employee")
            return Response(hrecords_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = True
        instance = self.get_object()
        print(request.data, "ESTA es la data enviada para MODIFFFF")
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class AbsenceViewset(ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    queryset = Absence.objects.all()
    serializer_class = AbsenceSerializer
    authentication_classes = (jwtauth.JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request):
        absence_serializer = AbsenceSerializer(data=request.data)
        if absence_serializer.is_valid():
            absence_serializer.save()
            return Response(absence_serializer.data, status=status.HTTP_201_CREATED)
        else:
            #    print('error', product_serializer.errors)
            print(absence_serializer.errors, "Cant create employee")
            return Response(absence_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = True
        instance = self.get_object()
        print(request.data, "ESTA es la data enviada para MODIFFFF")
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
