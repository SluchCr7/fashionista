'use client';
import React, { useEffect, useState, createContext, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';

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
    const toastId = toast.loading('Logging in...');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`, {
        email,
        password,
      });

      const userData = res.data;
      setUser(userData);

      toast.update(toastId, {
        render: `Welcome back, ${userData.name || 'User'}!`,
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });

      router.push('/');
      return true;
    } catch (err) {
      console.error('Login error:', err);
      toast.update(toastId, {
        render: err?.response?.data?.message || 'Invalid credentials',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
      return false;
    }
  }, [router]);

  // Register
  const Register = useCallback(async (name, email, password) => {
    const toastId = toast.loading('Creating account...');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      toast.update(toastId, {
        render: '🎉 Account created! Please login.',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });

      router.push('/Login');
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      toast.update(toastId, {
        render: err?.response?.data?.message || 'Registration failed',
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
    toast.info('Logged out successfully');
    router.push('/Login');
  }, [router]);

  // Add/Remove Favorite
  const AddFavourite = useCallback(async (prodId) => {
    if (!user) {
      toast.warning('Please login to manage your wishlist');
      router.push('/Login');
      return null;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/favorite/${prodId}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const { message, isFavorite } = res.data;

      if (isFavorite) {
        toast.success('❤️ Added to wishlist');
      } else {
        toast.info('💔 Removed from wishlist');
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
      toast.error('Failed to update wishlist');
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
