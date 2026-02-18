import React, { useState } from "react";
import Layout from "../components/Layout";
import { styles } from "../styles";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = ({ bookings, setBookings }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role || "student";

  const [form, setForm] = useState({
    resource: "",
    date: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent double booking
    const exists = bookings.find(
      (b) =>
        b.resource === form.resource &&
        b.date === form.date &&
        b.time === form.time
    );

    if (exists) {
      alert("Resource already booked for this time slot.");
      return;
    }

    // Status logic
    let status = "PENDING_STAFF";
    if (role === "staff") status = "PENDING_ADMIN";
    if (role === "admin") status = "APPROVED";

    const newBooking = {
      ...form,
      role,
      status,
    };

    setBookings([...bookings, newBooking]);

    alert(`Booking created with status: ${status}`);

    // Redirect to correct dashboard
    if (role === "student") navigate("/student");
    if (role === "staff") navigate("/staff");
    if (role === "admin") navigate("/admin");
  };

  return (
    <Layout>
      <div style={styles.centerCard}>
        <h2>Book Resource ({role})</h2>

        <form onSubmit={handleSubmit}>
          <select
            style={styles.input}
            required
            onChange={(e) =>
              setForm({ ...form, resource: e.target.value })
            }
          >
            <option value="">Select Resource</option>
            <option>Lab</option>
            <option>Classroom</option>
            <option>Event Hall</option>
          </select>

          <input
            type="date"
            style={styles.input}
            required
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />

          <input
            type="time"
            style={styles.input}
            required
            onChange={(e) =>
              setForm({ ...form, time: e.target.value })
            }
          />

          <button style={styles.button}>
            Submit Booking
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default BookingForm;
