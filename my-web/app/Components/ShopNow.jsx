import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";

const ShopNow = () => {
  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src="/Hero/bg.jpg.webp" 
          alt="Fashion Collection"
          fill
          priority
          className="object-cover brightness-75 bg-fixed"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 backdrop-blur-md bg-white/10 px-6 py-10 rounded-2xl max-w-2xl text-center text-white shadow-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
          Discover Timeless Fashion
        </h1>
        <p className="text-lg mt-4 text-gray-200">
          Elevate your style with premium apparel crafted for comfort and elegance. 
          Shop now and redefine your everyday wardrobe.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-500"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ShopNow
import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";

const ShopNow = () => {
  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src="/Hero/bg.jpg.webp" 
          alt="Fashion Collection"
          fill
          priority
          className="object-cover brightness-75 bg-fixed"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 backdrop-blur-md bg-white/10 px-6 py-10 rounded-2xl max-w-2xl text-center text-white shadow-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
          Discover Timeless Fashion
        </h1>
        <p className="text-lg mt-4 text-gray-200">
          Elevate your style with premium apparel crafted for comfort and elegance. 
          Shop now and redefine your everyday wardrobe.
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-500"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ShopNow
