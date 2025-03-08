'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Intro from './Intro';
import { motion } from "framer-motion";

const Opinions = () => {
  const testimonials = [
    {
      name: "Arnold Adam",
      img: "/Openions/testimonial1-1.jpg",
      job: "AI Developer",
      opinion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, maiores? Adipisci soluta tempora explicabo excepturi ea corporis fugiat dicta facilis."
    },
    {
      name: "Androw Jadd",
      img: "/Openions/testimonial2-1.jpg",
      job: "Software Engineer",
      opinion: "Enim, quo magnam quidem reprehenderit quisquam facere! Soluta tempora explicabo excepturi ea corporis fugiat dicta facilis."
    },
    { 
      name: "Sophia Carter",
      img: "/Openions/testimonial3-1.jpg",
      job: "Data Scientist",
      opinion: "Sequi repellat architecto enim, quo magnam quidem reprehenderit quisquam facere!"
    },
    {
      name: "Michael Ross",
      img: "/Openions/testimonial4-1.jpg",
      job: "Product Manager",
      opinion: "Adipisci soluta tempora explicabo excepturi ea corporis fugiat dicta facilis sequi repellat architecto enim."
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex , nextSlide]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full py-20 bg-fixed bg-center bg-cover" 
      style={{ backgroundImage: "url('/Hero/bg.jpg.webp')" }}>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6 justify-center items-center text-white">
        <Intro title="Testimonials" para="What Our Clients Say About Us" />

        {/* Testimonials Container */}
        <div className="relative w-full max-w-4xl px-6">
          <motion.div 
            className="flex transition-transform gap-5 duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((item, index) => (
              <motion.div 
                key={index} 
                className="w-full flex-shrink-0 flex flex-col items-center gap-5 text-center p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FaQuoteLeft className="text-4xl text-gray-300" />
                <p className="text-white/90 text-lg italic">{item.opinion}</p>
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  width={80} 
                  height={80} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-white"
                />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold">{item.name}</span>
                  <span className="text-sm text-white/70">{item.job}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2">
          <button 
            className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition" 
            onClick={prevSlide}
          >
            <FaChevronLeft size={20} className="text-white" />
          </button>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <button 
            className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow-md hover:bg-white/30 transition" 
            onClick={nextSlide}
          >
            <FaChevronRight size={20} className="text-white" />
          </button>
        </div>

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
}

export default Opinions;
