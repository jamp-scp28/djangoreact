from rest_framework import serializers
from django.contrib.auth.models import User
from . import models



class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        if len(validated_data['username']) < 4 or len(validated_data['password']) < 4:
            
            raise serializers.ValidationError('User or Pass must more Than 4 characters')
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')



class LocationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Location
        fields = ('id', 'name', 'rating')



class ProductSerializer(serializers.ModelSerializer):

    ## For create with foreignkey fields

    location = serializers.SlugRelatedField(queryset=models.Location.objects.all(), slug_field='name')
    #location = serializers.SerializerMethodField()
    #location = LocationSerializer()
    #location = serializers.RelatedField(queryset=models.Location.objects.all(), related_field='name')

    class Meta:
        model = models.Product
        fields = ('id', 'uuid', 'name', 'images', 'location', 'price', 'quantity', 'description','observation', 'deployDate','date_activity')


class ImagesProduct(serializers.ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['images']



class ClientSerializer(serializers.ModelSerializer):

#########################REVISARR
#class ClientSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = models.Client
        fields = ('id', 'name', 'email')


class WeatherApiSerializer(serializers.Serializer):
    temp = serializers.IntegerField()
    weather_status = serializers.CharField()

class ImageApiSerializer(serializers.Serializer):
    image_url = serializers.URLField()