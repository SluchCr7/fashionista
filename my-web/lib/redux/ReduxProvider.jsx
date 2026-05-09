'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReduxProvider({ children }) {
    return (
        <Provider store={store}>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={true}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                toastClassName="!bg-transparent !shadow-none !p-0 !m-0 overflow-visible"
                bodyClassName="!bg-transparent !shadow-none !p-0 !m-0 overflow-visible"
                style={{ zIndex: 99999, width: 'auto', background: 'transparent' }}
            />
        </Provider>
    );
}
