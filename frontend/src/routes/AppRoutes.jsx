import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth pages
import StudentRegister from "../pages/StudentRegister";
import StudentLogin from "../pages/StudentLogin";
import StaffLogin from "../pages/StaffLogin";

// Dashboards
import StudentDashboard from "../pages/StudentDashboard";
import StaffDashboard from "../pages/StaffDashboard";
import AdminDashboard from "../pages/AdminDashboard";

// Booking pages
import BookingForm from "../pages/BookingForm";
import BookingList from "../pages/BookingList";

// Approval pages
import StaffApproval from "../pages/StaffApproval";
import AdminApproval from "../pages/AdminApproval";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<StudentRegister />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/staff-login" element={<StaffLogin />} />

        {/* Dashboards */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Booking */}
        <Route path="/book-resource" element={<BookingForm />} />
        <Route path="/bookings" element={<BookingList />} />

        {/* Approvals */}
        <Route path="/staff-approvals" element={<StaffApproval />} />
        <Route path="/admin-approvals" element={<AdminApproval />} />
        <Route path="/dashboard" element={<StudentDashboard />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
