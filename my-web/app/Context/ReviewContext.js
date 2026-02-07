'use client'
import React, { createContext, useContext, useState, useCallback } from 'react'
import axios from 'axios';
import { UserContext } from './UserContext';
import { ProductContext } from './ProductContext';
import { toast } from 'react-toastify';

export const ReviewContext = createContext();

const ReviewContextProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        pages: 1,
        totalReviews: 0
    });

    const { user } = useContext(UserContext);
    const { fetchProducts } = useContext(ProductContext);

    // Fetch reviews for a specific product
    const getProductReviews = useCallback(async (productId, page = 1, limit = 5) => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/review/product/${productId}?page=${page}&limit=${limit}`);
            setReviews(data.reviews);
            setPagination({
                page: data.page,
                pages: data.pages,
                totalReviews: data.totalReviews
            });
        } catch (error) {
            console.error("Error fetching reviews:", error);
            toast.error(error.response?.data?.message || "Failed to load reviews");
        } finally {
            setLoading(false);
        }
    }, []);

    // Add new review
    const addReview = async (reviewData) => {
        if (!user) return toast.error("Please login to review");

        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACK_URL}/api/review`,
                reviewData,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                }
            );

            // Optimistic update
            setReviews(prev => [data.review, ...prev]);
            setPagination(prev => ({
                ...prev,
                totalReviews: prev.totalReviews + 1
            }));

            // Refresh product data to get updated ratings/count
            if (fetchProducts) fetchProducts();

            toast.success("Review added successfully");
            return data.review;
        } catch (error) {
            console.error("Error adding review:", error);
            toast.error(error.response?.data?.message || "Failed to add review");
            throw error;
        }
    };

    // Update review
    const updateReview = async (reviewId, reviewData) => {
        try {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_BACK_URL}/api/review/${reviewId}`,
                reviewData,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                }
            );

            // Update local state
            setReviews(prev => prev.map(rev => rev._id === reviewId ? { ...rev, ...data.review } : rev));

            // Refresh product data
            if (fetchProducts) fetchProducts();

            toast.success("Review updated successfully");
        } catch (error) {
            console.error("Error updating review:", error);
            toast.error(error.response?.data?.message || "Failed to update review");
            throw error;
        }
    };

    // Delete review
    const deleteReview = async (reviewId, productId) => {
        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_BACK_URL}/api/review/${reviewId}`,
                {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                }
            );

            // Update local state
            setReviews(prev => prev.filter(rev => rev._id !== reviewId));
            setPagination(prev => ({
                ...prev,
                totalReviews: prev.totalReviews - 1
            }));

            // Refresh product data
            if (fetchProducts) fetchProducts();

            toast.success("Review deleted successfully");
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error(error.response?.data?.message || "Failed to delete review");
        }
    };

    return (
        <ReviewContext.Provider value={{
            reviews,
            loading,
            pagination,
            getProductReviews,
            addReview,
            updateReview,
            deleteReview
        }}>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContextProvider;