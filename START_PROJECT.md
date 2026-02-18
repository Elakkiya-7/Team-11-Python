# 🚀 Quick Start Guide

## Step 1: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
pip install django djangorestframework django-cors-headers mysqlclient

# Create database in MySQL
mysql -u root -p
CREATE DATABASE campus_db;
EXIT;

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create initial data (users & resources)
python setup_backend.py

# Start backend server
python manage.py runserver
```

Backend will run at: **http://127.0.0.1:8000**

---

## Step 2: Setup Frontend

Open a NEW terminal window:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend server
npm start
```

Frontend will open at: **http://localhost:3000**

---

## Step 3: Login & Test

### 🎓 Student Login
- Email: `student@example.com`
- Password: `Student@123`
- Can: Create bookings, view own bookings

### 👨‍🏫 Staff Login
- Email: `staff@example.com`
- Password: `Staff@123`
- Can: Approve bookings, view all bookings

### 👨‍💼 Admin Login
- Email: `admin@example.com`
- Password: `Admin@123`
- Can: Full system control, manage users & resources

---

## ✅ Verification Checklist

- [ ] MySQL is running
- [ ] Database `campus_db` created
- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] Can login with test credentials
- [ ] No CORS errors in browser console

---

## 🐛 Common Issues

**Backend won't start:**
- Check MySQL is running
- Verify database credentials in `backend/backend/settings.py`

**Frontend can't connect:**
- Ensure backend is running on http://127.0.0.1:8000
- Check browser console for errors

**Login fails:**
- Run `python setup_backend.py` to create test users
- Check backend terminal for errors

---

## 📞 Need Help?

Check `SETUP_INSTRUCTIONS.md` for detailed troubleshooting.
