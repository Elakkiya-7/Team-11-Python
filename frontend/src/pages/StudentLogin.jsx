import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../styles";

const StudentLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/student-dashboard");

  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Student Login</h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label>Email</label>
            <input
              style={styles.input}
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.field}>
            <label>Password</label>
            <input
              type="password"
              style={styles.input}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <button style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
