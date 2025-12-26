'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Ads = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl bg-foreground text-background"
        >
          <div className="flex flex-col md:flex-row h-full">

            {/* Image */}
            <div className="w-full md:w-1/2 relative min-h-[400px]">
              <Image
                src="/Hero/HeroCollection.jpg"
                alt="Women Collection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center items-start">
              <span className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Exclusive</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Elevate Your <br /> Everyday Style
              </h2>
              <p className="text-secondary-foreground/80 mb-8 max-w-md text-lg">
                Discover our curated Women is Collection. Timeless pieces designed for modern elegance and comfort.
              </p>
              <Link
                href="/Women"
                className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-background/90 transition-colors"
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ads;
