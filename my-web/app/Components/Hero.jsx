// 'use client'
// import React from 'react';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
// import { Carousel } from 'react-responsive-carousel'; // Import the Carousel component
// import Link from 'next/link';

// const Hero = () => {
//     return (
//         <div className="w-full min-h-[100vh]">
//                 <div
//                     style={{ backgroundImage: `url(/Hero/16.jpg.webp)` }}
//                     className="w-full min-h-[100vh] flex flex-col items-center justify-center bg-cover bg-center bg-fixed relative px-5 md:px-0"
//                 >
//                     {/* Overlay for better text visibility */}
//                     <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//                     <div className="relative z-10 flex flex-col items-center text-center max-w-[800px]">
//                         <span className="font-extrabold text-white text-3xl sm:text-4xl md:text-6xl leading-tight drop-shadow-md">
//                             Grab Up To <span className="text-yellow-400">50% Off</span> on Selected Products
//                         </span>
//                         <p className="text-gray-200 text-md md:text-lg mt-4">
//                             Limited-time offer on our best-selling collections. Do not miss out on this exclusive deal!
//                         </p>
//                         <Link 
//                             href="/Shop" 
//                             className="bg-DarkRed text-white transition-all duration-300 font-semibold text-lg mt-6 py-3 px-6 rounded-full shadow-lg"
//                         >
//                             Shop Now
//                         </Link>
//                     </div>
//                 </div>
//         </div>
//     );
// };

// export default Hero;

'use client'
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="relative w-full h-[110vh] overflow-hidden bg-black flex flex-col lg:flex-row">
      {/* Men Section */}
      <motion.div 
        initial={{ width: '100%', opacity: 0 }}
        animate={{ width: '50%', opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-1/2 lg:h-full group cursor-pointer overflow-hidden border-r border-white/5"
      >
        <Image 
          src="/Hero/bg_man.webp" 
          alt="Male Collection" 
          fill 
          className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] scale-105 group-hover:scale-100"
          priority
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <p className="typography-display !text-white/60 mb-4">L&apos;Homme Archive</p>
            <h2 className="text-5xl md:text-8xl font-serif font-black text-white italic tracking-tighter mb-8">Ethereal.</h2>
            <Link href="/Shop/Men" className="button-luxury !bg-white !text-black hover:!bg-black hover:!text-white border-none py-6 px-12">
              Explore Men
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Women Section */}
      <motion.div 
        initial={{ width: '100%', opacity: 0 }}
        animate={{ width: '50%', opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-1/2 lg:h-full group cursor-pointer overflow-hidden"
      >
        <Image 
          src="/Hero/bg-woman.webp" 
          alt="Female Collection" 
          fill 
          className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s] scale-105 group-hover:scale-100"
          priority
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="typography-display !text-white/60 mb-4">La Femme Edition</p>
            <h2 className="text-5xl md:text-8xl font-serif font-black text-white italic tracking-tighter mb-8">Noir.</h2>
            <Link href="/Shop/Women" className="button-luxury !bg-white !text-black hover:!bg-black hover:!text-white border-none py-6 px-12">
              Explore Women
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Boutique Signature Overlay */}
      <div className="absolute bottom-12 left-12 z-20 hidden lg:block">
        <p className="typography-display !text-[8px] text-white/40 max-w-[200px] leading-relaxed">
          ARCHIVE 3.2 — CURATED IN MILAN FOR THE DISCERNING INDIVIDUAL. EST. 2025.
        </p>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-px h-64 bg-white/20 hidden lg:block"
        />
      </div>
    </div>
  );
};

export default Hero;
