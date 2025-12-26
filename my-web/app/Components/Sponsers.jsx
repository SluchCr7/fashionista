'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Companies } from '../Data';

const Sponsors = () => {
  // Triple the list to ensure smooth seamless looping
  const marqueeList = [...Companies, ...Companies, ...Companies];

  return (
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-400"
        >
          Trusted by Top Brands
        </motion.p>
      </div>

      <div className="relative w-full flex overflow-hidden mask-gradient-x">
        {/* Gradient Masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-16 md:gap-24 flex-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {marqueeList.map((logo, index) => (
            <div
              key={index}
              className="relative w-32 h-16 md:w-40 md:h-20 flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
            >
              <Image
                src={logo}
                alt={`Partner ${index}`}
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

export default Sponsors;
