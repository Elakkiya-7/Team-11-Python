from rest_framework import serializers
from datetime import datetime
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    resourceName = serializers.CharField(source='resourceId.name', read_only=True)
    resourceType = serializers.CharField(source='resourceId.type', read_only=True)
    userName = serializers.SerializerMethodField()

    class Meta:
        model = Booking
        fields = ['id', 'userId', 'resourceId', 'bookingDate', 'timeSlot', 'status', 
                  'resourceName', 'resourceType', 'userName']

    def get_userName(self, obj):
        return f"{obj.userId.first_name} {obj.userId.last_name}" if obj.userId.first_name else obj.userId.username

    def validate(self, data):
        booking_date = data['bookingDate']

        # Prevent past date booking
        if booking_date < datetime.today().date():
            raise serializers.ValidationError("Cannot book past dates.")

        return data
