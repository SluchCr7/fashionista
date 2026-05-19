import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { toast, ecommerceToasts } from '@/lib/toast';
import { fetchProducts } from './productSlice';

export const getProductReviews = createAsyncThunk('review/getProductReviews', async ({ productId, page = 1 }) => {
    const res = await api.get(`/api/review/product/${productId}?page=${page}`);
    if (res.success) {
        return res.data;
    }
    throw new Error('Failed to load reviews');
});

export const addReview = createAsyncThunk('review/addReview', async (reviewData, { getState, dispatch, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.user) {
        toast.error("Please login to share your experience");
        return rejectWithValue("Not logged in");
    }

    try {
        const res = await api.post('/api/review', reviewData);
        if (res.success) {
            dispatch(fetchProducts());
            ecommerceToasts.reviewSubmitted();
            return res.data.review;
        }
        return rejectWithValue("Failed to submit review");
    } catch (error) {
        toast.error(error.message || "Failed to submit review");
        return rejectWithValue(error.message);
    }
});

export const deleteReview = createAsyncThunk('review/deleteReview', async (reviewId, { dispatch }) => {
    try {
        const res = await api.delete(`/api/review/${reviewId}`);
        if (res.success) {
            dispatch(fetchProducts());
            ecommerceToasts.deletedReview();
            return reviewId;
        }
        throw new Error("Failed to remove review");
    } catch (error) {
        toast.error(error.message || "Failed to remove review");
        throw error;
    }
});

const initialState = {
    reviews: [],
    loading: false,
    pagination: { page: 1, pages: 1, totalReviews: 0 }
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews;
                state.pagination = action.payload.pagination;
            })
            .addCase(getProductReviews.rejected, (state) => {
                state.loading = false;
                toast.error("Failed to load reviews");
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.reviews.unshift(action.payload);
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(rev => rev._id !== action.payload);
            });
    }
});

export default reviewSlice.reducer;
