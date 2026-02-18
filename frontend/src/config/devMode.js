// Development mode configuration
// Set this to true to enable mock data when backend is not available
export const DEV_MODE = false; // DISABLED - Using real backend

// Mock user data for development
export const MOCK_USERS = {
  student: {
    id: 1,
    username: 'student',
    email: 'student@example.com',
    first_name: 'John',
    last_name: 'Student',
    role: 'STUDENT',
    status: 'ACTIVE'
  },
  staff: {
    id: 2,
    username: 'staff',
    email: 'staff@example.com',
    first_name: 'Jane',
    last_name: 'Staff',
    role: 'STAFF',
    status: 'ACTIVE'
  },
  admin: {
    id: 3,
    username: 'admin',
    email: 'admin@example.com',
    first_name: 'Admin',
    last_name: 'User',
    role: 'ADMIN',
    status: 'ACTIVE'
  }
};

// Mock login function
export const mockLogin = (credentials) => {
  const { username, password } = credentials;
  
  // Simple mock authentication
  if (username.includes('student') || username.includes('Student')) {
    return { success: true, user: MOCK_USERS.student, token: 'mock-token-student' };
  } else if (username.includes('staff') || username.includes('Staff')) {
    return { success: true, user: MOCK_USERS.staff, token: 'mock-token-staff' };
  } else if (username.includes('admin') || username.includes('Admin')) {
    return { success: true, user: MOCK_USERS.admin, token: 'mock-token-admin' };
  }
  
  return { success: false, error: 'Invalid credentials' };
};

// Check if backend is available
export const checkBackendAvailability = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/', { 
      method: 'GET',
      timeout: 3000 
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};
