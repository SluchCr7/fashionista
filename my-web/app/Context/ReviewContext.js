'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { ProductContext } from './ProductContext';
import { toast, ecommerceToasts } from '@/lib/toast';
import api from '@/lib/api';

export const ReviewContext = createContext();

const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, totalReviews: 0 });

    const { user } = useContext(AuthContext);
    const { fetchProducts } = useContext(ProductContext);

    const getProductReviews = useCallback(async (productId, page = 1) => {
        setLoading(true);
        try {
            const res = await api.get(`/api/review/product/${productId}?page=${page}`);
            if (res.success) {
                setReviews(res.data.reviews);
                setPagination(res.data.pagination);
            }
        } catch (error) {
            toast.error("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    }, []);

    const addReview = async (reviewData) => {
        if (!user) {
            toast.error("Please login to share your experience");
            return;
        }

        try {
            const res = await api.post('/api/review', reviewData);
            if (res.success) {
                // Optimistic update if simple enough, or just refetch
                setReviews(prev => [res.data.review, ...prev]);
                if (fetchProducts) fetchProducts();
                ecommerceToasts.reviewSubmitted();
                return res.data.review;
            }
        } catch (error) {
            toast.error(error.message || "Failed to submit review");
            throw error;
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            const res = await api.delete(`/api/review/${reviewId}`);
            if (res.success) {
                setReviews(prev => prev.filter(rev => rev._id !== reviewId));
                if (fetchProducts) fetchProducts();
                ecommerceToasts.deletedReview();
            }
        } catch (error) {
            toast.error(error.message || "Failed to remove review");
        }
    };

    const value = {
        reviews,
        loading,
        pagination,
        getProductReviews,
        addReview,
        deleteReview
    };

    return (
        <ReviewContext.Provider value={value}>
            {children}
        </ReviewContext.Provider>
    );
};

export default ReviewProvider;