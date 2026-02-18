import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../hooks/useBookings";
import BookingCard from "../components/BookingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { filterBookingsByStatus, sortBookings } from "../utils/bookingLogic";
import { styles } from "../styles";

const BookingListNew = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, loading, error, fetchBookings, deleteBooking } = useBookings();
  const [filter, setFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('date');

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const result = await deleteBooking(id);
      if (result.success) {
        alert('Booking deleted successfully');
        fetchBookings();
      } else {
        alert(result.error);
      }
    }
  };

  let filteredBookings = filter === 'ALL' 
    ? bookings 
    : filterBookingsByStatus(bookings, filter);

  filteredBookings = sortBookings(filteredBookings, sortBy);

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1>All Bookings</h1>
            <p style={{ color: '#666' }}>View and manage your bookings</p>
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{ ...styles.button, backgroundColor: '#6c757d' }}
          >
            Back
          </button>
        </div>

        {/* Filter and Sort Controls */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Filter:</label>
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                style={{
                  ...styles.button,
                  backgroundColor: filter === status ? '#007bff' : '#6c757d',
                  padding: '6px 12px',
                  marginRight: '8px',
                  fontSize: '14px'
                }}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div>
            <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ ...styles.input, width: 'auto', display: 'inline-block' }}
            >
              <option value="date">Date</option>
              <option value="status">Status</option>
              <option value="resource">Resource</option>
            </select>
          </div>
        </div>

        {loading && <LoadingSpinner message="Loading bookings..." />}
        
        {error && <ErrorMessage message={error} onRetry={fetchBookings} />}
        
        {!loading && !error && filteredBookings.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#666', marginBottom: '8px' }}>No Bookings Found</h3>
            <p style={{ color: '#999' }}>Try adjusting your filters</p>
          </div>
        )}
        
        {!loading && !error && filteredBookings.length > 0 && (
          <div>
            <div style={{ marginBottom: '16px', color: '#666' }}>
              Showing {filteredBookings.length} booking(s)
            </div>
            
            {filteredBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onDelete={user?.role === 'ADMIN' || booking.userId === user?.id ? handleDelete : null}
                showActions={booking.status === 'PENDING'}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingListNew;
