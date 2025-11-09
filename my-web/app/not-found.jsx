'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

// Redesigned 404 Page (No background images – clean, modern, professional)
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-16">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-xl w-full"
      >

        {/* Large clean number */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[120px] md:text-[160px] font-extrabold text-gray-900 leading-none"
        >
          404
        </motion.h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2">
          Page Not Found
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500 leading-relaxed">
          The page you are trying to access doesn’t exist or may have been moved.
          Please check the URL or return to the homepage.
        </p>

        {/* Call to action */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow hover:bg-gray-800 hover:scale-[1.02] transition-all"
        >
          <FiArrowLeft /> Go Back Home
        </Link>

        {/* Extra subtle footer message */}
        <p className="mt-6 text-sm text-gray-400">
          If you believe this is an error, feel free to report it.
        </p>

      </motion.div>
    </div>
  )
}