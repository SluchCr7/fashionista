'use client';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import { useAppSelector } from '@/lib/redux/hooks';

const LayoutComponent = ({ children }) => {
  const isAuthChecked = useAppSelector(state => state.auth.isAuthChecked);

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-background text-foreground">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutComponent;
