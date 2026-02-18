import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../hooks/useBookings";
import BookingCard from "../components/BookingCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { getBookingStats, filterBookingsByStatus } from "../utils/bookingLogic";
import { styles } from "../styles";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { bookings, loading, error, fetchBookings, approveBooking, rejectBooking } = useBookings();
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    if (bookings.length > 0) {
      setStats(getBookingStats(bookings));
    }
  }, [bookings]);

  const handleApprove = async (id) => {
    if (window.confirm('Approve this booking?')) {
      const result = await approveBooking(id);
      if (result.success) {
        alert('Booking approved successfully');
      } else {
        alert(result.error);
      }
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      const result = await rejectBooking(id, reason);
      if (result.success) {
        alert('Booking rejected');
      } else {
        alert(result.error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredBookings = filter === 'ALL' 
    ? bookings 
    : filterBookingsByStatus(bookings, filter);

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1>Staff Dashboard</h1>
            <p style={{ color: '#666' }}>Welcome, {user?.first_name || user?.username}!</p>
          </div>
          <button onClick={handleLogout} style={{ ...styles.button, backgroundColor: '#dc3545' }}>
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#007bff', color: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{stats.total}</h3>
            <p style={{ margin: 0 }}>Total Bookings</p>
          </div>
          <div style={{ backgroundColor: '#FFA500', color: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{stats.pending}</h3>
            <p style={{ margin: 0 }}>Pending Approval</p>
          </div>
          <div style={{ backgroundColor: '#28a745', color: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{stats.approved}</h3>
            <p style={{ margin: 0 }}>Approved</p>
          </div>
          <div style={{ backgroundColor: '#dc3545', color: 'white', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{stats.rejected}</h3>
            <p style={{ margin: 0 }}>Rejected</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ marginBottom: '32px' }}>
          <button 
            onClick={() => navigate('/booking', { state: { role: 'staff' } })}
            style={{ ...styles.button, marginRight: '12px' }}
          >
            Create Booking
          </button>
          <button 
            onClick={() => navigate('/staff-approval')}
            style={{ ...styles.button, backgroundColor: '#FFA500' }}
          >
            Pending Approvals ({stats.pending})
          </button>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '8px' }}>
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                ...styles.button,
                backgroundColor: filter === status ? '#007bff' : '#6c757d',
                padding: '8px 16px'
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div>
          <h2>All Bookings</h2>
          
          {loading && <LoadingSpinner message="Loading bookings..." />}
          
          {error && <ErrorMessage message={error} onRetry={fetchBookings} />}
          
          {!loading && !error && filteredBookings.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p>No bookings found.</p>
            </div>
          )}
          
          {!loading && !error && filteredBookings.length > 0 && (
            <div>
              {filteredBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  showActions={booking.status === 'PENDING'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StaffDashboard;
