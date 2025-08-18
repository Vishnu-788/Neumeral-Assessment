from django.urls import path
from .views import ListDoctorsView, CreateAppoitmentView, ListAppoinmentView

urlpatterns = [
    path('', ListDoctorsView.as_view(), name='list-doctor'),
    path('appointment/create/', CreateAppoitmentView.as_view(), name='create-appointment'),
    path('appointments/', ListAppoinmentView.as_view(), name='list-appointments')
]

