'use client';
import React, { createContext, useEffect, useState, useCallback } from 'react';
import api from '@/lib/api';
import { toast } from '@/lib/toast';

export const FeatureContext = createContext();

const FeatureProvider = ({ children }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeatures = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/feature');
            setFeatures(Array.isArray(res) ? res : (res.data || []));
        } catch (err) {
            console.error("Failed to fetch features:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeatures();
    }, [fetchFeatures]);

    const addFeature = async (featureData) => {
        try {
            const res = await api.post('/api/feature', featureData);
            setFeatures(prev => [...prev, res.data || res]);
            toast.success("Feature added successfully");
            return true;
        } catch (err) {
            toast.error(err.message || "Failed to add feature");
            return false;
        }
    };

    const deleteFeature = async (id) => {
        try {
            await api.delete(`/api/feature/${id}`);
            setFeatures(prev => prev.filter(f => f._id !== id));
            toast.success("Feature deleted successfully");
        } catch (err) {
            toast.error("Failed to delete feature");
        }
    };

    const updateFeature = async (id, updatedData) => {
        try {
            const res = await api.put(`/api/feature/${id}`, updatedData);
            setFeatures(prev => prev.map(f => f._id === id ? (res.data || res) : f));
            toast.success("Feature updated successfully");
            return true;
        } catch (err) {
            toast.error("Failed to update feature");
            return false;
        }
    };

    return (
        <FeatureContext.Provider value={{ features, loading, addFeature, deleteFeature, updateFeature }}>
            {children}
        </FeatureContext.Provider>
    );
};

export default FeatureProvider;
