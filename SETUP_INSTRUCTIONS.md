# 🚀 Campus Resource Management System - Setup Instructions

## Prerequisites

- Python 3.8+
- Node.js 14+
- MySQL Server
- pip and npm

## 📦 Backend Setup (Django)

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Virtual Environment (Recommended)
```bash
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install django djangorestframework django-cors-headers mysqlclient
```

### 4. Configure Database

Make sure MySQL is running and update `backend/backend/settings.py` with your database credentials:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'campus_db',
        'USER': 'your_mysql_username',
        'PASSWORD': 'your_mysql_password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

### 5. Create Database
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE campus_db;
EXIT;
```

### 6. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 7. Create Initial Data
```bash
python setup_backend.py
```

This will create:
- Admin user: `admin@example.com` / `Admin@123`
- Staff user: `staff@example.com` / `Staff@123`
- Student user: `student@example.com` / `Student@123`
- Sample resources (labs, classrooms, event halls)

### 8. Start Backend Server
```bash
python manage.py runserver
```

Backend will be available at: `http://127.0.0.1:8000`

---

## 🎨 Frontend Setup (React)

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Frontend Development Server
```bash
npm start
```

Frontend will open automatically at: `http://localhost:3000`

---

## 🔐 Login Credentials

### Admin Account
- **Email:** admin@example.com
- **Password:** Admin@123
- **Access:** Full system control, manage users, resources, final approvals

### Staff Account
- **Email:** staff@example.com
- **Password:** Staff@123
- **Access:** Approve bookings, view all bookings, create bookings

### Student Account
- **Email:** student@example.com
- **Password:** Student@123
- **Access:** Create bookings, view own bookings, cancel pending bookings

---

## 🧪 Testing the Application

### 1. Login as Student
1. Go to `http://localhost:3000`
2. Click on "Student" card
3. Login with: `student@example.com` / `Student@123`
4. Create a booking for a resource
5. View your bookings

### 2. Login as Staff
1. Logout and go back to home
2. Click on "Staff" card
3. Login with: `staff@example.com` / `Staff@123`
4. View pending bookings
5. Approve or reject student bookings

### 3. Login as Admin
1. Logout and go back to home
2. Click on "Administrator" card
3. Login with: `admin@example.com` / `Admin@123`
4. Manage resources (Create/Edit/Delete)
5. Manage users
6. Final approval of bookings

---

## 📁 Project Structure

```
campus-resource-management/
├── backend/                    # Django Backend
│   ├── backend/               # Project settings
│   ├── users/                 # User management app
│   ├── resources/             # Resource management app
│   ├── bookings/              # Booking management app
│   ├── manage.py
│   └── setup_backend.py       # Initial data setup
│
├── frontend/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── api/               # API configuration
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context (Auth)
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Page components
│   │   ├── routes/            # Route configuration
│   │   ├── services/          # API services
│   │   ├── utils/             # Utility functions
│   │   └── App.js
│   └── package.json
│
└── SETUP_INSTRUCTIONS.md       # This file
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `GET /api/auth/me/` - Get current user
- `POST /api/auth/logout/` - User logout

### Users
- `GET /api/users/` - List all users
- `GET /api/users/{id}/` - Get user details
- `PATCH /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user

### Resources
- `GET /api/resources/` - List all resources
- `GET /api/resources/{id}/` - Get resource details
- `POST /api/resources/` - Create resource
- `PATCH /api/resources/{id}/` - Update resource
- `DELETE /api/resources/{id}/` - Delete resource

### Bookings
- `GET /api/bookings/` - List bookings
- `GET /api/bookings/{id}/` - Get booking details
- `POST /api/bookings/` - Create booking
- `PATCH /api/bookings/{id}/` - Update booking
- `DELETE /api/bookings/{id}/` - Delete booking
- `POST /api/bookings/{id}/approve/` - Approve booking
- `POST /api/bookings/{id}/reject/` - Reject booking

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `mysqlclient` installation fails
```bash
# Windows: Install MySQL Connector
# Download from: https://dev.mysql.com/downloads/connector/python/

# Mac:
brew install mysql

# Linux:
sudo apt-get install python3-dev default-libmysqlclient-dev build-essential
```

**Problem:** Database connection error
- Verify MySQL is running
- Check database credentials in `settings.py`
- Ensure database `campus_db` exists

**Problem:** Migration errors
```bash
# Delete migrations and recreate
python manage.py migrate --fake
python manage.py makemigrations
python manage.py migrate
```

### Frontend Issues

**Problem:** CORS errors
- Ensure `corsheaders` is installed in backend
- Check `CORS_ALLOW_ALL_ORIGINS = True` in `settings.py`

**Problem:** API connection refused
- Verify backend is running on `http://127.0.0.1:8000`
- Check `baseURL` in `frontend/src/api/axiosInstance.js`

**Problem:** Login fails
- Check browser console for errors
- Verify backend authentication endpoints are working
- Test API directly: `http://127.0.0.1:8000/api/auth/login/`

---

## 🚀 Production Deployment

### Backend
```bash
# Update settings.py
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']

# Collect static files
python manage.py collectstatic

# Use production server (gunicorn)
pip install gunicorn
gunicorn backend.wsgi:application
```

### Frontend
```bash
# Build production bundle
npm run build

# Serve with nginx or deploy to hosting service
```

---

## 📝 Features

✅ User Authentication (Token-based)
✅ Role-Based Access Control (Student, Staff, Admin)
✅ Resource Management (CRUD)
✅ Booking System with Conflict Detection
✅ Approval Workflow (Staff → Admin)
✅ User Management
✅ Responsive Design
✅ Real-time Availability Checking
✅ Status Tracking (Pending/Approved/Rejected)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review console logs (browser and terminal)
3. Verify all dependencies are installed
4. Ensure both backend and frontend servers are running

---

## 📄 License

This project is for educational purposes.
