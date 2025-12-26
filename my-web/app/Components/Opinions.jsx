'use client';
import React, { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../Data';

const Opinions = memo(() => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = testimonials?.length || 0;

  const safeIndex = (i) => (count ? (i + count) % count : 0);
  const next = useCallback(() => setIndex((i) => safeIndex(i + 1)), [count]);
  const prev = useCallback(() => setIndex((i) => safeIndex(i - 1)), [count]);

  useEffect(() => {
    if (isPaused || !count) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [isPaused, count, next]);

  if (!count) return null;
  const t = testimonials[index];
  const rating = typeof t.rating === 'number' ? t.rating : 5;

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">
          What Our Clients Say
        </h2>

        <div className="max-w-4xl mx-auto relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-secondary/20 border border-border rounded-3xl p-10 md:p-14 text-center shadow-sm"
            >
              <Quote className="w-12 h-12 text-primary mx-auto mb-8 opacity-50" />
              <p className="text-xl md:text-2xl font-serif italic text-foreground/80 leading-relaxed mb-8">
                {t.opinion}
              </p>

              <div className="flex items-center justify-center gap-1 mb-6 text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.round(rating) ? "fill-current" : "text-muted/30"}>★</span>
                ))}
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-primary">
                  <Image src={t.img} alt={t.name} fill className="object-cover" />
                </div>
                <h4 className="font-bold text-lg">{t.name}</h4>
                <span className="text-sm text-primary font-medium tracking-wider uppercase">{t.job}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-12 z-20">
            <button onClick={prev} className="p-3 rounded-full bg-background border border-border shadow-md hover:bg-muted transition-colors">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-12 z-20">
            <button onClick={next} className="p-3 rounded-full bg-background border border-border shadow-md hover:bg-muted transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

Opinions.displayName = 'Opinions';
export default Opinions;
