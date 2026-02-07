'use client';
import React, { useEffect, useState, createContext, useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from '@/lib/toast';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [loadingProduct, setLoadingProduct] = useState(false);

    // Fetch All Products
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/product`);
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            toast.error("Failed to load products. Please refresh.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Add New Product
    const AddProduct = useCallback(async (formData) => {
        const toastId = toast.loading("Adding product...");
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/product`, formData);

            toast.update(toastId, {
                render: "✅ Product added successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000
            });

            await fetchProducts(); // Refresh list
            return true;
        } catch (err) {
            console.error("Add product error:", err);
            toast.update(toastId, {
                render: err.response?.data?.message || "Failed to add product",
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
            return false;
        }
    }, [fetchProducts]);

    // Delete Product
    const deleteProduct = useCallback(async (prodId) => {
        // Confirmation is usually handled in UI, but if confirmed:
        const toastId = toast.loading("Deleting product...");
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/product/${prodId}`);

            toast.update(toastId, {
                render: "🗑️ Product deleted successfully",
                type: "success",
                isLoading: false,
                autoClose: 3000
            });

            setProducts(prev => prev.filter(p => p._id !== prodId));
        } catch (err) {
            console.error("Delete product error:", err);
            toast.update(toastId, {
                render: "Failed to delete product",
                type: "error",
                isLoading: false,
                autoClose: 3000
            });
        }
    }, []);

    // Get Single Product
    const getProductBuID = useCallback(async (id) => {
        setLoadingProduct(true);
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/product/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error("Get product error:", err);
            toast.error("Failed to load product details");
        } finally {
            setLoadingProduct(false);
        }
    }, []);

    // Derived State (Memoized for performance)
    const featuredProducts = useMemo(() => {
        return products.filter(p => p.isFeatured || p.collections === 'Special').slice(0, 4);
    }, [products]);

    const newArrivals = useMemo(() => {
        // Assuming products are sorted by date or taking the last ones
        return [...products].reverse().slice(0, 8);
    }, [products]);

    const bestSellers = useMemo(() => {
        // Logic for best sellers (mocked if no specific field exists yet)
        return products.slice(0, 4);
    }, [products]);

    const getProductsByCategory = useCallback((category) => {
        return products.filter(p => p.category === category);
    }, [products]);

    const value = {
        products,
        loading,
        product,
        loadingProduct,
        AddProduct, // Now accepts formData directly for better flexibility
        deleteProduct,
        getProductBuID,
        fetchProducts,
        // Computed collections
        featuredProducts,
        newArrivals,
        bestSellers,
        getProductsByCategory
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;