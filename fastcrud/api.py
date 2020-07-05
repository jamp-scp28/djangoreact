from rest_framework import routers
from simplecrud import views as myapp_views

router = routers.DefaultRouter()

router.register(r'product', myapp_views.ProductViewset)
router.register(r'location', myapp_views.LocationViewset)
router.register(r'client', myapp_views.ClientViewset)