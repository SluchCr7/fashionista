'use client'
import React from "react"
import { motion } from "framer-motion"

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Main Brand Text with Split Reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-light tracking-tighter"
          >
            FASHIONISTA
          </motion.h1>
        </div>

        {/* Subtitle / Tagline */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 0.6, letterSpacing: "0.5em" }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
          className="text-xs md:text-sm uppercase text-white/50 mb-12"
        >
          Redefining Style
        </motion.p>

        {/* Elegant Progress Line */}
        <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
          />
        </div>
      </motion.div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
      </div>

    </div>
  )
}

export default Loader
