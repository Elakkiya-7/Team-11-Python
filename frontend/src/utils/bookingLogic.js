// Business logic for booking workflows

export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  STUDENT: 'STUDENT'
};

export const RESOURCE_TYPES = {
  LAB: 'LAB',
  CLASSROOM: 'CLASSROOM',
  EVENT_HALL: 'EVENT_HALL'
};

// Check if booking can be edited
export const canEditBooking = (booking, userRole) => {
  if (userRole === USER_ROLES.ADMIN) return true;
  if (booking.status !== BOOKING_STATUS.PENDING) return false;
  return true;
};

// Check if booking can be deleted
export const canDeleteBooking = (booking, userRole, userId) => {
  if (userRole === USER_ROLES.ADMIN) return true;
  if (booking.userId === userId && booking.status === BOOKING_STATUS.PENDING) return true;
  return false;
};

// Check if user can approve booking
export const canApproveBooking = (booking, userRole) => {
  if (booking.status !== BOOKING_STATUS.PENDING) return false;
  if (userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.STAFF) return true;
  return false;
};

// Get booking status color
export const getStatusColor = (status) => {
  switch (status) {
    case BOOKING_STATUS.PENDING:
      return '#FFA500';
    case BOOKING_STATUS.APPROVED:
      return '#28a745';
    case BOOKING_STATUS.REJECTED:
      return '#dc3545';
    default:
      return '#6c757d';
  }
};

// Get booking status badge
export const getStatusBadge = (status) => {
  const color = getStatusColor(status);
  return {
    backgroundColor: color,
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  };
};

// Validate booking date
export const validateBookingDate = (date) => {
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (bookingDate < today) {
    return { valid: false, error: 'Cannot book past dates' };
  }
  
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90); // 90 days advance booking
  
  if (bookingDate > maxDate) {
    return { valid: false, error: 'Cannot book more than 90 days in advance' };
  }
  
  return { valid: true };
};

// Check for booking conflicts
export const hasBookingConflict = (bookings, resourceId, date, timeSlot, excludeId = null) => {
  return bookings.some(booking => 
    booking.id !== excludeId &&
    booking.resourceId === resourceId &&
    booking.bookingDate === date &&
    booking.timeSlot === timeSlot &&
    booking.status !== BOOKING_STATUS.REJECTED
  );
};

// Format time slot
export const formatTimeSlot = (timeSlot) => {
  if (!timeSlot) return '';
  const [start, end] = timeSlot.split('-');
  return `${start} - ${end}`;
};

// Generate time slots
export const generateTimeSlots = () => {
  const slots = [];
  const startHour = 8; // 8 AM
  const endHour = 18; // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    const start = `${hour.toString().padStart(2, '0')}:00`;
    const end = `${(hour + 1).toString().padStart(2, '0')}:00`;
    slots.push(`${start}-${end}`);
  }
  
  return slots;
};

// Filter bookings by status
export const filterBookingsByStatus = (bookings, status) => {
  if (!status) return bookings;
  return bookings.filter(booking => booking.status === status);
};

// Filter bookings by user
export const filterBookingsByUser = (bookings, userId) => {
  return bookings.filter(booking => booking.userId === userId);
};

// Filter bookings by date range
export const filterBookingsByDateRange = (bookings, startDate, endDate) => {
  return bookings.filter(booking => {
    const bookingDate = new Date(booking.bookingDate);
    return bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate);
  });
};

// Sort bookings
export const sortBookings = (bookings, sortBy = 'date', order = 'asc') => {
  return [...bookings].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.bookingDate) - new Date(b.bookingDate);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'resource':
        comparison = a.resourceId - b.resourceId;
        break;
      default:
        comparison = 0;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
};

// Get booking statistics
export const getBookingStats = (bookings) => {
  return {
    total: bookings.length,
    pending: bookings.filter(b => b.status === BOOKING_STATUS.PENDING).length,
    approved: bookings.filter(b => b.status === BOOKING_STATUS.APPROVED).length,
    rejected: bookings.filter(b => b.status === BOOKING_STATUS.REJECTED).length
  };
};
