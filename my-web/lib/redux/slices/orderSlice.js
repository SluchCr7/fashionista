import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { toast } from '@/lib/toast';

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const res = await api.get('/api/order');
    if (res.success) {
        return res.data.orders;
    }
    throw new Error('Failed to fetch orders');
});

export const placeOrder = createAsyncThunk('order/placeOrder', async (orderData, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post('/api/order', orderData);
        if (res.success) {
            toast.success('Order placed successfully!');
            dispatch(fetchOrders());
            return res.data;
        }
        return rejectWithValue('Failed to place order');
    } catch (err) {
        toast.error(err.message || 'Failed to place order');
        return rejectWithValue(err.message);
    }
});

export const updateOrderStatus = createAsyncThunk('order/updateOrderStatus', async ({ orderId, status }, { dispatch }) => {
    try {
        const res = await api.patch(`/api/order/${orderId}/status`, { status });
        if (res.success) {
            toast.success('Order status updated');
            dispatch(fetchOrders());
            return res.data;
        }
        throw new Error('Failed to update status');
    } catch (err) {
        toast.error('Failed to update status');
        throw err;
    }
});

export const cancelOrder = createAsyncThunk('order/cancelOrder', async (orderId, { dispatch }) => {
    try {
        const res = await api.delete(`/api/order/${orderId}`);
        if (res.success) {
            toast.success('Order cancelled');
            dispatch(fetchOrders());
            return orderId;
        }
        throw new Error('Failed to cancel order');
    } catch (err) {
        toast.error('Failed to cancel order');
        throw err;
    }
});

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(placeOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(placeOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(placeOrder.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default orderSlice.reducer;
