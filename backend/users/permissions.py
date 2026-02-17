from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "ADMIN"


class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "STAFF"


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == "STUDENT"
