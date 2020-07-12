from django.db import models
from uuid import uuid4
from django.urls import reverse
from django.core.validators import MaxValueValidator, MinValueValidator


def generateUUID():
    return str(uuid4())


class Common(models.Model):
    # name = models.CharField(max_length=35, blank=False,
    #                         help_text="Enter name",
    #                         verbose_name="Name")
    date_activity = models.DateTimeField(
        auto_now=True, verbose_name="Activity")

    class Meta:
        abstract = True


class Enterprise(Common):
    name = models.CharField(max_length=10, help_text="Enterprise",
                            verbose_name="Enterprise")

    def __str__(self):
        return self.name


class City(Common):
    name = models.CharField(max_length=10, help_text="City",
                            verbose_name="City")

    def __str__(self):
        return self.name


class Department(Common):
    name = models.CharField(max_length=10, help_text="Department",
                            verbose_name="Department")

    def __str__(self):
        return self.name


class State(Common):
    name = models.CharField(max_length=10, help_text="State",
                            verbose_name="State")

    def __str__(self):
        return self.name


class Employee(Common):
    uuid = models.UUIDField(unique=True, editable=False, default=generateUUID)
    enterprise = models.ForeignKey(
        Enterprise, verbose_name="Enterprise", on_delete=models.CASCADE, null=True)
    name = models.TextField(max_length=150, help_text="name",
                            verbose_name="Name")
    cc = models.PositiveIntegerField(
        verbose_name='cc', help_text="identificacion",
        default=0,
        validators=[MinValueValidator(0)])

    city = models.ForeignKey(City, verbose_name="City",
                             on_delete=models.CASCADE)

    department = models.ForeignKey(
        Department, verbose_name="Department", on_delete=models.CASCADE)
    job_name = models.CharField(max_length=350, help_text="name",
                                verbose_name="Name")
    state = models.ForeignKey(
        State, verbose_name="State", on_delete=models.CASCADE)

    def __str__(self):
        return f" Name : {self.name} CC: {self.cc}"

    # For update.view redirect
    def get_absolute_url(self):
        return reverse('app:emp_detail', kwargs={'pk': self.pk})

    class Meta:
        ordering = ['name']


# create heatlh records

class Hrecords(Common):
    uuid = models.UUIDField(unique=True, editable=False, default=generateUUID)
    date = models.DateField(null=True)
    employee = models.ForeignKey(
        Employee, verbose_name="Employee", on_delete=models.CASCADE)
    date_test = models.DateField(null=True)
    result = models.CharField(max_length=350, help_text="result",
                              verbose_name="result")
    date_result = models.DateField(null=True)

    def __str__(self):
        return f" Date:  {self.date} {self.employee}"

    # For update.view redirect
    def get_absolute_url(self):
        return reverse('app:rec_detail', kwargs={'pk': self.pk})

    class Meta:
        ordering = ['date']


class Ciie10(Common):
    code = models.CharField(max_length=100)
    description = models.CharField(max_length=300)

    def __str__(self):
        return self.description


class Absence(Common):
    employee = models.ForeignKey(
        Employee, verbose_name="Employee", on_delete=models.CASCADE)
    reason = models.CharField(max_length=100)
    ciie10 = models.ForeignKey(
        Ciie10, verbose_name="Cie10", on_delete=models.CASCADE)
    ini_date = models.DateField(null=True)
    end_date = models.DateField(null=True)
    observation = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.employee} - {self.reason} - {self.ini_date}"
