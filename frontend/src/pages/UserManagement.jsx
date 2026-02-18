import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { validateEmail, validatePhone } from "../utils/validators";
import { styles } from "../styles";

const UserManagement = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
    role: "STUDENT",
    status: "ACTIVE"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(form.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (form.phone && !validatePhone(form.phone)) {
      alert('Phone must be exactly 10 digits');
      return;
    }

    try {
      if (editingId) {
        await userService.updateUser(editingId, form);
        alert('User updated successfully');
      } else {
        alert('User creation requires backend implementation with password');
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (user) => {
    setForm({
      username: user.username,
      email: user.email,
      phone: user.phone || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      role: user.role,
      status: user.status || "ACTIVE"
    });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (id === currentUser.id) {
      alert('You cannot delete your own account');
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.deleteUser(id);
        alert('User deleted successfully');
        fetchUsers();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    try {
      await userService.updateUser(user.id, { status: newStatus });
      alert(`User ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
      role: "STUDENT",
      status: "ACTIVE"
    });
    setEditingId(null);
    setShowForm(false);
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    padding: '6px 12px',
    margin: '0 4px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const getRoleBadge = (role) => {
    const colors = {
      ADMIN: '#dc3545',
      STAFF: '#007bff',
      STUDENT: '#28a745'
    };
    return {
      backgroundColor: colors[role] || '#6c757d',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    };
  };

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1>User Management</h1>
          <button 
            onClick={() => navigate('/admin')}
            style={{ ...styles.button, backgroundColor: '#6c757d' }}
          >
            Back to Dashboard
          </button>
        </div>

        {showForm && (
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <h3>Edit User</h3>
            <form onSubmit={handleSubmit}>
              <input
                style={styles.input}
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                disabled={editingId}
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
                placeholder="Phone (10 digits)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                style={styles.input}
                type="text"
                placeholder="First Name"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              />

              <input
                style={styles.input}
                type="text"
                placeholder="Last Name"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
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

              <select
                style={styles.input}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" style={styles.button}>
                  Update
                </button>
                <button 
                  type="button" 
                  onClick={resetForm}
                  style={{ ...styles.button, backgroundColor: '#6c757d' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading && <LoadingSpinner message="Loading users..." />}
        
        {error && <ErrorMessage message={error} onRetry={fetchUsers} />}
        
        {!loading && !error && users.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>No users found.</p>
          </div>
        )}
        
        {!loading && !error && users.length > 0 && (
          <div>
            <h2>All Users ({users.length})</h2>
            {users.map(user => (
              <div key={user.id} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0' }}>
                      {user.first_name} {user.last_name} (@{user.username})
                    </h3>
                    <p style={{ margin: '4px 0', color: '#666' }}>
                      <strong>Email:</strong> {user.email}
                    </p>
                    {user.phone && (
                      <p style={{ margin: '4px 0', color: '#666' }}>
                        <strong>Phone:</strong> {user.phone}
                      </p>
                    )}
                    <p style={{ margin: '8px 0 4px 0' }}>
                      <span style={getRoleBadge(user.role)}>{user.role}</span>
                      <span style={{
                        marginLeft: '8px',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        backgroundColor: user.status === 'ACTIVE' ? '#28a745' : '#6c757d',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {user.status || 'ACTIVE'}
                      </span>
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEdit(user)}
                      style={{ ...buttonStyle, backgroundColor: '#007bff', color: 'white' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user)}
                      style={{ ...buttonStyle, backgroundColor: '#FFA500', color: 'white' }}
                    >
                      {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ ...buttonStyle, backgroundColor: '#dc3545', color: 'white' }}
                      disabled={user.id === currentUser.id}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserManagement;
