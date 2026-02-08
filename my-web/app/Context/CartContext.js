'use client';
import React, { useEffect, useState, useContext, useCallback, useMemo, createContext } from 'react';
import { AuthContext } from './AuthContext';
import { toast, ecommerceToasts } from '@/lib/toast';
import api from '@/lib/api';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);

  // Fetch latest discount percentage
  const fetchDiscount = useCallback(async () => {
    try {
      const res = await api.get('/api/discount');
      const data = Array.isArray(res) ? res : (res.data || []);
      const latestDiscount = data[data.length - 1]?.discount || 0;
      setDiscount(latestDiscount);
    } catch (err) {
      console.error('Fetch discount error:', err);
    }
  }, []);

  useEffect(() => {
    fetchDiscount();
  }, [fetchDiscount]);

  // Load cart - from backend if auth, else from localStorage
  const fetchCart = useCallback(async () => {
    if (isAuthenticated) {
      setLoading(true);
      try {
        const res = await api.get('/api/cart');
        if (res.success) {
          setCartItems(res.data.items || []);
        }
      } catch (err) {
        console.error('Fetch cart error:', err);
      } finally {
        setLoading(false);
      }
    } else {
      const saved = localStorage.getItem('cart');
      if (saved) {
        try {
          setCartItems(JSON.parse(saved));
        } catch (e) {
          localStorage.removeItem('cart');
        }
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Save to localStorage when not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const addToCart = async (product, quantity = 1, size = 'M', color = 'Default') => {
    if (isAuthenticated) {
      setLoading(true);
      try {
        const res = await api.post('/api/cart', {
          product: product._id,
          quantity,
          size,
          color
        });
        if (res.success) {
          setCartItems(res.data.items);
          ecommerceToasts.addedToCart(product.name);
        }
      } catch (err) {
        toast.error(err.message || 'Failed to add to cart');
      } finally {
        setLoading(false);
      }
    } else {
      setCartItems(prev => {
        const existing = prev.find(item =>
          item.product._id === product._id && item.size === size && item.color === color
        );
        if (existing) {
          return prev.map(item =>
            (item.product._id === product._id && item.size === size && item.color === color)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity, size, color }];
      });
      ecommerceToasts.addedToCart(product.name);
    }
  };

  const removeFromCart = async (productId, size, color) => {
    if (isAuthenticated) {
      try {
        const res = await api.delete(`/api/cart?productId=${productId}&size=${size}&color=${color}`);
        if (res.success) {
          setCartItems(res.data.items);
        }
      } catch (err) {
        toast.error('Failed to remove item');
      }
    } else {
      setCartItems(prev => prev.filter(item =>
        !(item.product._id === productId && item.size === size && item.color === color)
      ));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await api.delete('/api/cart/clear');
        setCartItems([]);
      } catch (err) {
        toast.error('Failed to clear cart');
      }
    } else {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      const discountedPrice = price - (price * discount) / 100;
      return total + (discountedPrice * item.quantity);
    }, 0);
  }, [cartItems, discount]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    loading,
    cartTotal,
    cartCount,
    discount,
    addToCart,
    removeFromCart,
    clearCart
  };


  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;