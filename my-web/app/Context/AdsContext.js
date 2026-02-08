'use client';
import React, { useEffect, useState, createContext, useCallback } from 'react';
import api from '@/lib/api';
import { toast } from '@/lib/toast';

export const AdContext = createContext();

const AdProvider = ({ children }) => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAds = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/ads');
            // Assuming ads returns an array directly based on old code, 
            // but our new standard returns { success: true, data: ... }
            // Let's check old code first. res.data was used.
            setAds(Array.isArray(res) ? res : (res.data || []));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAds();
    }, [fetchAds]);

    const addNewAd = async (img, category) => {
        console.log("AddNewAd", img, category)
        const formData = new FormData();
        formData.append('image', img);
        formData.append('category', category);

        try {
            await api.post('/api/ads', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success("Ad Banner Added Successfully");
            await fetchAds();
        } catch (err) {
            toast.error("Failed to add ad banner");
        }
    };

    const deleteAd = async (id) => {
        try {
            await api.delete(`/api/ads/${id}`);
            toast.success("Ad Banner Deleted Successfully");
            await fetchAds();
        } catch (err) {
            toast.error("Failed to delete ad banner");
        }
    };

    return (
        <AdContext.Provider value={{ ads, loading, addNewAd, deleteAd }}>
            {children}
        </AdContext.Provider>
    );
};

export default AdProvider;