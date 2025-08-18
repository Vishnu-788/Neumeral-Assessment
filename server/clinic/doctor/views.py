from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer

# Create your views here.
class ListDoctorsView(ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class CreateAppoitmentView(CreateAPIView):
    permission_classes=[IsAuthenticated]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer