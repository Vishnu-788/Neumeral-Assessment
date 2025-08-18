from django.db import models
from doctor.models import Doctor, Slot
from django.contrib.auth.models import User

"""
Appointment model
"""
class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    date = models.DateField()
    patient = models.ForeignKey(User, on_delete=models.CASCADE)  # <- correct
    age = models.IntegerField()

    def __str__(self):
        return f"{self.patient} with {self.doctor.name} at {self.slot} on {self.date}"