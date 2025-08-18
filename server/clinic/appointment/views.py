from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import AppointmentSerializer
from .models import Appointment

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