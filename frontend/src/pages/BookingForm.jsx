import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { styles } from "../styles";

const BookingForm = () => {
  const [form, setForm] = useState({
    resource: "",
    date: "",
    time: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const today = new Date().toISOString().split("T")[0];

    // Date validation
    if (form.date < today) {
      setError("Booking date cannot be in the past.");
      return;
    }

    // Time validation (8 AM to 6 PM)
    const hour = parseInt(form.time.split(":")[0]);
    if (hour < 8 || hour > 18) {
      setError("Booking allowed only between 8:00 AM and 6:00 PM.");
      return;
    }

    alert("Booking request sent to staff");
    setForm({ resource: "", date: "", time: "" });
  };

  return (
    <>
      <Navbar role="student" />

      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Book Resource</h2>

          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <label>Resource</label>
              <select
                style={styles.input}
                name="resource"
                value={form.resource}
                onChange={handleChange}
                required
              >
                <option value="">Select a resource</option>
                <option value="Lab 1">Lab 1</option>
                <option value="Lab 2">Lab 2</option>
                <option value="Classroom">Classroom</option>
              </select>
            </div>

            <div style={styles.field}>
              <label>Date</label>
              <input
                type="date"
                style={styles.input}
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.field}>
              <label>Time</label>
              <input
                type="time"
                style={styles.input}
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>

            <button style={styles.button} type="submit">
              Submit Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
