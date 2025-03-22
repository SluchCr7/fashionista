"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const HeroPage = () => {
  return (
    <div className="relative w-full h-[100vh] mt-24 flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/Hero/home-slider2.jpg"
        layout="fill"
        objectFit="cover"
        alt="Fashion Hero Background"
        className="absolute z-0"
      />

      {/* Overlay for Dark Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 text-center text-white px-6 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold uppercase"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Elevate Your Style
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Discover the latest trends in fashion and redefine your wardrobe.
        </p>

        {/* Call-to-Action Button */}
        <motion.button
          className="mt-6 px-8 py-3 bg-white text-black font-semibold text-lg uppercase rounded-full shadow-lg hover:bg-gray-200 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroPage;
