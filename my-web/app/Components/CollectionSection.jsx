'use client';
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const CollectionSection = ({
  title,
  subtitle,
  products = [],
  showRating = false
}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Scroll Logic
  const scroll = (dir) => {
    const scrollAmount = dir === "left" ? -400 : 400;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScrollUpdate = () => {
    const el = scrollRef.current;
    if (el) {
      const left = el.scrollLeft;
      const right = el.scrollWidth > left + el.clientWidth + 10;
      setCanScrollLeft(left > 0);
      setCanScrollRight(right);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", handleScrollUpdate);
      handleScrollUpdate();
      return () => el.removeEventListener("scroll", handleScrollUpdate);
    }
  }, [products]);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 relative">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">{title}</h2>
            <p className="text-muted-foreground max-w-lg">{subtitle}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              disabled={!canScrollLeft}
              className="p-3 rounded-full border border-border hover:bg-muted hover:text-foreground transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              disabled={!canScrollRight}
              className="p-3 rounded-full border border-border hover:bg-muted hover:text-foreground transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide py-4 -mx-4 px-4 md:-mx-0 md:px-0"
        >
          {products.map((prod, idx) => (
            <motion.div
              key={prod._id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="min-w-[280px] md:min-w-[320px]"
            >
              <ProductCard product={prod} showRating={showRating} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Link href="/Shop" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
            View All Products <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
