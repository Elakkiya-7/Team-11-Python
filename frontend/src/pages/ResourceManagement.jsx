import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useResources } from "../hooks/useResources";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { styles } from "../styles";

const ResourceManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resources, loading, error, fetchResources, createResource, updateResource, deleteResource } = useResources();
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    type: "LAB",
    capacity: "",
    status: "AVAILABLE"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const resourceData = {
      name: form.name,
      type: form.type,
      capacity: parseInt(form.capacity),
      status: form.status
    };

    let result;
    if (editingId) {
      result = await updateResource(editingId, resourceData);
    } else {
      result = await createResource(resourceData);
    }

    if (result.success) {
      alert(editingId ? 'Resource updated successfully' : 'Resource created successfully');
      resetForm();
      fetchResources();
    } else {
      alert(result.error);
    }
  };

  const handleEdit = (resource) => {
    setForm({
      name: resource.name,
      type: resource.type,
      capacity: resource.capacity.toString(),
      status: resource.status
    });
    setEditingId(resource.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const result = await deleteResource(id);
      if (result.success) {
        alert('Resource deleted successfully');
        fetchResources();
      } else {
        alert(result.error);
      }
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      type: "LAB",
      capacity: "",
      status: "AVAILABLE"
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

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1>Resource Management</h1>
          <button 
            onClick={() => navigate('/admin')}
            style={{ ...styles.button, backgroundColor: '#6c757d' }}
          >
            Back to Dashboard
          </button>
        </div>

        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ ...styles.button, marginBottom: '20px' }}
        >
          {showForm ? 'Cancel' : '+ Add New Resource'}
        </button>

        {showForm && (
          <div style={{ ...cardStyle, marginBottom: '24px' }}>
            <h3>{editingId ? 'Edit Resource' : 'Create New Resource'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                style={styles.input}
                type="text"
                placeholder="Resource Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <select
                style={styles.input}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                required
              >
                <option value="LAB">Lab</option>
                <option value="CLASSROOM">Classroom</option>
                <option value="EVENT_HALL">Event Hall</option>
              </select>

              <input
                style={styles.input}
                type="number"
                placeholder="Capacity"
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                min="1"
                required
              />

              <select
                style={styles.input}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                required
              >
                <option value="AVAILABLE">Available</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" style={styles.button}>
                  {editingId ? 'Update' : 'Create'}
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

        {loading && <LoadingSpinner message="Loading resources..." />}
        
        {error && <ErrorMessage message={error} onRetry={fetchResources} />}
        
        {!loading && !error && resources.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>No resources found. Create your first resource!</p>
          </div>
        )}
        
        {!loading && !error && resources.length > 0 && (
          <div>
            <h2>All Resources ({resources.length})</h2>
            {resources.map(resource => (
              <div key={resource.id} style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0' }}>{resource.name}</h3>
                    <p style={{ margin: '4px 0', color: '#666' }}>
                      <strong>Type:</strong> {resource.type}
                    </p>
                    <p style={{ margin: '4px 0', color: '#666' }}>
                      <strong>Capacity:</strong> {resource.capacity}
                    </p>
                    <p style={{ margin: '4px 0', color: '#666' }}>
                      <strong>Status:</strong> 
                      <span style={{
                        marginLeft: '8px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: resource.status === 'AVAILABLE' ? '#28a745' : '#dc3545',
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {resource.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleEdit(resource)}
                      style={{ ...buttonStyle, backgroundColor: '#007bff', color: 'white' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(resource.id)}
                      style={{ ...buttonStyle, backgroundColor: '#dc3545', color: 'white' }}
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

export default ResourceManagement;
