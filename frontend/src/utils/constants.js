// API Configuration
export const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  STUDENT: 'STUDENT'
};

// User Status
export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

// Resource Types
export const RESOURCE_TYPES = {
  LAB: 'LAB',
  CLASSROOM: 'CLASSROOM',
  EVENT_HALL: 'EVENT_HALL'
};

// Resource Status
export const RESOURCE_STATUS = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE'
};

// Time Slots (8 AM to 6 PM)
export const TIME_SLOTS = [
  '08:00-09:00',
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '13:00-14:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00',
  '17:00-18:00'
];

// Date Constraints
export const MAX_ADVANCE_BOOKING_DAYS = 90;

// Validation Messages
export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: 'Please enter a valid email address',
  PHONE_INVALID: 'Phone must be exactly 10 digits',
  PASSWORD_WEAK: 'Password must be 8+ chars with uppercase, lowercase, number, and special char',
  PASSWORDS_MISMATCH: 'Passwords do not match',
  REQUIRED_FIELD: 'This field is required',
  PAST_DATE: 'Cannot book past dates',
  DOUBLE_BOOKING: 'This time slot is already booked',
  MAX_ADVANCE: `Cannot book more than ${MAX_ADVANCE_BOOKING_DAYS} days in advance`
};
