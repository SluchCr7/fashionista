import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";

const ShopNow = () => {
  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/Hero/bg.jpg.webp" 
          alt="Fashion Collection"
          layout="fill"
          objectFit="cover"
          className="brightness-75 bg-cover bg-center bg-fixed transform scale-105 transition-transform duration-1000"
        />
      </div>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text Content with Blur Effect */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 backdrop-blur-md bg-white/10 px-6 py-10 rounded-lg max-w-2xl text-center text-white shadow-xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Discover Timeless Fashion
        </h1>
        <p className="text-lg mt-4">
          Elevate your style with premium apparel crafted for comfort and elegance. 
          Shop now and redefine your everyday wardrobe.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-white text-black text-lg px-6 py-3 rounded-md shadow-lg hover:bg-gray-200 transition-all duration-500"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ShopNow
