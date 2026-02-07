'use client';
import React, { useContext, useRef } from 'react';
import { ProductContext } from '../Context/ProductContext';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const BestSeller = () => {
  const { products } = useContext(ProductContext);
  // Ideally filter by rating/sales. Using slice for demo.
  const bestSellers = products.slice(0, 8);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-secondary/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-[2px] bg-primary"></span>
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Curated Selection</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight"
            >
              Best Sellers of the Season
            </motion.h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button onClick={scrollLeft} className="w-12 h-12 rounded-full border border-border bg-background hover:bg-foreground hover:text-background flex items-center justify-center transition-all">
              <ArrowLeft size={20} />
            </button>
            <button onClick={scrollRight} className="w-12 h-12 rounded-full border border-border bg-background hover:bg-foreground hover:text-background flex items-center justify-center transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSellers.map((product, index) => (
            <motion.div
              key={product._id}
              className="min-w-[280px] sm:min-w-[320px] snap-center relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Rank Badge for Top 3 */}
              {index < 3 && (
                <div className="absolute -top-4 -left-2 z-20 flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground font-serif font-bold text-xl rounded-br-2xl shadow-lg">
                  {index + 1}
                </div>
              )}

              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Swipe to explore</span>
        </div>

      </div>
    </section>
  );
};

export default BestSeller;
