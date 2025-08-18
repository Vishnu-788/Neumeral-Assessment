from rest_framework import serializers
from .models import Doctor, Appointment



class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'department', 'specialty']

class AppointmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Appointment
        fields = ['doctor', 'slot', 'date', 'patient_name', 'age']

