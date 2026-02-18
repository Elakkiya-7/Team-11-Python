import { useState, useEffect, useCallback } from 'react';
import { bookingService } from '../services/api';

export const useBookings = (filters = {}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingService.getBookings(filters);
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const createBooking = async (bookingData) => {
    try {
      const newBooking = await bookingService.createBooking(bookingData);
      setBookings(prev => [...prev, newBooking]);
      return { success: true, data: newBooking };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to create booking' 
      };
    }
  };

  const updateBooking = async (id, data) => {
    try {
      const updated = await bookingService.updateBooking(id, data);
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
      return { success: true, data: updated };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to update booking' 
      };
    }
  };

  const deleteBooking = async (id) => {
    try {
      await bookingService.deleteBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete booking' 
      };
    }
  };

  const approveBooking = async (id) => {
    try {
      const updated = await bookingService.approveBooking(id);
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
      return { success: true, data: updated };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to approve booking' 
      };
    }
  };

  const rejectBooking = async (id, reason) => {
    try {
      const updated = await bookingService.rejectBooking(id, reason);
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
      return { success: true, data: updated };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to reject booking' 
      };
    }
  };

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    approveBooking,
    rejectBooking
  };
};
