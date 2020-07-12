from rest_framework import serializers
from django.contrib.auth.models import User
from . import models


class RelatedFieldAlternative(serializers.PrimaryKeyRelatedField):
    def __init__(self, **kwargs):
        self.serializer = kwargs.pop('serializer', None)
        if self.serializer is not None and not issubclass(self.serializer, serializers.Serializer):
            raise TypeError('"serializer" is not a valid serializer class')

        super().__init__(**kwargs)

    def use_pk_only_optimization(self):
        return False if self.serializer else True

    def to_representation(self, instance):
        if self.serializer:
            return self.serializer(instance, context=self.context).data
        return super().to_representation(instance)


class EmployeeSerializer(serializers.ModelSerializer):
    enterprise = serializers.SlugRelatedField(
        queryset=models.Enterprise.objects.all(), slug_field='name')

    class Meta:
        model = models.Employee
        fields = ('id', 'uuid', 'enterprise', 'name', 'cc',
                  'city', 'department', 'job_name', 'state')


class HrecordsSerializer(serializers.ModelSerializer):
    #employee = serializers.SlugRelatedField(queryset=models.Employee.objects.all(), slug_field='name')
    #employee = EmployeeSerializer()
    #employee = serializers.SerializerMethodField(source='get_programas')
    employee = RelatedFieldAlternative(
        queryset=models.Employee.objects.all(), serializer=EmployeeSerializer)

    class Meta:
        model = models.Hrecords
        fields = ('id', 'uuid', 'date', 'employee',
                  'date_test', 'result', 'date_result')


class Ciie10Serializer(serializers.ModelSerializer):

    class Meta:
        model = models.Ciie10
        fields = "__all__"


class AbsenceSerializer(serializers.ModelSerializer):
    employee = RelatedFieldAlternative(
        queryset=models.Employee.objects.all(), serializer=EmployeeSerializer)
    ciie10 = serializers.SlugRelatedField(
        queryset=models.Ciie10.objects.all(), slug_field='description')

    class Meta:
        model = models.Absence
        fields = "__all__"
