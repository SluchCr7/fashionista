'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Ads = () => {
  return (
    <section className="flex items-center justify-center py-16 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-[80vh]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-xl overflow-hidden"
      >

        {/* Image Section */}
        <div className="relative w-full md:w-[55%] overflow-hidden group">
          <Image
            src="/Hero/HeroCollection.jpg"
            alt="Women Collection Banner"
            width={1000}
            height={1000}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay for better text contrast (optional) */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500"></div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center items-start gap-6 p-8 md:p-12 w-full md:w-[45%] text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight"
          >
            Special Women Collection
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0"
          >
            Discover our exclusive Women’s Collection designed for style, comfort, and elegance. 
            Find the latest trends and timeless classics to elevate your wardrobe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href="/Woman"
              className="bg-DarkRed text-white px-8 py-3 rounded-md font-semibold text-sm uppercase 
                         hover:bg-red-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Ads
