'use client';
import React, { useEffect, useState, createContext, useCallback, useMemo } from 'react';
import { toast } from '@/lib/toast';
import api from '@/lib/api';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingProduct, setLoadingProduct] = useState(false);
    const [filters, setFilters] = useState({
        page: 1,
        limit: 12,
        category: '',
        gender: '',
        sort: '-createdAt',
        search: ''
    });

    const fetchProducts = useCallback(async (customFilters = {}) => {
        setLoading(true);
        try {
            const activeFilters = { ...filters, ...customFilters };

            // Clean up filters to avoid sending empty values
            const cleanFilters = {};
            Object.keys(activeFilters).forEach(key => {
                const val = activeFilters[key];
                if (val !== undefined && val !== null && val !== '') {
                    if (Array.isArray(val)) {
                        if (val.length > 0) cleanFilters[key] = val.join(',');
                    } else {
                        cleanFilters[key] = val;
                    }
                }
            });

            const queryParams = new URLSearchParams(cleanFilters).toString();

            const res = await api.get(`/api/product?${queryParams}`);
            if (res.success) {
                setProducts(res.data.products);
                setPagination(res.data.pagination);
            }
        } catch (err) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const getProductById = async (id) => {
        setLoadingProduct(true);
        try {
            const res = await api.get(`/api/product/${id}`);
            if (res.success) {
                setProduct(res.data.product);
                return res.data.product;
            }
        } catch (err) {
            toast.error('Failed to load product details');
        } finally {
            setLoadingProduct(false);
        }
    };

    const addProduct = async (formData) => {
        setLoading(true);
        try {
            const res = await api.post('/api/product', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.success) {
                toast.success('Product added successfully');
                await fetchProducts();
                return true;
            }
        } catch (err) {
            toast.error(err.message || 'Failed to add product');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const res = await api.delete(`/api/product/${id}`);
            if (res.success) {
                toast.success('Product deleted');
                setProducts(prev => prev.filter(p => p._id !== id));
            }
        } catch (err) {
            toast.error('Failed to delete product');
        }
    };

    const value = {
        products,
        pagination,
        product,
        loading,
        loadingProduct,
        filters,
        setFilters,
        fetchProducts,
        getProductById,
        addProduct,
        deleteProduct
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;