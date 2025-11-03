'use client';
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  const slides = [
    {
      image: "/Hero/home-slider1.jpg",
      title: (
        <>
          Grab Up To <span className="text-yellow-400">50% Off</span> on Selected Products
        </>
      ),
      desc: "Limited-time offer on our best-selling collections. Don’t miss out on this exclusive deal!",
    },
    {
      image: "/Hero/home-slider2.jpg",
      title: (
        <>
          New <span className="text-yellow-400">Summer Collection</span> 2025
        </>
      ),
      desc: "Fresh styles for Men, Women & Kids. Upgrade your wardrobe with the latest trends.",
    },
    {
      image: "/Hero/home-slider3.jpg",
      title: (
        <>
          Exclusive <span className="text-yellow-400">Limited Edition</span> Pieces
        </>
      ),
      desc: "Stand out with our premium limited releases. Once gone, they’re gone forever!",
    },
  ];

  return (
    <div className="w-full min-h-[100vh] relative">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={6000}
        transitionTime={1000}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${slide.image})` }}
            className="w-full min-h-[100vh] flex items-center justify-center bg-cover bg-center relative"
          >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-transparent"></div>

            {/* Floating Decorative Blur Circles (Modern Effect) */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-red-500/30 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-400/20 rounded-full blur-[120px]"></div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 text-center px-6 max-w-[850px]"
            >
              <motion.h1
                className="font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-2xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                {slide.title}
              </motion.h1>

              <motion.p
                className="text-gray-300 text-md md:text-lg mt-6 max-w-[700px] mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {slide.desc}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap justify-center gap-4 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Link
                  href="/Shop/Men"
                  className="group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Men <FiArrowRight className="group-hover:translate-x-1 transition" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </Link>

                <Link
                  href="/Shop/Women"
                  className="group relative overflow-hidden bg-white text-gray-900 font-semibold text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:text-black transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Women <FiArrowRight className="group-hover:translate-x-1 transition" />
                  </span>
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition" />
                </Link>

                <Link
                  href="/Shop/Kids"
                  className="group relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold text-lg py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:from-yellow-300 hover:to-yellow-400 transition-all"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Shop Kids <FiArrowRight className="group-hover:translate-x-1 transition" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 w-full flex justify-center z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <div className="w-1.5 h-3 bg-white rounded-full mt-1 animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
