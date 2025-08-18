from rest_framework.generics import ListAPIView
from .models import Doctor
from .serializers import DoctorSerializer

# Create your views here.
class ListDoctorsView(ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer




