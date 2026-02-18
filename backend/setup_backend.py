#!/usr/bin/env python
"""
Setup script for Campus Resource Management Backend
Run this script to set up the database and create initial users
"""

import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from resources.models import Resource
from bookings.models import Booking

User = get_user_model()

def create_users():
    """Create initial users for testing"""
    print("\n📝 Creating initial users...")
    
    users_data = [
        {
            'username': 'admin',
            'email': 'admin@example.com',
            'password': 'Admin@123',
            'first_name': 'Admin',
            'last_name': 'User',
            'role': 'ADMIN',
            'is_staff': True,
            'is_superuser': True
        },
        {
            'username': 'staff1',
            'email': 'staff@example.com',
            'password': 'Staff@123',
            'first_name': 'Jane',
            'last_name': 'Staff',
            'role': 'STAFF'
        },
        {
            'username': 'student1',
            'email': 'student@example.com',
            'password': 'Student@123',
            'first_name': 'John',
            'last_name': 'Student',
            'role': 'STUDENT'
        }
    ]
    
    for user_data in users_data:
        username = user_data.pop('username')
        password = user_data.pop('password')
        
        if not User.objects.filter(username=username).exists():
            user = User.objects.create_user(username=username, password=password, **user_data)
            print(f"✅ Created user: {username} ({user.role})")
            print(f"   Email: {user.email}")
            print(f"   Password: {password}")
        else:
            print(f"⚠️  User {username} already exists")

def create_resources():
    """Create initial resources"""
    print("\n🏢 Creating initial resources...")
    
    resources_data = [
        {'name': 'Computer Lab 1', 'type': 'LAB', 'capacity': 30, 'status': 'AVAILABLE'},
        {'name': 'Computer Lab 2', 'type': 'LAB', 'capacity': 25, 'status': 'AVAILABLE'},
        {'name': 'Classroom A101', 'type': 'CLASSROOM', 'capacity': 50, 'status': 'AVAILABLE'},
        {'name': 'Classroom B202', 'type': 'CLASSROOM', 'capacity': 40, 'status': 'AVAILABLE'},
        {'name': 'Main Auditorium', 'type': 'EVENT_HALL', 'capacity': 200, 'status': 'AVAILABLE'},
        {'name': 'Conference Hall', 'type': 'EVENT_HALL', 'capacity': 100, 'status': 'AVAILABLE'},
    ]
    
    for resource_data in resources_data:
        if not Resource.objects.filter(name=resource_data['name']).exists():
            resource = Resource.objects.create(**resource_data)
            print(f"✅ Created resource: {resource.name} ({resource.type})")
        else:
            print(f"⚠️  Resource {resource_data['name']} already exists")

def main():
    print("=" * 60)
    print("🚀 Campus Resource Management - Backend Setup")
    print("=" * 60)
    
    try:
        create_users()
        create_resources()
        
        print("\n" + "=" * 60)
        print("✅ Setup completed successfully!")
        print("=" * 60)
        print("\n📋 Login Credentials:")
        print("-" * 60)
        print("Admin:   admin@example.com / Admin@123")
        print("Staff:   staff@example.com / Staff@123")
        print("Student: student@example.com / Student@123")
        print("-" * 60)
        print("\n🌐 Start the server with: python manage.py runserver")
        print("🎨 Frontend URL: http://localhost:3000")
        print("🔧 Backend URL: http://127.0.0.1:8000")
        print("\n")
        
    except Exception as e:
        print(f"\n❌ Error during setup: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main()
