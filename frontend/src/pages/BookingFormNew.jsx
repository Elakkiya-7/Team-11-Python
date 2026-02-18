import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { styles } from "../styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../hooks/useBookings";
import { useResources } from "../hooks/useResources";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { validateBookingDate, generateTimeSlots, hasBookingConflict } from "../utils/bookingLogic";

const BookingFormNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, createBooking } = useBookings();
  const { resources, loading: resourcesLoading } = useResources({ status: 'AVAILABLE' });

  const [form, setForm] = useState({
    resourceId: "",
    bookingDate: "",
    timeSlot: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const timeSlots = generateTimeSlots();

  useEffect(() => {
    if (form.resourceId && form.bookingDate) {
      // Filter out booked time slots
      const bookedSlots = bookings
        .filter(b => 
          b.resourceId === parseInt(form.resourceId) && 
          b.bookingDate === form.bookingDate &&
          b.status !== 'REJECTED'
        )
        .map(b => b.timeSlot);
      
      const available = timeSlots.filter(slot => !bookedSlots.includes(slot));
      setAvailableSlots(available);
    } else {
      setAvailableSlots(timeSlots);
    }
  }, [form.resourceId, form.bookingDate, bookings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate date
    const dateValidation = validateBookingDate(form.bookingDate);
    if (!dateValidation.valid) {
      setError(dateValidation.error);
      return;
    }

    // Check for conflicts
    if (hasBookingConflict(bookings, parseInt(form.resourceId), form.bookingDate, form.timeSlot)) {
      setError("This time slot is already booked for the selected resource");
      return;
    }

    setLoading(true);

    const bookingData = {
      userId: user.id,
      resourceId: parseInt(form.resourceId),
      bookingDate: form.bookingDate,
      timeSlot: form.timeSlot,
      status: 'PENDING'
    };

    const result = await createBooking(bookingData);

    setLoading(false);

    if (result.success) {
      alert('Booking created successfully!');
      
      // Navigate based on role
      if (user.role === 'STUDENT') navigate('/student');
      else if (user.role === 'STAFF') navigate('/staff');
      else if (user.role === 'ADMIN') navigate('/admin');
      else navigate('/');
    } else {
      setError(result.error);
    }
  };

  if (resourcesLoading) {
    return (
      <Layout>
        <LoadingSpinner message="Loading resources..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={styles.centerCard}>
        <h2>Create Booking</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Role: {user?.role}
        </p>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit}>
          <select
            style={styles.input}
            value={form.resourceId}
            onChange={(e) => setForm({ ...form, resourceId: e.target.value })}
            required
          >
            <option value="">Select Resource</option>
            {resources.map(resource => (
              <option key={resource.id} value={resource.id}>
                {resource.name} - {resource.type} (Capacity: {resource.capacity})
              </option>
            ))}
          </select>

          <input
            type="date"
            style={styles.input}
            value={form.bookingDate}
            onChange={(e) => setForm({ ...form, bookingDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />

          <select
            style={styles.input}
            value={form.timeSlot}
            onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
            required
            disabled={!form.resourceId || !form.bookingDate}
          >
            <option value="">Select Time Slot</option>
            {availableSlots.map(slot => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          {availableSlots.length === 0 && form.resourceId && form.bookingDate && (
            <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '-8px' }}>
              No available time slots for this date
            </p>
          )}

          <button 
            style={styles.button} 
            type="submit"
            disabled={loading || availableSlots.length === 0}
          >
            {loading ? 'Creating...' : 'Submit Booking'}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ ...styles.button, backgroundColor: '#6c757d', marginTop: '8px' }}
          >
            Cancel
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default BookingFormNew;
