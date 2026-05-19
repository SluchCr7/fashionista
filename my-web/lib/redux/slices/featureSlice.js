import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { toast } from '@/lib/toast';

export const fetchFeatures = createAsyncThunk('feature/fetchFeatures', async () => {
    const res = await api.get('/api/feature');
    return Array.isArray(res) ? res : (res.data || []);
});

export const addFeature = createAsyncThunk('feature/addFeature', async (featureData) => {
    try {
        const res = await api.post('/api/feature', featureData);
        toast.success("Feature added successfully");
        return res.data || res;
    } catch (err) {
        toast.error(err.message || "Failed to add feature");
        throw err;
    }
});

export const deleteFeature = createAsyncThunk('feature/deleteFeature', async (id) => {
    try {
        await api.delete(`/api/feature/${id}`);
        toast.success("Feature deleted successfully");
        return id;
    } catch (err) {
        toast.error("Failed to delete feature");
        throw err;
    }
});

export const updateFeature = createAsyncThunk('feature/updateFeature', async ({ id, updatedData }) => {
    try {
        const res = await api.put(`/api/feature/${id}`, updatedData);
        toast.success("Feature updated successfully");
        return { id, data: res.data || res };
    } catch (err) {
        toast.error("Failed to update feature");
        throw err;
    }
});

const initialState = {
    features: [],
    loading: true,
};

const featureSlice = createSlice({
    name: 'feature',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeatures.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFeatures.fulfilled, (state, action) => {
                state.loading = false;
                state.features = action.payload;
            })
            .addCase(fetchFeatures.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addFeature.fulfilled, (state, action) => {
                state.features.push(action.payload);
            })
            .addCase(deleteFeature.fulfilled, (state, action) => {
                state.features = state.features.filter(f => f._id !== action.payload);
            })
            .addCase(updateFeature.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                state.features = state.features.map(f => f._id === id ? data : f);
            });
    }
});

export default featureSlice.reducer;
