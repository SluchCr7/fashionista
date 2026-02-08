'use client';
import React, { useEffect, useState, createContext, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ecommerceToasts } from '@/lib/toast';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('Data');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('Data');
      } finally {
        setIsAuthChecked(true);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sync user state with localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('Data', JSON.stringify(user));
    } else if (isAuthChecked) {
      // Only remove if we've finished checking auth and user is null
      // preventing accidental logout on initial load
      localStorage.removeItem('Data');
    }
  }, [user, isAuthChecked]);

  // Login
  const Login = useCallback(async (email, password) => {
    const toastId = toast.loading('Establishing secure access...');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`, {
        email,
        password,
      });

      const userData = res.data;
      setUser(userData);

      toast.update(toastId, {
        render: `Welcome back, ${userData.name || 'User'}. Your exclusive access is ready.`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });

      router.push('/');
      return true;
    } catch (err) {
      console.error('Login error:', err);
      toast.update(toastId, {
        render: err?.response?.data?.message || 'Access denied. Please verify your credentials.',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
      return false;
    }
  }, [router]);

  // Register
  const Register = useCallback(async (name, email, password) => {
    const toastId = toast.loading('Finalizing your registration...');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      toast.update(toastId, {
        render: '👑 Welcome to the elite! Your account has been created successfully. Please sign in.',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });

      router.push('/Login');
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      toast.update(toastId, {
        render: err?.response?.data?.message || 'We could not complete your registration at this time.',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
      return false;
    }
  }, [router]);

  // Logout
  const Logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('Data');
    ecommerceToasts.logoutSuccess();
    router.push('/Login');
  }, [router]);

  // Add/Remove Favorite
  const AddFavourite = useCallback(async (prodId) => {
    if (!user) {
      toast.warning('🔒 Please sign in to curate your wishlist.');
      router.push('/Login');
      return null;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/favorite/${prodId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const { message, isFavorite, product } = res.data;
      const productName = product?.name || 'Item';

      if (isFavorite) {
        ecommerceToasts.addedToWishlist(productName);
      } else {
        ecommerceToasts.removedFromWishlist(productName);
      }

      // Update local user state specifically for favorites
      setUser(prevUser => {
        if (!prevUser) return null;

        const currentFavorites = prevUser.favorites || [];
        let newFavorites;

        if (isFavorite) {
          newFavorites = [...new Set([...currentFavorites, prodId])];
        } else {
          newFavorites = currentFavorites.filter(id => id !== prodId);
        }

        return { ...prevUser, favorites: newFavorites };
      });

      return isFavorite;
    } catch (err) {
      console.error('Favorite error:', err);
      toast.error('Failed to update your wishlist selection.');
      return null;
    }
  }, [user, router]);

  // Fetch all users (Admin purpose usually, but keeping it as it was in original)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth`);
        setUsers(res.data);
      } catch (err) {
        console.error('Fetch users error:', err);
      }
    };

    // Only fetch if needed (maybe add admin check later)
    fetchUsers();
  }, []);

  const value = {
    user,
    users,
    loading,
    isAuthChecked,
    Login,
    Register,
    Logout,
    AddFavourite,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
