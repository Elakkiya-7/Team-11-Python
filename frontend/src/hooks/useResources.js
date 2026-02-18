import { useState, useEffect, useCallback } from 'react';
import { resourceService } from '../services/api';

export const useResources = (filters = {}) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await resourceService.getResources(filters);
      setResources(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch resources');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const createResource = async (resourceData) => {
    try {
      const newResource = await resourceService.createResource(resourceData);
      setResources(prev => [...prev, newResource]);
      return { success: true, data: newResource };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to create resource' 
      };
    }
  };

  const updateResource = async (id, data) => {
    try {
      const updated = await resourceService.updateResource(id, data);
      setResources(prev => prev.map(r => r.id === id ? updated : r));
      return { success: true, data: updated };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to update resource' 
      };
    }
  };

  const deleteResource = async (id) => {
    try {
      await resourceService.deleteResource(id);
      setResources(prev => prev.filter(r => r.id !== id));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete resource' 
      };
    }
  };

  return {
    resources,
    loading,
    error,
    fetchResources,
    createResource,
    updateResource,
    deleteResource
  };
};
