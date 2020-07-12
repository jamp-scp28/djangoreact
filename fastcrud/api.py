from rest_framework import routers
from simplecrud import views as myapp_views
from health import views as health_views
from health import views as employee_views
router = routers.DefaultRouter()

router.register(r'product', myapp_views.ProductViewset)
router.register(r'location', myapp_views.LocationViewset)
router.register(r'client', myapp_views.ClientViewset)
router.register(r'health', health_views.HrecordsViewset, basename='health')
router.register(r'employee', health_views.EmployeeViewset, basename='employee')
router.register(r'absence', health_views.AbsenceViewset, basename='absence')
router.register(r'codes', health_views.Ciie10Viewset, basename='codes')
