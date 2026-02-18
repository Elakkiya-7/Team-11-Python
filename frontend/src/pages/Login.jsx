import React, { useState } from "react";
import Layout from "../components/Layout";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail, validatePassword } from "../utils/validators";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.username || !form.password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);

    const result = await login({
      username: form.username,
      password: form.password
    });

    setLoading(false);

    if (result.success) {
      const { user } = result;
      
      // Navigate based on role
      if (user.role === 'STUDENT') navigate("/student");
      else if (user.role === 'STAFF') navigate("/staff");
      else if (user.role === 'ADMIN') navigate("/admin");
      else navigate("/");
    } else {
      setError(result.error);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <LoadingSpinner message="Logging in..." />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.centerCard}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔐</div>
          <h2 style={{ fontSize: '32px', marginBottom: '8px', color: '#2d3748' }}>Welcome Back</h2>
          <p style={{ color: '#718096', fontSize: '15px' }}>Sign in to your account</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: '600', fontSize: '14px' }}>
              Username or Email
            </label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter your username or email"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#4a5568', fontWeight: '600', fontSize: '14px' }}>
              Password
            </label>
            <input
              style={styles.input}
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button style={{ ...styles.button, width: '100%', marginBottom: '16px' }} type="submit">
            Sign In
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '2px solid #e2e8f0'
        }}>
          <p style={{ color: '#718096', fontSize: '14px' }}>
            Don't have an account?{' '}
            <span 
              onClick={() => navigate('/register')}
              style={{ 
                color: '#667eea', 
                cursor: 'pointer', 
                fontWeight: '600',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
