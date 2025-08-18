from rest_framework import serializers
from .models import Doctor, Appointment, Leave
from datetime import date, timedelta



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
        
           # Check if doctor already has an appointment in the same slot on the same date
        if Appointment.objects.filter(doctor=doctor, slot=slot, date=date).exists():
            raise serializers.ValidationError(
                f"Doctor {doctor.name} already has an appointment for {slot} on {date}."
            )
        return data
    
    def validate_date(self, value):
        tomorrow = date.today() + timedelta(days=1)
        one_month_later = date.today() + timedelta(days=30)

        if value < tomorrow:
            raise serializers.ValidationError("Appointment date must be from tomorrow onwards.")
        if value > one_month_later:
            raise serializers.ValidationError("Appointment date cannot be more than 1 month in the future.")
        return value


