'use client';
import axios from 'axios';
import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import { createContext } from 'react';
import { UserContext } from './UserContext';
import { toast, ecommerceToasts } from '@/lib/toast';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [numInCart, setNumInCart] = useState(0);
  const [finalCart, setFinalCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        const parsedCart = JSON.parse(saved);
        setCart(parsedCart);
        setNumInCart(parsedCart.length);
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Sync cart count with cart length
  useEffect(() => {
    setNumInCart(cart.length);
  }, [cart]);

  // Add to cart with optimized state updates
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || !product._id) {
      toast.error('Invalid product');
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);
      let updatedCart;

      if (existing) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        ecommerceToasts.updatedQuantity(product.name);
      } else {
        updatedCart = [...prevCart, { ...product, quantity, discount }];
        ecommerceToasts.addedToCart(product.name);
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, [discount]);

  // Remove from cart
  const removeFromCart = useCallback((productId, productName) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      ecommerceToasts.removedFromCart(productName);
      return updatedCart;
    });
  }, []);

  // Update quantity
  const updateQuantity = useCallback((productId, newQuantity, productName) => {
    if (newQuantity < 1) {
      removeFromCart(productId, productName);
      return;
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      ecommerceToasts.updatedQuantity(productName);
      return updatedCart;
    });
  }, [removeFromCart]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCart([]);
    setNumInCart(0);
    localStorage.removeItem('cart');
    toast.info('Cart cleared');
  }, []);

  // Submit cart
  const SubmitCart = useCallback((Cart) => {
    setFinalCart(Cart);
  }, []);

  // Submit order with new structured data
  const submitOrder = useCallback(async (shippingDetails, subtotal, shippingFee, total) => {
    if (!user || !user.token) {
      toast.error('Please login to place an order');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Processing your order...');

    try {
      // Format items for the new Order Model
      const items = cart.map(item => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || 'M',
        color: item.color || 'Standard',
        image: item.image?.[0] || item.Photo?.[0]?.url || ''
      }));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/order`,
        {
          items,
          shippingDetails,
          paymentMethod: 'COD', // Default for now
          subtotal,
          shippingFee,
          total
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      // Clear cart on success
      setCart([]);
      setNumInCart(0);
      localStorage.removeItem('cart');

      toast.update(toastId, {
        render: '🎉 Your order has been placed successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      // Return orderId for potential redirection to a success page
      return res.data.orderId;
    } catch (error) {
      console.error('Order submission error:', error);
      toast.update(toastId, {
        render: error.response?.data?.message || 'Failed to place order. Please try again.',
        type: 'error',
        isLoading: false,
        autoClose: 4000,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, cart]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/order`);
        setOrders(res.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Delete order
  const deleteOrder = useCallback(async (id) => {
    const toastId = toast.loading('Cancelling order...');

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URL}/api/order/${id}`);

      toast.update(toastId, {
        render: 'Order cancelled successfully',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });

      // Refresh orders
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.update(toastId, {
        render: 'Failed to cancel order',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, []);

  // Fetch discount
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/discount`);
        const latestDiscount = res.data[res.data.length - 1]?.discount || 0;
        setDiscount(latestDiscount);
      } catch (error) {
        console.error('Error fetching discount:', error);
      }
    };

    fetchDiscount();
  }, []);

  // Add discount
  const AddDiscount = useCallback(async (discountValue) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/discount`, {
        discount: discountValue,
      });
      toast.success(res.data.message || 'Discount updated successfully');
      setDiscount(discountValue);
    } catch (error) {
      console.error('Error adding discount:', error);
      toast.error('Failed to update discount');
    }
  }, []);

  // Calculate cart total
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 1;
      const itemDiscount = discount || 0;
      const discountedPrice = price - (price * itemDiscount) / 100;
      return total + discountedPrice * quantity;
    }, 0);
  }, [cart, discount]);

  // Calculate cart item count
  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    numInCart,
    finalCart,
    SubmitCart,
    submitOrder,
    orders,
    deleteOrder,
    discount,
    AddDiscount,
    cartTotal,
    cartItemCount,
    isLoading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;