'use client';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
const LayoutComponent = ({ children }) => {

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-white dark:bg-black">
        <Loader />
      </div>
    );
  }
//   if (!isAuthChecked) {
//     return null;
//   }
  return (
    <div className="flex items-center w-full flex-col">
        <Header />
        {children}
        <Footer/>
    </div>
  );
};

export default LayoutComponent;
