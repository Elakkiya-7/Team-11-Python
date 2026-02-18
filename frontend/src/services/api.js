import axiosInstance from '../api/axiosInstance';

// Auth Services
export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post('auth/login/', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await axiosInstance.post('auth/register/', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await axiosInstance.post('auth/logout/');
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await axiosInstance.get('auth/me/');
    return response.data;
  }
};

// User Services
export const userService = {
  getUsers: async (params = {}) => {
    const response = await axiosInstance.get('users/', { params });
    return response.data;
  },
  
  getUserById: async (id) => {
    const response = await axiosInstance.get(`users/${id}/`);
    return response.data;
  },
  
  updateUser: async (id, data) => {
    const response = await axiosInstance.patch(`users/${id}/`, data);
    return response.data;
  },
  
  deleteUser: async (id) => {
    const response = await axiosInstance.delete(`users/${id}/`);
    return response.data;
  }
};

// Resource Services
export const resourceService = {
  getResources: async (params = {}) => {
    const response = await axiosInstance.get('resources/', { params });
    return response.data;
  },
  
  getResourceById: async (id) => {
    const response = await axiosInstance.get(`resources/${id}/`);
    return response.data;
  },
  
  createResource: async (data) => {
    const response = await axiosInstance.post('resources/', data);
    return response.data;
  },
  
  updateResource: async (id, data) => {
    const response = await axiosInstance.patch(`resources/${id}/`, data);
    return response.data;
  },
  
  deleteResource: async (id) => {
    const response = await axiosInstance.delete(`resources/${id}/`);
    return response.data;
  },
  
  getAvailableResources: async (date, timeSlot) => {
    const response = await axiosInstance.get('resources/available/', {
      params: { date, timeSlot }
    });
    return response.data;
  }
};

// Booking Services
export const bookingService = {
  getBookings: async (params = {}) => {
    const response = await axiosInstance.get('bookings/', { params });
    return response.data;
  },
  
  getBookingById: async (id) => {
    const response = await axiosInstance.get(`bookings/${id}/`);
    return response.data;
  },
  
  createBooking: async (data) => {
    const response = await axiosInstance.post('bookings/', data);
    return response.data;
  },
  
  updateBooking: async (id, data) => {
    const response = await axiosInstance.patch(`bookings/${id}/`, data);
    return response.data;
  },
  
  deleteBooking: async (id) => {
    const response = await axiosInstance.delete(`bookings/${id}/`);
    return response.data;
  },
  
  approveBooking: async (id) => {
    const response = await axiosInstance.post(`bookings/${id}/approve/`);
    return response.data;
  },
  
  rejectBooking: async (id, reason) => {
    const response = await axiosInstance.post(`bookings/${id}/reject/`, { reason });
    return response.data;
  },
  
  getMyBookings: async () => {
    const response = await axiosInstance.get('bookings/my-bookings/');
    return response.data;
  },
  
  getPendingBookings: async () => {
    const response = await axiosInstance.get('bookings/', {
      params: { status: 'PENDING' }
    });
    return response.data;
  }
};
