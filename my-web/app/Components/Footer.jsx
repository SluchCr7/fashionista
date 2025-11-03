'use client'
import Link from 'next/link'
import React from 'react'
import { socialLinks } from '../Data'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative bg-[#0f0f0f] text-gray-300 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* Container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 z-10">

        {/* Brand & Newsletter */}
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-extrabold tracking-wide text-white uppercase">
            Fashionista
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Discover the latest in fashion and lifestyle. Elevate your style with our curated collections.
          </p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden flex"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-100 placeholder-gray-400 outline-none"
            />
            <button className="bg-gradient-to-r from-red-600 to-pink-600 px-5 text-white font-semibold hover:brightness-110 transition">
              Subscribe
            </button>
          </motion.div>
          <span className="text-xs text-gray-500">Get 10% off your first order 🎁</span>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold text-lg text-white mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {["Men", "Women", "Kids", "Shoes", "Accessories"].map((item) => (
              <li key={item}>
                <Link href={`/Shop/${item}`} className="hover:text-white transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {["About", "Careers", "Blog", "Sustainability"].map((item) => (
              <li key={item}>
                <Link href={`/${item}`} className="hover:text-white transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {["FAQ", "Shipping", "Returns", "Contact"].map((item) => (
              <li key={item}>
                <Link href={`/${item}`} className="hover:text-white transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social & Payments */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-semibold text-lg text-white mb-3">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.15 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-red-500 hover:bg-red-600/10 text-gray-400 hover:text-white transition"
                >
                  <Link href={item.link}>{item.icon}</Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-white mb-3">We Accept</h3>
            <div className="flex gap-4 text-3xl text-gray-400">
              <FaCcVisa className="hover:text-white transition" />
              <FaCcMastercard className="hover:text-white transition" />
              <FaCcPaypal className="hover:text-white transition" />
              <FaApplePay className="hover:text-white transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-500 gap-4 z-10 relative">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          &copy; {new Date().getFullYear()} <span className="text-white font-semibold">Fashionista</span>. All rights reserved.
        </motion.span>
        <div className="flex gap-5">
          {["Terms", "Privacy", "Sitemap"].map((link, i) => (
            <Link key={i} href={`/${link}`} className="hover:text-white transition">
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* Floating Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-yellow-400 to-pink-600"></div>
    </footer>
  )
}

export default Footer
