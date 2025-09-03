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

const Hero = () => {
    const slides = [
        {
            image: "/Hero/home-slider1.jpg",
            title: <>Grab Up To <span className="text-yellow-400">50% Off</span> on Selected Products</>,
            desc: "Limited-time offer on our best-selling collections. Don’t miss out on this exclusive deal!",
        },
        {
            image: "/Hero/home-slider2.jpg",
            title: <>New <span className="text-yellow-400">Summer Collection</span> 2025</>,
            desc: "Fresh styles for Men, Women & Kids. Upgrade your wardrobe with the latest trends.",
        },
        {
            image: "/Hero/home-slider3.jpg",
            title: <>Exclusive <span className="text-yellow-400">Limited Edition</span> Pieces</>,
            desc: "Stand out with our premium limited releases. Once gone, they’re gone forever!",
        }
    ];

    return (
        <div className="w-full min-h-[100vh]">
            <Carousel 
                showThumbs={false} 
                autoPlay 
                infiniteLoop 
                showStatus={false} 
                interval={5000} 
                transitionTime={1000}
            >
                {slides.map((slide, index) => (
                    <div 
                        key={index}
                        style={{ backgroundImage: `url(${slide.image})` }}
                        className="w-full min-h-[100vh] flex items-center justify-center bg-cover bg-center relative"
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                        
                        {/* Content */}
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="relative z-10 text-center px-6 max-w-[800px]"
                        >
                            <h1 className="font-extrabold text-white text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-gray-200 text-md md:text-lg mt-4">
                                {slide.desc}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap justify-center gap-4 mt-8">
                                <Link href="/Shop/Men" className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105">
                                    Shop Men
                                </Link>
                                <Link href="/Shop/Women" className="bg-white hover:bg-gray-100 text-gray-900 font-semibold text-lg py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105">
                                    Shop Women
                                </Link>
                                <Link href="/Shop/Kids" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-lg py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105">
                                    Shop Kids
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Hero;
