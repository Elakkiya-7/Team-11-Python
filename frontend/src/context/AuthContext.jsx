import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loadUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      
      const token = data.token;
      const userData = data.user;
      
      if (token) {
        localStorage.setItem('token', token);
        setToken(token);
        setUser(userData);
        axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
      }
      
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || error.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.username?.[0] || 
                          error.response?.data?.email?.[0] || 
                          error.response?.data?.message || 
                          'Registration failed. Please try again.';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
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
    isStudent
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
