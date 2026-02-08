'use client';

import React from 'react';
import AdProvider from "../Context/AdsContext";
import CartProvider from "../Context/CartContext";
import ProductProvider from "../Context/ProductContext";
import ReviewProvider from "../Context/ReviewContext";
import AuthProvider from "../Context/AuthContext";
import OrderProvider from "../Context/OrderContext";
import ThemeProvider from "../Context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LayoutComponent from "./LayoutComponent";
import FeatureProvider from "../Context/FeatureContext";

export default function Providers({ children }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ProductProvider>
                    <CartProvider>
                        <OrderProvider>
                            <AdProvider>
                                <FeatureProvider>
                                    <ReviewProvider>
                                        <LayoutComponent>
                                            {children}
                                        </LayoutComponent>
                                    </ReviewProvider>
                                </FeatureProvider>
                            </AdProvider>
                        </OrderProvider>
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 99999 }}
            />
        </ThemeProvider>
    );
}

