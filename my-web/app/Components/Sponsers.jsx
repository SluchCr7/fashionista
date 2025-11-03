'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { Companies } from '../Data'

const Sponsors = () => {
  return (
    <section className="relative w-full py-16 ">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      {/* Decorative gradient circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2"
        >
          Trusted by <span className="text-red-600">Leading Brands</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-500 mb-12 text-sm md:text-base max-w-2xl mx-auto"
        >
          We’re proud to collaborate with top-tier partners and global brands who trust our quality.
        </motion.p>

        {/* Logos Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 items-center justify-center"
        >
          {Companies.slice(0, 8).map((logo, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex items-center justify-center p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-red-500/30 transition-all"
            >
              <Image
                src={logo}
                alt={`Company ${index + 1}`}
                width={160}
                height={80}
                className="w-40 h-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500 opacity-60"></div>
    </section>
  )
}

export default Sponsors
