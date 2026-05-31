'use client';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Loader from './Loader';
import { useAppSelector } from '@/lib/redux/hooks';
import { usePathname } from 'next/navigation';

const LayoutComponent = ({ children }) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.toLowerCase().startsWith('/admin');
  const isAuthChecked = useAppSelector(state => state.auth.isAuthChecked);

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-background text-foreground">
        <Loader />
      </div>
    );
  }

  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-slate-950/5 text-foreground">
        {children}
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
