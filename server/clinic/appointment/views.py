from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import AppointmentSerializer
from .models import Appointment

class ListAppointmentView(ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class= AppointmentSerializer
    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(patient=user)

class CreateAppointmentView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(
                {
                    "status": "success",
                    "code": 201,
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        else:
            errors = serializer.errors.copy()
            
            if "non_field_errors" in errors:
                errors["message"] = errors.pop("non_field_errors")[0]
            else:
                errors["message"] = "Booking failed."
            
            return Response(
                {
                    "status": "error",
                    "code": 400,
                    "errors": errors
                },
                status=status.HTTP_400_BAD_REQUEST
            )