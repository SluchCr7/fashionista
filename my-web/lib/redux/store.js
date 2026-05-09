import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import themeReducer from './slices/themeSlice';
import reviewReducer from './slices/reviewSlice';
import orderReducer from './slices/orderSlice';
import featureReducer from './slices/featureSlice';
import adsReducer from './slices/adsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    theme: themeReducer,
    review: reviewReducer,
    order: orderReducer,
    feature: featureReducer,
    ads: adsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
