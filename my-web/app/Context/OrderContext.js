'use client';
import React, { useState, useCallback, createContext } from 'react';
import { toast } from '@/lib/toast';
import api from '@/lib/api';

export const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/order');
            if (res.success) {
                setOrders(res.data.orders);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const placeOrder = async (orderData) => {
        setLoading(true);
        try {
            const res = await api.post('/api/order', orderData);
            if (res.success) {
                toast.success('Order placed successfully!');
                await fetchOrders();
                return res.data;
            }
        } catch (err) {
            toast.error(err.message || 'Failed to place order');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const res = await api.patch(`/api/order/${orderId}/status`, { status });
            if (res.success) {
                toast.success('Order status updated');
                await fetchOrders();
            }
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            const res = await api.delete(`/api/order/${orderId}`);
            if (res.success) {
                toast.success('Order cancelled');
                await fetchOrders();
            }
        } catch (err) {
            toast.error('Failed to cancel order');
        }
    };

    const value = {
        orders,
        loading,
        error,
        fetchOrders,
        placeOrder,
        updateOrderStatus,
        cancelOrder
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;
