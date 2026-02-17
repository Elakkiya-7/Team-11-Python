from django.db import models
from users.models import User
from resources.models import Resource

class Booking(models.Model):

    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
    ]

    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    resourceId = models.ForeignKey(Resource, on_delete=models.CASCADE)
    bookingDate = models.DateField()
    timeSlot = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')

    class Meta:
        unique_together = ('resourceId', 'bookingDate', 'timeSlot')

    def __str__(self):
        return f"{self.resourceId.name} - {self.bookingDate}"
