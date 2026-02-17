import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";

const StudentRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validatePhone(form.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!validatePassword(form.password)) {
      setError(
        "Password must be 8+ chars, include upper, lower, number, and special character."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Registration successful");
    navigate("/student-login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Student Register</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label>Name</label>
            <input
              style={styles.input}
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Email</label>
            <input
              style={styles.input}
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Phone</label>
            <input
              style={styles.input}
              name="phone"
              value={form.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setForm({ ...form, phone: value });
                }
              }}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <input
              type="password"
              style={styles.input}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Confirm Password</label>
            <input
              type="password"
              style={styles.input}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
