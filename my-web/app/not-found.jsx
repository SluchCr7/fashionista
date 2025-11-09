import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6">

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >

        <motion.h1 
          initial={{ scale: 0.8 }} 
          animate={{ scale: 1 }} 
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-[150px] md:text-[200px] font-extrabold leading-none bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text"
        >
          404
        </motion.h1>

        <h2 className="text-3xl md:text-4xl font-bold mt-4">Oops! Page Not Found</h2>

        <p className="mt-4 text-gray-300 tracking-wide leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Double check the URL
          or return back to the homepage. We're here to guide you.
        </p>

        <Link href="/" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold shadow hover:scale-105 transition">
          <FiArrowLeft /> Return Home
        </Link>

      </motion.div>
    </div>
  )
}