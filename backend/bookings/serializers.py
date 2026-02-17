from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'

    def validate(self, data):
        user = data['userId']
        resource = data['resourceId']

        if user.status != "ACTIVE":
            raise serializers.ValidationError("User is not ACTIVE.")

        if resource.status != "AVAILABLE":
            raise serializers.ValidationError("Resource is not AVAILABLE.")

        return data
