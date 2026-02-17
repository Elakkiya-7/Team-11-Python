from rest_framework import serializers
from datetime import datetime
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'

    def validate(self, data):
        booking_date = data['bookingDate']

        # Prevent past date booking
        if booking_date < datetime.today().date():
            raise serializers.ValidationError("Cannot book past dates.")

        return data
