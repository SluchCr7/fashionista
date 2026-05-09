'use client';

import React from 'react';
import ReduxProvider from "../../lib/redux/ReduxProvider";
import AppInit from "../../lib/redux/AppInit";
import LayoutComponent from "./LayoutComponent";

export default function Providers({ children }) {
    return (
        <ReduxProvider>
            <AppInit>
                <LayoutComponent>
                    {children}
                </LayoutComponent>
            </AppInit>
        </ReduxProvider>
    );
}

