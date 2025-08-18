from rest_framework import serializers
from .models import Doctor, Appointment, Leave



class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = ['id', 'name', 'department', 'specialty']

class AppointmentSerializer(serializers.ModelSerializer):
    patient = serializers.HiddenField(default=serializers.CurrentUserDefault())
    patient_name = serializers.CharField(source='patient.username', read_only=True)
    class Meta:
        model = Appointment
        fields = ['doctor', 'slot', 'date', 'age', 'patient', 'patient_name']

    def validate(self, data):
        doctor = data['doctor']
        slot = data['slot']
        date = data['date']

        # Check if doctor is on leave for this slot on this date
        if Leave.objects.filter(doctor=doctor, slot=slot, date=date).exists():
            raise serializers.ValidationError(
                f"Doctor {doctor.name} is on leave for {slot} on {date}."
            )
        return data


