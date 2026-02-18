import React from 'react';
import { getStatusBadge, formatTimeSlot } from '../utils/bookingLogic';

const BookingCard = ({ booking, onApprove, onReject, onDelete, showActions = true }) => {
  const cardStyle = {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 6px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '12px',
  };

  const infoGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginBottom: '16px',
  };

  const infoItemStyle = {
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    border: '1px solid #e9ecef',
  };

  return (
    <div style={cardStyle} className="booking-card">
      <div style={headerStyle}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '20px',
            color: '#2d3748',
            fontWeight: '700'
          }}>
            {booking.resourceName || `Resource #${booking.resourceId}`}
          </h3>
          {booking.resourceType && (
            <span style={{
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              marginTop: '4px'
            }}>
              {booking.resourceType}
            </span>
          )}
        </div>
        <div>
          <span style={getStatusBadge(booking.status)}>{booking.status}</span>
        </div>
      </div>

      <div style={infoGridStyle}>
        <div style={infoItemStyle}>
          <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px', fontWeight: '600' }}>
            📅 DATE
          </div>
          <div style={{ fontSize: '15px', color: '#2d3748', fontWeight: '600' }}>
            {new Date(booking.bookingDate).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div style={infoItemStyle}>
          <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px', fontWeight: '600' }}>
            🕐 TIME SLOT
          </div>
          <div style={{ fontSize: '15px', color: '#2d3748', fontWeight: '600' }}>
            {formatTimeSlot(booking.timeSlot)}
          </div>
        </div>

        {booking.userName && (
          <div style={infoItemStyle}>
            <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px', fontWeight: '600' }}>
              👤 BOOKED BY
            </div>
            <div style={{ fontSize: '15px', color: '#2d3748', fontWeight: '600' }}>
              {booking.userName}
            </div>
          </div>
        )}
      </div>
      
      {showActions && booking.status === 'PENDING' && (
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '2px solid #f0f0f0',
          flexWrap: 'wrap'
        }}>
          {onApprove && (
            <button
              onClick={() => onApprove(booking.id)}
              style={{ 
                ...buttonStyle, 
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                color: 'white',
                flex: 1,
                minWidth: '120px'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              ✓ Approve
            </button>
          )}
          {onReject && (
            <button
              onClick={() => onReject(booking.id)}
              style={{ 
                ...buttonStyle, 
                background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
                color: 'white',
                flex: 1,
                minWidth: '120px'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              ✗ Reject
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(booking.id)}
              style={{ 
                ...buttonStyle, 
                background: 'linear-gradient(135deg, #868f96 0%, #596164 100%)',
                color: 'white',
                flex: 1,
                minWidth: '120px'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              🗑 Delete
            </button>
          )}
        </div>
      )}

      <style>
        {`
          .booking-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          }
        `}
      </style>
    </div>
  );
};

export default BookingCard;
