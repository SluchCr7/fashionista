'use client';
import React, { useEffect, useState, createContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';
import api from '@/lib/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const router = useRouter();

  // Check auth on mount
  useEffect(() => {
    const storedData = localStorage.getItem('Data');
    if (storedData) {
      try {
        setUser(JSON.parse(storedData));
      } catch (e) {
        localStorage.removeItem('Data');
      }
    }
    setIsAuthChecked(true);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/api/auth/login', { email, password });
      if (res.success) {
        setUser(res.data);
        localStorage.setItem('Data', JSON.stringify(res.data));
        toast.success(`Welcome back, ${res.data.name}`);
        router.push('/');
        return true;
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/api/auth/register', userData);
      if (res.success) {
        toast.success('Registration successful! Please login.');
        router.push('/Login');
        return true;
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('Data');
    toast.info('Logged out successfully');
    router.push('/Login');
  };

  const toggleFavorite = async (productId) => {
    if (!user) {
      toast.warning('Please login to add favorites');
      router.push('/Login');
      return;
    }
    try {
      const res = await api.post(`/api/auth/favorite/${productId}`);
      if (res.success) {
        // Update local favorites list
        setUser(prev => {
          const newFavs = res.data.isFavorite
            ? [...prev.favorites, productId]
            : prev.favorites.filter(id => id !== productId);

          const updated = { ...prev, favorites: newFavs };
          localStorage.setItem('Data', JSON.stringify(updated));
          return updated;
        });
        toast.success(res.message);
      }
    } catch (err) {
      toast.error('Failed to update favorites');
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthChecked,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    login,
    register,
    logout,
    toggleFavorite
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
