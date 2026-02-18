import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../hooks/useBookings";
import BookingCard from "../components/BookingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { filterBookingsByStatus } from "../utils/bookingLogic";
import { styles } from "../styles";

const StaffApprovalNew = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookings, loading, error, fetchBookings, approveBooking, rejectBooking } = useBookings();
  const [processing, setProcessing] = useState(false);

  const pendingBookings = filterBookingsByStatus(bookings, 'PENDING');

  const handleApprove = async (id) => {
    if (window.confirm('Approve this booking?')) {
      setProcessing(true);
      const result = await approveBooking(id);
      setProcessing(false);
      
      if (result.success) {
        alert('Booking approved successfully');
        fetchBookings();
      } else {
        alert(result.error);
      }
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      setProcessing(true);
      const result = await rejectBooking(id, reason);
      setProcessing(false);
      
      if (result.success) {
        alert('Booking rejected');
        fetchBookings();
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1>Pending Approvals</h1>
            <p style={{ color: '#666' }}>Review and approve student bookings</p>
          </div>
          <button 
            onClick={() => navigate('/staff')}
            style={{ ...styles.button, backgroundColor: '#6c757d' }}
          >
            Back to Dashboard
          </button>
        </div>

        {loading && <LoadingSpinner message="Loading pending bookings..." />}
        
        {error && <ErrorMessage message={error} onRetry={fetchBookings} />}
        
        {!loading && !error && pendingBookings.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#666', marginBottom: '8px' }}>No Pending Approvals</h3>
            <p style={{ color: '#999' }}>All bookings have been processed</p>
          </div>
        )}
        
        {!loading && !error && pendingBookings.length > 0 && (
          <div>
            <div style={{ 
              backgroundColor: '#fff3cd', 
              padding: '12px 16px', 
              borderRadius: '8px',
              marginBottom: '20px',
              border: '1px solid #ffc107'
            }}>
              <strong>{pendingBookings.length}</strong> booking(s) awaiting your approval
            </div>
            
            {pendingBookings.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onApprove={handleApprove}
                onReject={handleReject}
                showActions={!processing}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StaffApprovalNew;
