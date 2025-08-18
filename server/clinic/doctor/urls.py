from django.urls import path
from .views import ListDoctorsView, CreateAppoitmentView

urlpatterns = [
    path('', ListDoctorsView.as_view(), name='list-doctor'),
    path('appointment/', CreateAppoitmentView.as_view(), name='create-appointment')
]

