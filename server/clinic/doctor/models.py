from django.db import models

# Doctor model
class Doctor(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    department = models.CharField(max_length=30, null=False, blank=False)
    specialty = models.CharField(max_length=30, null=False, blank=False)

    def __str__(self):
        return self.name


class Slot(models.Model):
    time_range = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.time_range



# Leave model
class Leave(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='leaves')
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"{self.doctor.name} - {self.slot} on {self.date}"

