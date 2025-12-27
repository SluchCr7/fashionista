'use client';
import Link from 'next/link';
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';

const Intro = memo(({ title, para, linkText = "Explore Collection", linkHref = "/Shop" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-end md:items-center justify-between w-full gap-8 border-b border-gray-100 pb-10"
    >
      <div className="flex flex-col gap-2 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 tracking-tight">
          {title}
        </h2>
        {para && (
          <p className="text-gray-500 font-light text-lg leading-relaxed max-w-lg">
            {para}
          </p>
        )}
      </div>

      <Link
        href={linkHref}
        aria-label={linkText}
        className="group flex items-center gap-3 text-black text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300"
      >
        <span className="relative">
          {linkText}
          <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-500 group-hover:w-full" />
        </span>
        <MoveRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
      </Link>
    </motion.div>
  );
});

Intro.displayName = "Intro";

export default Intro;
