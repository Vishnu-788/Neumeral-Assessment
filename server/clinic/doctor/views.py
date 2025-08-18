from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer

# Create your views here.
class ListDoctorsView(ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class ListAppoinmentView(ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class= AppointmentSerializer
    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(patient=user)

class CreateAppoitmentView(CreateAPIView):
    permission_classes=[IsAuthenticated]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


