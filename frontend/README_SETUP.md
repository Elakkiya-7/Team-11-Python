# Campus Resource Management - Frontend Setup

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Start Development Server**
```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔧 Configuration

### Backend Connection

The frontend is configured to connect to the Django backend at:
```
http://127.0.0.1:8000/api/
```

### Development Mode

If the backend is not running, the app will automatically switch to **Demo Mode** with mock authentication.

To disable demo mode, edit `frontend/src/config/devMode.js`:
```javascript
export const DEV_MODE = false; // Set to false to require backend
```

## 🎭 Demo Credentials (When Backend is Unavailable)

Use any of these email patterns:
- **Student**: Any email containing "student" (e.g., `student@example.com`)
- **Staff**: Any email containing "staff" (e.g., `staff@example.com`)
- **Admin**: Any email containing "admin" (e.g., `admin@example.com`)

Password: Any valid password (8+ chars with uppercase, lowercase, number, special char)
Example: `Password123!`

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── axiosInstance.js      # API configuration
│   ├── components/
│   │   ├── BookingCard.jsx       # Booking display component
│   │   ├── DashboardCard.jsx     # Dashboard card component
│   │   ├── ErrorMessage.jsx      # Error display
│   │   ├── Layout.jsx            # Page layout wrapper
│   │   ├── LoadingSpinner.jsx    # Loading indicator
│   │   ├── Navbar.jsx            # Navigation bar
│   │   └── ProtectedRoute.jsx    # Route protection
│   ├── config/
│   │   └── devMode.js            # Development mode config
│   ├── context/
│   │   └── AuthContext.jsx       # Authentication state
│   ├── hooks/
│   │   ├── useBookings.js        # Booking data hook
│   │   └── useResources.js       # Resource data hook
│   ├── pages/
│   │   ├── AdminApprovalNew.jsx  # Admin approval page
│   │   ├── AdminDashboard.jsx    # Admin dashboard
│   │   ├── BookingFormNew.jsx    # Create booking form
│   │   ├── BookingListNew.jsx    # View all bookings
│   │   ├── Dashboard.jsx         # Landing page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── ResourceManagement.jsx # Manage resources
│   │   ├── StaffApprovalNew.jsx  # Staff approval page
│   │   ├── StaffDashboard.jsx    # Staff dashboard
│   │   ├── StudentDashboard.jsx  # Student dashboard
│   │   └── UserManagement.jsx    # Manage users
│   ├── routes/
│   │   └── AppRoutes.jsx         # Route configuration
│   ├── services/
│   │   └── api.js                # API service layer
│   ├── utils/
│   │   ├── bookingLogic.js       # Business logic
│   │   ├── constants.js          # App constants
│   │   └── validators.js         # Form validators
│   ├── App.js                    # Root component
│   ├── index.css                 # Global styles
│   ├── index.js                  # Entry point
│   └── styles.js                 # Style definitions
├── package.json
└── README_SETUP.md
```

## 🎨 Features

### Authentication
- ✅ JWT token-based authentication
- ✅ Role-based access control (Student, Staff, Admin)
- ✅ Protected routes
- ✅ Auto-redirect on unauthorized access
- ✅ Demo mode for development

### User Roles

**Student**
- Create bookings
- View own bookings
- Cancel pending bookings

**Staff**
- All student features
- Approve/reject student bookings
- View all bookings

**Admin**
- All staff features
- Final approval authority
- Manage resources (CRUD)
- Manage users (CRUD)
- Full system control

### Booking System
- ✅ Real-time availability checking
- ✅ Conflict detection (no double booking)
- ✅ Date validation (no past dates)
- ✅ Time slot management
- ✅ Status tracking (Pending/Approved/Rejected)

### Resource Management
- ✅ Create/Read/Update/Delete resources
- ✅ Resource types: Lab, Classroom, Event Hall
- ✅ Capacity management
- ✅ Availability status

### User Management
- ✅ View all users
- ✅ Edit user details
- ✅ Activate/deactivate users
- ✅ Role assignment

## 🎯 API Endpoints Expected

The frontend expects these backend endpoints:

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `GET /api/auth/me/` - Get current user
- `POST /api/auth/logout/` - User logout

### Users
- `GET /api/users/` - List users
- `GET /api/users/:id/` - Get user details
- `PATCH /api/users/:id/` - Update user
- `DELETE /api/users/:id/` - Delete user

### Resources
- `GET /api/resources/` - List resources
- `GET /api/resources/:id/` - Get resource details
- `POST /api/resources/` - Create resource
- `PATCH /api/resources/:id/` - Update resource
- `DELETE /api/resources/:id/` - Delete resource

### Bookings
- `GET /api/bookings/` - List bookings
- `GET /api/bookings/:id/` - Get booking details
- `POST /api/bookings/` - Create booking
- `PATCH /api/bookings/:id/` - Update booking
- `DELETE /api/bookings/:id/` - Delete booking
- `POST /api/bookings/:id/approve/` - Approve booking
- `POST /api/bookings/:id/reject/` - Reject booking

## 🐛 Troubleshooting

### Backend Connection Issues

If you see "Backend server may not be running" errors:

1. **Check if Django backend is running**
```bash
cd backend
python manage.py runserver
```

2. **Verify CORS is enabled** in Django settings:
```python
CORS_ALLOW_ALL_ORIGINS = True
```

3. **Check API URL** in `frontend/src/api/axiosInstance.js`

### Demo Mode Not Working

If demo mode isn't activating:
1. Check `frontend/src/config/devMode.js` - ensure `DEV_MODE = true`
2. Clear browser localStorage
3. Refresh the page

### Styling Issues

If styles aren't loading:
1. Ensure `index.css` is imported in `index.js`
2. Clear browser cache
3. Check browser console for errors

## 📱 Responsive Design

The app is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Design Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Hover effects on interactive elements
- Loading states with spinners
- Error handling with user-friendly messages
- Color-coded status badges
- Responsive grid layouts
- Professional typography

## 🔒 Security Features

- JWT token storage in localStorage
- Automatic token refresh
- Protected routes with role checking
- XSS protection
- CSRF token handling
- Secure password validation

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the Campus Resource Management System.
