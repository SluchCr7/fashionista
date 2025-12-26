'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Companies } from '../Data';

const Sponsors = () => {
  return (
    <section className="py-20 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold uppercase tracking-widest text-muted-foreground mb-10">
            Trusted Partners
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 hover:opacity-100 transition-opacity duration-500">
            {Companies?.slice(0, 6).map((logo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
                className="relative w-32 h-16 md:w-40 md:h-20 grayscale transition-all duration-300"
              >
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
