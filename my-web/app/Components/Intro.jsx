'use client'
import Link from 'next/link';
import React, { memo } from 'react';
import { motion } from 'framer-motion';

const Intro = memo(({ title, para, linkText = "View All Collection", linkHref = "/Shop" }) => {
  console.log("Intro rendered");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4 border-b pb-2 border-gray-200"
    >
      <div className="flex flex-col">
        <span className="uppercase font-extrabold text-gray-700 tracking-wider text-lg">
          {title}
        </span>
        {para && (
          <p className="text-sm text-gray-500 mt-1 max-w-xl leading-relaxed">
            {para}
          </p>
        )}
      </div>

      <Link
        href={linkHref}
        aria-label={linkText}
        className="relative text-DarkRed uppercase font-semibold text-sm group"
      >
        {linkText}
        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-DarkRed transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </motion.div>
  );
});

Intro.displayName = "Intro";

export default Intro;
