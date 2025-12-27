'use client';
import React from 'react';
import ClothesGender from '@/app/Components/ClothesGender';
import { motion } from 'framer-motion';

const Women = () => {
  return (
    <main className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fix */}
        <div
          className="absolute inset-0 bg-[url('/Hero/bg-woman.webp')] bg-cover bg-center bg-no-repeat"
          style={{ filter: 'brightness(0.85)' }}
        />

        {/* Content Overlay */}
        <div className="relative z-10 text-center px-4 flex flex-col items-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-sm md:text-base font-bold tracking-[0.3em] uppercase"
          >
            New Arrivals 2025
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white text-5xl md:text-8xl font-serif font-medium tracking-tight"
          >
            Effortless <br className="md:hidden" /> Beauty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-200 max-w-lg text-lg font-light leading-relaxed"
          >
            Defined by modern silhouettes and refined details.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/70 text-xs tracking-widest uppercase">View Collection</span>
          <div className="w-[1px] h-12 bg-white/50" />
        </motion.div>
      </section>

      {/* Product Section */}
      <div className="relative z-20 bg-white -mt-4 rounded-t-3xl shadow-2xl pb-20">
        <ClothesGender
          gender="women"
          title="The Women's Edit"
          Para="Curated styles for the contemporary woman."
        />
      </div>
    </main>
  );
};

export default Women;