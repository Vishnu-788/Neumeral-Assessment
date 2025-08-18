from django.contrib import admin
from .models import Doctor, Slot, Leave

# Register your models here.
admin.site.register(Doctor)
admin.site.register(Slot)
admin.site.register(Leave)