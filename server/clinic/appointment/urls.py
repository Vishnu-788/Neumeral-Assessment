from django.urls import path
from .views import ListAppoinmentView, CreateAppoitmentView

urlpatterns = [
    path('', ListAppoinmentView.as_view(), name='list-appointments'),
    path('create/', CreateAppoitmentView.as_view(), name='create-appointment'),
]