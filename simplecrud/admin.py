from django.contrib import admin

# Register your models here.
from .models import Product, Location, Client
# Register your models here.
admin.site.register(Product)
admin.site.register(Location)
admin.site.register(Client)