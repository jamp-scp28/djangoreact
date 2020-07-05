import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','fastcrud.settings')

import django
django.setup()


from simplecrud.models import Product, Location, Client
from faker import Faker

obj=Faker()


def call(N=10):
    num = 1
    for i in range(N):
        full_name = obj.name()
        list = full_name.split()
        first = list[0]
        second = list[1]
        cityname = obj.city()
#        ads = ((obj.address()).split('\n')[1]).split(',')
        manage_rd = obj.company()
        person = obj.name()
        prod_nam = obj.company()
        text = obj.sentence()
        testemail = obj.email()
        m1 = obj.random_number(digits=2)
        m2 = obj.random_number(digits=2)
        m3 = obj.random_number(digits=2)
        locat_obj = Location.objects.get_or_create(name=cityname, manager=full_name, total_supply=m1)[0]
        prod_obj = Product.objects.get_or_create(name=prod_nam, location=locat_obj, quantity=m2, price=m3, description=text)[0]
        client_obj = Client.objects.get_or_create(name=person, prod_own=prod_obj, email=testemail)[0]
        num+=1

if __name__ == '__main__':
    print("Filling random data")
    call(10)
print("Filling done ")
