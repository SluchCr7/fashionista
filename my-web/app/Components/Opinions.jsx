'use client';
import Image from 'next/image';
import React, { useState, useEffect, useCallback, memo } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Intro from './Intro';
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from '../Data';

const Opinions = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, nextSlide]);


  return (
    <div className="relative w-full py-20 overflow-hidden bg-fixed bg-center bg-cover" 
      style={{ backgroundImage: "url('/Hero/bg.jpg.webp')" }}>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 justify-center items-center text-white px-6">
        <Intro title="Testimonials" para="What Our Clients Say About Us" />

        {/* Testimonials Container */}
        <div className="relative w-full max-w-4xl overflow-hidden">
          <div className="flex w-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                className="w-full flex flex-col items-center gap-5 text-center p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <FaQuoteLeft className="text-4xl text-gray-300" />
                <p className="text-white/90 text-lg italic">{testimonials[currentIndex].opinion}</p>
                <Image 
                  src={testimonials[currentIndex].img} 
                  alt={testimonials[currentIndex].name} 
                  width={80} 
                  height={80} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold">{testimonials[currentIndex].name}</span>
                  <span className="text-sm text-white/70">{testimonials[currentIndex].job}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition" 
          onClick={prevSlide}
        >
          <FaChevronLeft size={20} className="text-white" />
        </button>
        <button 
          className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition" 
          onClick={nextSlide}
        >
          <FaChevronRight size={20} className="text-white" />
        </button>

        {/* Dots Navigation */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border border-white
                ${currentIndex === index ? "bg-white scale-125 shadow-lg" : "bg-transparent"}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
});


Opinions.displayName = "Opinions";

export default Opinions;
