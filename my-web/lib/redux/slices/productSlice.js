import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { toast } from '@/lib/toast';

export const fetchProducts = createAsyncThunk('product/fetchProducts', async (customFilters = {}, { getState }) => {
    const { product } = getState();
    const activeFilters = { ...product.filters, ...customFilters };

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
        return res.data;
    }
    throw new Error('Failed to fetch products');
});

export const getProductById = createAsyncThunk('product/getProductById', async (id) => {
    const res = await api.get(`/api/product/${id}`);
    if (res.success) {
        return res.data.product;
    }
    throw new Error('Failed to get product details');
});

export const addProduct = createAsyncThunk('product/addProduct', async (formData, { dispatch }) => {
    const res = await api.post('/api/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res.success) {
        toast.success('Product added successfully');
        dispatch(fetchProducts());
        return true;
    }
    throw new Error('Failed to add product');
});

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
    const res = await api.delete(`/api/product/${id}`);
    if (res.success) {
        toast.success('Product deleted');
        return id;
    }
    throw new Error('Failed to delete product');
});

export const updateProduct = createAsyncThunk('product/updateProduct', async ({ id, formData }, { dispatch }) => {
    const res = await api.put(`/api/product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res.success) {
        toast.success('Product updated successfully');
        dispatch(fetchProducts());
        return true;
    }
    throw new Error('Failed to update product');
});

const initialState = {
    products: [],
    pagination: { page: 1, pages: 1, total: 0 },
    product: null,
    loading: false,
    loadingProduct: false,
    filters: {
        page: 1,
        limit: 12,
        category: '',
        gender: '',
        sort: '-createdAt',
        search: ''
    }
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getProductById.pending, (state) => {
                state.loadingProduct = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.loadingProduct = false;
                state.product = action.payload;
            })
            .addCase(getProductById.rejected, (state) => {
                state.loadingProduct = false;
                toast.error('Failed to load product details');
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message || 'Failed to add product');
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p._id !== action.payload);
            })
            .addCase(deleteProduct.rejected, () => {
                toast.error('Failed to delete product');
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                toast.error(action.error.message || 'Failed to update product');
            });
    }
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
