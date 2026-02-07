'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../Data';

const Opinions = memo(() => {
  // Triple the list to ensure smooth infinite scroll without gaps on large screens
  const marqueeList = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-background overflow-hidden relative border-t border-secondary/20">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block"
        >
          Testimonials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-serif font-bold text-foreground"
        >
          Voices of Fashionista
        </motion.h2>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden mask-linear-gradient" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <motion.div
          className="flex gap-6 md:gap-8 w-max px-4"
          animate={{ x: "-33.33%" }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {marqueeList.map((t, index) => (
            <div
              key={`${t.name}-${index}`}
              className="w-[300px] md:w-[400px] bg-secondary/10 backdrop-blur-sm border border-border/50 rounded-2xl p-8 flex flex-col justify-between hover:bg-secondary/20 transition-colors duration-300 group"
            >
              <div>
                <div className="flex gap-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < (t.rating || 5) ? "currentColor" : "none"} className={i < (t.rating || 5) ? "" : "text-muted-foreground/20"} />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors" />
                <p className="text-foreground/80 font-serif italic leading-relaxed text-lg mb-6 line-clamp-4">
                  {t.opinion}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">{t.name}</h4>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{t.job || "Verified Customer"}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Opinions.displayName = 'Opinions';
export default Opinions;
