import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';
import axiosInstance from '../api/axiosInstance';
import { DEV_MODE, mockLogin, MOCK_USERS } from '../config/devMode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [backendAvailable, setBackendAvailable] = useState(true);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      setBackendAvailable(true);
    } catch (error) {
      console.error('Failed to load user:', error);
      setBackendAvailable(false);
      
      // In dev mode, try to load mock user
      if (DEV_MODE) {
        const mockUser = localStorage.getItem('mockUser');
        if (mockUser) {
          setUser(JSON.parse(mockUser));
        } else if (error.response?.status === 401) {
          logout();
        }
      } else if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      
      // Handle different response structures
      const token = data.token || data.access || data.key;
      const userData = data.user || data;
      
      if (token) {
        localStorage.setItem('token', token);
        setToken(token);
        setUser(userData);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        setUser(userData);
      }
      
      setBackendAvailable(true);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      setBackendAvailable(false);
      
      // Fallback to mock login in dev mode
      if (DEV_MODE) {
        console.warn('Backend unavailable. Using mock authentication.');
        const mockResult = mockLogin(credentials);
        
        if (mockResult.success) {
          localStorage.setItem('token', mockResult.token);
          localStorage.setItem('mockUser', JSON.stringify(mockResult.user));
          setToken(mockResult.token);
          setUser(mockResult.user);
          return { success: true, user: mockResult.user };
        }
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed. Backend server may not be running.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      setBackendAvailable(true);
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      setBackendAvailable(false);
      
      // In dev mode, simulate successful registration
      if (DEV_MODE) {
        console.warn('Backend unavailable. Simulating registration.');
        return { 
          success: true, 
          data: { message: 'Registration simulated. Please use login.' } 
        };
      }
      
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Registration failed. Backend server may not be running.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mockUser');
    setToken(null);
    setUser(null);
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  const isAuthenticated = () => !!user;
  
  const hasRole = (role) => user?.role === role;
  
  const isAdmin = () => hasRole('ADMIN');
  const isStaff = () => hasRole('STAFF');
  const isStudent = () => hasRole('STUDENT');

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
    isAdmin,
    isStaff,
    isStudent,
    backendAvailable
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
