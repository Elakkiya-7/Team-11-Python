import React, { useState } from "react";
import Layout from "../components/Layout";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validators";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    role: "STUDENT"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(form.email)) {
      setError("Enter valid email address");
      return;
    }

    if (!validatePassword(form.password)) {
      setError("Password must be 8+ chars with uppercase, lowercase, number, and special char");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!form.first_name || !form.last_name) {
      setError("First name and last name are required");
      return;
    }

    setLoading(true);

    const result = await register({
      username: form.username,
      email: form.email,
      password: form.password,
      first_name: form.first_name,
      last_name: form.last_name,
      role: form.role
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoadingSpinner message="Creating account..." />
      </Layout>
    );
  }

  if (success) {
    return (
      <Layout>
        <div style={styles.centerCard}>
          <div style={{ 
            backgroundColor: '#d4edda', 
            color: '#155724', 
            padding: '16px', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Registration Successful!</h3>
            <p>Redirecting to login...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={styles.centerCard}>
        <h2>Register</h2>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            style={styles.input}
            type="text"
            placeholder="First Name"
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            required
          />

          <input
            style={styles.input}
            type="text"
            placeholder="Last Name"
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            required
          />

          <select
            style={styles.input}
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            <option value="STUDENT">Student</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />

          <button style={styles.button} type="submit">
            Register
          </button>
        </form>

        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Already have an account?{' '}
          <span 
            onClick={() => navigate('/login')}
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login here
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default Register;
