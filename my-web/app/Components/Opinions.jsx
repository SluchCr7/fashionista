'use client';
import React, { memo } from 'react';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../Data';

const Opinions = memo(() => {
  const displayTestimonials = testimonials.slice(0, 3); // Take top 3 for clean layout

  return (
    <section className="py-44 bg-background relative overflow-hidden border-t border-border/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="space-y-4">
            <p className="typography-display !text-accent">Global Opinions</p>
            <h2 className="text-4xl md:text-7xl font-serif font-black tracking-tighter italic">Resonating <span className="font-light not-italic opacity-30">Elegance.</span></h2>
          </div>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm uppercase tracking-widest !text-[10px]">
            The voices of those who define contemporary style and luxury through our collections.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {displayTestimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12 flex items-start flex-col justify-between w-full"
            >
              <Quote size={40} strokeWidth={0.5} className="text-accent opacity-30" />
              <p className="text-2xl md:text-3xl font-serif font-black italic tracking-tight leading-snug">
                "{t.opinion}"
              </p>

              <div className="flex items-center gap-6 pt-8 border-t border-border/10">
                <div className="relative w-12 h-12 overflow-hidden grayscale">
                  <Image src={t.img} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">{t.name}</h4>
                  <p className="typography-display !text-[7px] text-muted-foreground uppercase">{t.job || "Style Consultant"}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const Sponsors = () => {
  const marqueeList = [...Companies, ...Companies];

  return (
    <section className="py-24 bg-white overflow-hidden border-t border-border/5">
      <div className="container mx-auto px-6 mb-12">
        <p className="typography-display !text-[8px] text-muted-foreground uppercase tracking-[0.4em]">Corporate Affiliations</p>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-24 grayscale opacity-20 hover:opacity-100 transition-opacity duration-1000"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {marqueeList.map((logo, index) => (
            <div
              key={index}
              className="relative min-w-[200px] h-12 flex items-center justify-center"
            >
              <Image
                src={logo}
                alt={`Maison ${index}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

Opinions.displayName = 'Opinions';
export default Opinions;
