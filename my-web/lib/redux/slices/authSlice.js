import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { toast } from '@/lib/toast';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/auth/login', { email, password });
        if (res.success) {
            localStorage.setItem('Data', JSON.stringify(res.data));
            toast.success(`Welcome back, ${res.data.name}`);
            return res.data;
        }
        return rejectWithValue('Login failed');
    } catch (err) {
        toast.error(err.message || 'Login failed');
        return rejectWithValue(err.message);
    }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/auth/register', userData);
        if (res.success) {
            toast.success('Registration successful! Please login.');
            return res.data;
        }
        return rejectWithValue('Registration failed');
    } catch (err) {
        toast.error(err.message || 'Registration failed');
        return rejectWithValue(err.message);
    }
});

export const toggleFavorite = createAsyncThunk('auth/toggleFavorite', async (productId, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (!auth.user) {
        toast.warning('Please login to add favorites');
        return rejectWithValue('Not logged in');
    }
    try {
        const res = await api.post(`/api/auth/favorite/${productId}`);
        if (res.success) {
            toast.success(res.message);
            return { productId, isFavorite: res.data.isFavorite };
        }
        return rejectWithValue('Failed to update favorites');
    } catch (err) {
        toast.error('Failed to update favorites');
        return rejectWithValue(err.message);
    }
});

export const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/api/auth/users');
        if (res.success) {
            return res.data;
        }
        return rejectWithValue('Failed to fetch users');
    } catch (err) {
        toast.error('Failed to fetch users');
        return rejectWithValue(err.message);
    }
});

export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId, { rejectWithValue }) => {
    try {
        const res = await api.delete(`/api/auth/user/${userId}`);
        if (res.success) {
            toast.success('User deleted successfully');
            return userId;
        }
        return rejectWithValue('Failed to delete user');
    } catch (err) {
        toast.error('Failed to delete user');
        return rejectWithValue(err.message);
    }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ email }, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/auth/forgot-password', { email });
        if (res.success) {
            return res.data; // contains token
        }
        return rejectWithValue('Failed to request recovery link');
    } catch (err) {
        toast.error(err.message || 'Failed to request recovery link');
        return rejectWithValue(err.message);
    }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, password }, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/auth/reset-password', { token, password });
        if (res.success) {
            toast.success('Password has been reset successfully. Please login.');
            return res.data;
        }
        return rejectWithValue('Failed to reset password');
    } catch (err) {
        toast.error(err.message || 'Failed to reset password');
        return rejectWithValue(err.message);
    }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (profileData, { rejectWithValue }) => {
    try {
        const res = await api.put('/api/auth/profile/update', profileData);
        if (res.success) {
            toast.success('Profile updated successfully');
            return res.data.user;
        }
        return rejectWithValue('Failed to update profile');
    } catch (err) {
        toast.error(err.message || 'Failed to update profile');
        return rejectWithValue(err.message);
    }
});

const initialState = {
    user: null,
    loading: true,
    error: null,
    isAuthChecked: false,
    allUsers: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkAuth: (state) => {
            const storedData = localStorage.getItem('Data');
            if (storedData) {
                try {
                    state.user = JSON.parse(storedData);
                } catch (e) {
                    localStorage.removeItem('Data');
                }
            }
            state.isAuthChecked = true;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('Data');
            toast.info('Logged out successfully');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                if (state.user) {
                    const { productId, isFavorite } = action.payload;
                    if (isFavorite) {
                        state.user.favorites.push(productId);
                    } else {
                        state.user.favorites = state.user.favorites.filter(id => id !== productId);
                    }
                    localStorage.setItem('Data', JSON.stringify(state.user));
                }
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.allUsers = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.allUsers = state.allUsers.filter(u => u._id !== action.payload);
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                if (state.user) {
                    state.user = { ...state.user, ...action.payload };
                    localStorage.setItem('Data', JSON.stringify(state.user));
                }
            })
            .addCase(updateProfile.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { checkAuth, logout } = authSlice.actions;
export default authSlice.reducer;
