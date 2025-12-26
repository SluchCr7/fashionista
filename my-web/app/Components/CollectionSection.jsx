'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const CollectionSection = ({
  title,
  subtitle,
  products = [],
  showRating = false,
  calculateRating = () => ({ avg: 0, count: 0 }),
  ctaText = "Shop All Products",
  ctaLink = "/Shop"
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
  }, [products]); // Re-run when products change

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
          {products.map((prod, idx) => {
            const { avg, count } = showRating ? calculateRating(prod._id) : { avg: null, count: null };

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="min-w-[280px] md:min-w-[320px] group"
              >
                <Link href={`/Product/${prod._id}`} className="block">
                  <div className="relative overflow-hidden aspect-[3/4] rounded-lg bg-secondary/50 mb-4">
                    <Image
                      src={prod.Photo[0]?.url || '/placeholder.jpg'}
                      alt={prod.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Badge if needed (Sale, New) */}
                    {/* <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 text-xs font-bold uppercase tracking-wider">New</div> */}

                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-medium text-lg leading-tight group-hover:underline decoration-1 underline-offset-4">{prod.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-lg text-foreground">${prod.price}</p>
                      {showRating && avg > 0 && (
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                          <Star className="w-4 h-4 fill-yellow-500" />
                          <span>{avg}</span>
                          <span className="text-muted-foreground text-xs">({count})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href={ctaLink}
            className="inline-flex items-center bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium transition hover:bg-primary/90"
          >
            {ctaText} <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
