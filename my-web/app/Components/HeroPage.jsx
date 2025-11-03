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
      btnText: "Shop Now",
      link: "/Shop",
    },
    {
      image: "/Hero/home-slider2.jpg",
      title: (
        <>
          New <span className="text-yellow-400">Summer Collection</span> 2025
        </>
      ),
      desc: "Fresh styles for Men, Women & Kids. Upgrade your wardrobe with the latest trends.",
      btnText: "Explore Collection",
      link: "/Collections",
    },
    {
      image: "/Hero/home-slider3.jpg",
      title: (
        <>
          Exclusive <span className="text-yellow-400">Limited Edition</span> Pieces
        </>
      ),
      desc: "Stand out with our premium limited releases. Once gone, they’re gone forever!",
      btnText: "Discover More",
      link: "/Limited",
    },
  ];

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden">
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={6000}
        transitionTime={1000}
        swipeable
        emulateTouch
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative w-full min-h-[100vh] flex items-center justify-center bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* === Layered Overlays === */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/30" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />

            {/* === Floating Light Blobs === */}
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-yellow-400/20 rounded-full blur-[160px]" />
            <div className="absolute bottom-[-120px] left-[-120px] w-[400px] h-[400px] bg-red-500/25 rounded-full blur-[200px]" />

            {/* === Slide Content === */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 px-6 text-center max-w-[950px]"
            >
              <motion.h1
                className="font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight drop-shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
              >
                {slide.title}
              </motion.h1>

              <motion.p
                className="text-gray-300 text-base md:text-lg mt-6 max-w-[720px] mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {slide.desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-10"
              >
                <Link
                  href={slide.link}
                  className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full text-lg uppercase tracking-wide
                    hover:bg-yellow-300 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {slide.btnText} <FiArrowRight className="text-xl" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </Carousel>

      {/* === Animated Scroll Indicator === */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white rounded-full mt-1 animate-pulse"></div>
        </div>
        <p className="text-xs text-gray-300 font-light tracking-wider">Scroll</p>
      </motion.div>
    </section>
  );
};

export default Hero;
