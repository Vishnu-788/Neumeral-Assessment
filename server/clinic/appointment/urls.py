from django.urls import path
from .views import ListAppointmentView, CreateAppointmentView

urlpatterns = [
    path('', ListAppointmentView.as_view(), name='list-appointments'),
    path('create/', CreateAppointmentView.as_view(), name='create-appointment'),
]