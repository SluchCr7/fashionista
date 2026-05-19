'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { checkAuth } from './slices/authSlice';
import { fetchDiscount, fetchCart, saveCartLocal } from './slices/cartSlice';

export default function AppInit({ children }) {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.theme.theme);
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const user = useAppSelector(state => state.auth.user);
    const isAuthenticated = !!user;

    useEffect(() => {
        dispatch(checkAuth());
        dispatch(fetchDiscount());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(saveCartLocal());
        }
    }, [cartItems, isAuthenticated, dispatch]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    return children;
}
