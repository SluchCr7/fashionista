import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { toast } from '@/lib/toast';

export const fetchAds = createAsyncThunk('ads/fetchAds', async () => {
    const res = await api.get('/api/ads');
    return Array.isArray(res) ? res : (res.data || []);
});

export const addNewAd = createAsyncThunk('ads/addNewAd', async ({ img, category }, { dispatch }) => {
    const formData = new FormData();
    formData.append('image', img);
    formData.append('category', category);

    try {
        await api.post('/api/ads', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success("Ad Banner Added Successfully");
        dispatch(fetchAds());
    } catch (err) {
        toast.error("Failed to add ad banner");
        throw err;
    }
});

export const deleteAd = createAsyncThunk('ads/deleteAd', async (id, { dispatch }) => {
    try {
        await api.delete(`/api/ads/${id}`);
        toast.success("Ad Banner Deleted Successfully");
        dispatch(fetchAds());
    } catch (err) {
        toast.error("Failed to delete ad banner");
        throw err;
    }
});

const initialState = {
    ads: [],
    loading: false,
};

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAds.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.loading = false;
                state.ads = action.payload;
            })
            .addCase(fetchAds.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default adsSlice.reducer;
