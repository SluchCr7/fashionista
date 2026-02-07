'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp, Award } from 'lucide-react';

const HeroPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/Hero/home-slider1.jpg",
      badge: "New Season",
      title: "Luxury Fashion",
      subtitle: "Redefined",
      description: "Discover our exclusive collection of premium designer pieces",
      cta: "Explore Collection",
      link: "/Collections",
      accent: "from-amber-400 to-yellow-600",
    },
    {
      id: 2,
      image: "/Hero/home-slider2.jpg",
      badge: "Limited Edition",
      title: "Summer Elegance",
      subtitle: "2025",
      description: "Fresh styles for the modern wardrobe",
      cta: "Shop Now",
      link: "/Shop",
      accent: "from-rose-400 to-pink-600",
    },
    {
      id: 3,
      image: "/Hero/home-slider3.jpg",
      badge: "Exclusive",
      title: "Timeless Classics",
      subtitle: "For You",
      description: "Curated pieces that never go out of style",
      cta: "View Collection",
      link: "/Collections",
      accent: "from-blue-400 to-indigo-600",
    },
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Animated Mesh Gradient */}
            <div className="absolute inset-0 opacity-30">
              <div className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].accent} mix-blend-overlay animate-pulse`} />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="max-w-3xl"
              >
                {/* Badge */}
                <motion.div variants={itemVariants} className="mb-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${slides[currentSlide].accent} text-white text-sm font-semibold uppercase tracking-wider shadow-lg`}>
                    <Sparkles className="w-4 h-4" />
                    {slides[currentSlide].badge}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 leading-none"
                >
                  {slides[currentSlide].title}
                  <br />
                  <span className="gradient-text">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href={slides[currentSlide].link}
                    className={`group relative px-8 py-4 bg-gradient-to-r ${slides[currentSlide].accent} text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {slides[currentSlide].cta}
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Link>

                  <Link
                    href="/Shop"
                    className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
                  >
                    Shop All
                  </Link>
                </motion.div>

                {/* Features */}
                <motion.div
                  variants={itemVariants}
                  className="mt-12 flex flex-wrap gap-6 text-white/80"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-sm font-medium">Trending Styles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    <span className="text-sm font-medium">Premium Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-medium">Exclusive Designs</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs uppercase tracking-wider">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default HeroPage;
