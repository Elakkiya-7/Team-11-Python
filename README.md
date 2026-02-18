# 🎓 Campus Resource Management System

A full-stack web application for managing campus resources (labs, classrooms, event halls) with role-based access control and booking workflows.

## 🌟 Features

- **User Authentication** - Token-based authentication with JWT
- **Role-Based Access Control** - Student, Staff, and Admin roles
- **Resource Management** - CRUD operations for campus resources
- **Booking System** - Create, approve, and manage bookings
- **Conflict Detection** - Prevents double-booking of resources
- **Approval Workflow** - Multi-level approval (Staff → Admin)
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Real-time Updates** - Live availability checking

## 🛠️ Tech Stack

### Backend
- Django 6.0
- Django REST Framework
- MySQL Database
- Token Authentication

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Custom hooks for state management
- Modern CSS with gradients and animations

## 📋 Prerequisites

- Python 3.8+
- Node.js 14+
- MySQL Server
- pip and npm

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd campus-resource-management
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
pip install django djangorestframework django-cors-headers mysqlclient

# Create database
mysql -u root -p
CREATE DATABASE campus_db;
EXIT;

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create initial data
python setup_backend.py

# Start server
python manage.py runserver
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## 🔐 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | Admin@123 |
| Staff | staff@example.com | Staff@123 |
| Student | student@example.com | Student@123 |

## 📱 User Roles & Permissions

### 👨‍🎓 Student
- Create bookings for resources
- View own bookings
- Cancel pending bookings
- Check resource availability

### 👨‍🏫 Staff
- All student permissions
- View all bookings
- Approve/reject student bookings
- Create bookings (auto-approved)

### 👨‍💼 Admin
- All staff permissions
- Final approval authority
- Manage resources (Create/Edit/Delete)
- Manage users (Create/Edit/Delete/Activate/Deactivate)
- Full system control

## 📁 Project Structure

```
campus-resource-management/
├── backend/                    # Django Backend
│   ├── backend/               # Project settings
│   │   ├── settings.py        # Configuration
│   │   └── urls.py            # URL routing
│   ├── users/                 # User management
│   │   ├── models.py          # User model
│   │   ├── views.py           # User views
│   │   ├── serializers.py     # User serializers
│   │   └── auth_views.py      # Authentication views
│   ├── resources/             # Resource management
│   │   ├── models.py          # Resource model
│   │   ├── views.py           # Resource views
│   │   └── serializers.py     # Resource serializers
│   ├── bookings/              # Booking management
│   │   ├── models.py          # Booking model
│   │   ├── views.py           # Booking views
│   │   └── serializers.py     # Booking serializers
│   ├── manage.py
│   └── setup_backend.py       # Initial data setup
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── api/               # API configuration
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context (Auth)
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Page components
│   │   ├── routes/            # Route configuration
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   └── App.js             # Root component
│   └── package.json
│
├── SETUP_INSTRUCTIONS.md       # Detailed setup guide
├── START_PROJECT.md            # Quick start guide
└── README.md                   # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `GET /api/auth/me/` - Get current user
- `POST /api/auth/logout/` - User logout

### Users
- `GET /api/users/` - List users
- `GET /api/users/{id}/` - Get user
- `PATCH /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user

### Resources
- `GET /api/resources/` - List resources
- `POST /api/resources/` - Create resource
- `GET /api/resources/{id}/` - Get resource
- `PATCH /api/resources/{id}/` - Update resource
- `DELETE /api/resources/{id}/` - Delete resource

### Bookings
- `GET /api/bookings/` - List bookings
- `POST /api/bookings/` - Create booking
- `GET /api/bookings/{id}/` - Get booking
- `PATCH /api/bookings/{id}/` - Update booking
- `DELETE /api/bookings/{id}/` - Delete booking
- `POST /api/bookings/{id}/approve/` - Approve booking
- `POST /api/bookings/{id}/reject/` - Reject booking

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Hover effects on interactive elements
- Loading states with animated spinners
- Error handling with user-friendly messages
- Color-coded status badges
- Responsive grid layouts
- Professional typography
- Mobile-first design

## 🧪 Testing

### Manual Testing Flow

1. **Student Flow**
   - Login as student
   - Create a booking
   - View booking status

2. **Staff Flow**
   - Login as staff
   - View pending bookings
   - Approve/reject bookings

3. **Admin Flow**
   - Login as admin
   - Manage resources
   - Manage users
   - Final approval of bookings

## 🐛 Troubleshooting

### Backend Issues

**MySQL Connection Error**
```bash
# Check MySQL is running
mysql -u root -p

# Verify database exists
SHOW DATABASES;
```

**Migration Errors**
```bash
# Reset migrations
python manage.py migrate --fake
python manage.py makemigrations
python manage.py migrate
```

### Frontend Issues

**CORS Errors**
- Ensure `corsheaders` is in `INSTALLED_APPS`
- Check `CORS_ALLOW_ALL_ORIGINS = True` in settings.py

**API Connection Refused**
- Verify backend is running on port 8000
- Check `baseURL` in `axiosInstance.js`

## 📚 Documentation

- [Detailed Setup Instructions](SETUP_INSTRUCTIONS.md)
- [Quick Start Guide](START_PROJECT.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes.

## 👥 Authors

Campus Resource Management System

## 🙏 Acknowledgments

- Django REST Framework documentation
- React documentation
- Material Design principles
- Modern UI/UX best practices

---

**Happy Coding! 🚀**
