'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ClothesGender from '@/app/Components/ClothesGender'

const Women = () => {
  return (
    <div className="min-h-screen bg-rose-50/30">

      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <Image
          src="/Hero/bg-woman.webp"
          alt="Women's Fashion Hero"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-100/80 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <span className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold tracking-widest text-rose-600 uppercase shadow-lg mb-4 inline-block">
            New Arrivals 2025
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 drop-shadow-sm mb-6 tracking-tight uppercase">
            Pure <span className="text-rose-500">Elegance</span>.
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto mb-8">
            Elevate your everyday with our curated feminine collection.
          </p>
          <Link href="#shop-women" className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-full hover:bg-rose-500 hover:scale-105 transition-all duration-300 shadow-xl">
            Shop The Edit
          </Link>
        </motion.div>
      </section>

      {/* 2. CATEGORY HIGHLIGHTS */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">The Essentials</h2>
          <div className="w-24 h-1 bg-rose-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Chic Dresses', img: '/Hero/women-1.jpg', link: '/Shop?gender=Women&category=Dresses' },
            { title: 'Premium Accessories', img: '/Hero/bg_shoes_wom.jpg', link: '/Shop?gender=Women&category=Accessories' },
            { title: 'Daily Wear', img: '/Hero/WomenShop.jpg', link: '/Shop?gender=Women&category=Casual' }
          ].map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
            >
              <Link href={cat.link}>
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                  <span className="text-rose-200 group-hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider">Explore &rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section id="shop-women" className="py-20 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="mb-6 md:mb-0">
              <span className="text-rose-500 font-bold tracking-widest uppercase text-sm">Best Sellers</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2">Women&apos;s Favorites</h2>
            </div>
            <Link href="/Shop?gender=Women" className="text-gray-500 hover:text-rose-600 font-semibold underline decoration-rose-300 underline-offset-4 transition-colors">
              View All Women&apos;s
            </Link>
          </div>

          <ClothesGender gender={"women"} title={""} Para={""} />
        </div>
      </section>

      {/* 4. PROMO SECTION */}
      <section className="py-24 bg-rose-100 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <Image src="/Hero/promo1.jpg" alt="Promo" fill className="object-cover" />
          </div>
          <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center text-left">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">VIP Access</h2>
            <p className="text-gray-500 mb-8">Get 15% off your first order and stay updated with our latest releases.</p>
            <div className="space-y-4">
              <input type="email" placeholder="Email Address" className="w-full px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-rose-500" />
              <button className="w-full py-3 bg-gray-900 text-white font-bold rounded-full hover:bg-rose-500 transition-colors shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  )
}

export default Women
