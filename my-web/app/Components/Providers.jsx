'use client';

import React from 'react';
import AdContextProvider from "../Context/AdsContext";
import CartContextProvider from "../Context/Cart";
import ProductContextProvider from "../Context/ProductContext";
import ReviewContextProvider from "../Context/ReviewContext";
import UserContextProvider from "../Context/UserContext";
import ThemeProvider from "../Context/ThemeContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LayoutComponent from "./LayoutComponent";

import FeatureContextProvider from "../Context/FeatureContext";

export default function Providers({ children }) {
    return (
        <ThemeProvider>
            <UserContextProvider>
                <CartContextProvider>
                    <ProductContextProvider>
                        <AdContextProvider>
                            <FeatureContextProvider>
                                <ReviewContextProvider>
                                    <LayoutComponent>
                                        {children}
                                    </LayoutComponent>
                                </ReviewContextProvider>
                            </FeatureContextProvider>
                        </AdContextProvider>
                    </ProductContextProvider>
                </CartContextProvider>
            </UserContextProvider>
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
