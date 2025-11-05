'use client'

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      
      {/* === خلفية متحركة ناعمة (Gradient Animated) === */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e293b, #111827, #0f172a)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* طبقة زجاجية شفافة (glass overlay) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* === المكون الرئيسي === */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 text-white">
        
        {/* الشعار (Logo) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-yellow-400/40 via-pink-400/30 to-transparent blur-xl absolute"
          />
          <span className="relative text-4xl sm:text-5xl font-extrabold tracking-wide italic drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Fash<span className="text-yellow-400">ionista</span>
          </span>
        </motion.div>

        {/* سبينر احترافي */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative w-14 h-14"
        >
          <div className="absolute inset-0 border-4 border-transparent border-t-yellow-400 border-l-yellow-400 rounded-full"></div>
          <div className="absolute inset-1 border-2 border-white/10 rounded-full"></div>
        </motion.div>

        {/* نص التحميل */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-sm sm:text-base text-gray-300 tracking-widest uppercase"
        >
          Loading your experience...
        </motion.p>
      </div>
    </div>
  )
}

export default Loader
