import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { toast, ecommerceToasts } from '@/lib/toast';

export const fetchDiscount = createAsyncThunk('cart/fetchDiscount', async () => {
    const res = await api.get('/api/discount');
    const data = Array.isArray(res) ? res : (res.data || []);
    return data[data.length - 1]?.discount || 0;
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
    const { auth } = getState();
    if (auth.user) {
        const res = await api.get('/api/cart');
        if (res.success) {
            return res.data.items || [];
        }
    } else {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                localStorage.removeItem('cart');
            }
        }
    }
    return [];
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ product, quantity = 1, size = 'M', color = 'Default' }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (auth.user) {
        try {
            const res = await api.post('/api/cart', {
                product: product._id,
                quantity,
                size,
                color
            });
            if (res.success) {
                ecommerceToasts.addedToCart(product.name);
                return res.data.items;
            }
            return rejectWithValue('Failed to add to cart');
        } catch (err) {
            toast.error(err.message || 'Failed to add to cart');
            return rejectWithValue(err.message);
        }
    } else {
        ecommerceToasts.addedToCart(product.name);
        return { product, quantity, size, color, isLocal: true };
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ productId, size, color }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    if (auth.user) {
        try {
            const res = await api.delete(`/api/cart?productId=${productId}&size=${size}&color=${color}`);
            if (res.success) {
                return res.data.items;
            }
            return rejectWithValue('Failed to remove item');
        } catch (err) {
            toast.error('Failed to remove item');
            return rejectWithValue(err.message);
        }
    } else {
        return { productId, size, color, isLocal: true };
    }
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { getState }) => {
    const { auth } = getState();
    if (auth.user) {
        try {
            await api.delete('/api/cart/clear');
        } catch (err) {
            toast.error('Failed to clear cart');
            throw err;
        }
    } else {
        localStorage.removeItem('cart');
    }
    return [];
});

export const applyCoupon = createAsyncThunk('cart/applyCoupon', async ({ code, amount }, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/coupon/validate', { code, amount });
        if (res.success) {
            ecommerceToasts.discountApplied(res.data.discountValue);
            return res.data;
        }
        return rejectWithValue('Invalid or expired promo code');
    } catch (err) {
        toast.error(err.message || "Invalid or expired promo code");
        return rejectWithValue(err.message);
    }
});

const initialState = {
    cartItems: [],
    discount: 0,
    loading: false,
    isCartOpen: false,
    appliedCoupon: null,
    isApplyingCoupon: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setIsCartOpen: (state, action) => {
            state.isCartOpen = action.payload;
        },
        removeCoupon: (state) => {
            state.appliedCoupon = null;
            toast.info("Promo code removed");
        },
        saveCartLocal: (state) => {
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDiscount.fulfilled, (state, action) => {
                state.discount = action.payload;
            })
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload;
            })
            .addCase(fetchCart.rejected, (state) => {
                state.loading = false;
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.isLocal) {
                    const { product, quantity, size, color } = action.payload;
                    const existing = state.cartItems.find(item =>
                        item.product._id === product._id && item.size === size && item.color === color
                    );
                    if (existing) {
                        existing.quantity += quantity;
                    } else {
                        state.cartItems.push({ product, quantity, size, color });
                    }
                    state.isCartOpen = true;
                } else {
                    state.cartItems = action.payload;
                    state.isCartOpen = true;
                }
            })
            .addCase(addToCart.rejected, (state) => {
                state.loading = false;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                if (action.payload.isLocal) {
                    const { productId, size, color } = action.payload;
                    state.cartItems = state.cartItems.filter(item =>
                        !(item.product._id === productId && item.size === size && item.color === color)
                    );
                } else {
                    state.cartItems = action.payload;
                }
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.cartItems = [];
                state.appliedCoupon = null;
            })
            .addCase(applyCoupon.pending, (state) => {
                state.isApplyingCoupon = true;
            })
            .addCase(applyCoupon.fulfilled, (state, action) => {
                state.isApplyingCoupon = false;
                state.appliedCoupon = action.payload;
            })
            .addCase(applyCoupon.rejected, (state) => {
                state.isApplyingCoupon = false;
                state.appliedCoupon = null;
            });
    },
});

export const { setIsCartOpen, removeCoupon, saveCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
