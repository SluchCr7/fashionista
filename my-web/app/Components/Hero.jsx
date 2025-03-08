'use client'
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from 'react-responsive-carousel'; // Import the Carousel component
import Link from 'next/link';

const Hero = () => {
    const pages = [
        {
            image: "/Hero/16.jpg.webp",
            text: "",
            para: "“Discover your own style. Don't try to repeat what has already been written - have the courage to do your own thing and don't be afraid to do something different.”"
        },
        {
            image: "/Hero/h1_hero1.jpg.webp",
            text: "Minimal Menz Style",
            para: "Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos facilis neque nulla earum."
        },
    ];

    return (
        <div className="w-full min-h-[100vh]">
            {/* <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                stopOnHover={false}
                showIndicators={false}
                className="w-full h-[100vh]"
            > */}
                {/* {pages.map(({ image, text, para }, index) => ( */}
                {/* // key={index} */}
                <div
                    style={{ backgroundImage: `url(/Hero/16.jpg.webp)` }}
                    className="w-full min-h-[100vh] flex flex-col items-center justify-center bg-cover bg-center bg-fixed relative px-5 md:px-0"
                >
                    {/* Overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="relative z-10 flex flex-col items-center text-center max-w-[800px]">
                        <span className="font-extrabold text-white text-3xl sm:text-4xl md:text-6xl leading-tight drop-shadow-md">
                            Grab Up To <span className="text-yellow-400">50% Off</span> on Selected Products
                        </span>
                        <p className="text-gray-200 text-md md:text-lg mt-4">
                            Limited-time offer on our best-selling collections. Don't miss out on this exclusive deal!
                        </p>
                        <Link 
                            href="/Shop" 
                            className="bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-black font-semibold text-lg mt-6 py-3 px-6 rounded-full shadow-lg"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* // ))} */}
            {/* </Carousel> */}
        </div>
    );
};

export default Hero;
