from django.urls import path
from .views import ListDoctorsView

urlpatterns = [
    path('', ListDoctorsView.as_view(), name='list-doctor'),
]

