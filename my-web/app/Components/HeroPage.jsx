'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const HeroPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?q=80&w=1974&auto=format&fit=crop",
            subtitle: "Chapter I",
            title: "Modern",
            titleItalic: "Tailoring.",
            link: "/Shop?gender=Men",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
            subtitle: "Chapter II",
            title: "Summer",
            titleItalic: "Elegance.",
            link: "/Shop?gender=Women",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2000&auto=format&fit=crop",
            subtitle: "Chapter III",
            title: "Timeless",
            titleItalic: "Classics.",
            link: "/Shop",
        },
    ];

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 1000);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setTimeout(() => setIsAnimating(false), 1000);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    return (
        <section className="relative h-[100vh] min-h-[600px] w-full overflow-hidden bg-[#0a0a0a] text-white">
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        fill priority unoptimized
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                </motion.div>
            </AnimatePresence>

            {/* CONTENT OVERLAY */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-12 sm:pb-20 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
                        className="max-w-4xl"
                    >
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 mb-6 block">
                            {slides[currentSlide].subtitle}
                        </span>
                        
                        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-black uppercase tracking-tighter leading-[0.85] mb-12 mix-blend-overlay">
                            {slides[currentSlide].title} <br/>
                            <span className="italic font-light">{slides[currentSlide].titleItalic}</span>
                        </h1>

                        <Link
                            href={slides[currentSlide].link}
                            className="group flex items-center gap-6 w-fit text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-3 hover:border-white transition-all"
                        >
                            <span>Explore Archive</span>
                            <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                </AnimatePresence>

                {/* CONTROLS */}
                <div className="absolute right-6 md:right-12 bottom-12 sm:bottom-20 flex flex-col items-end gap-8">
                    
                    {/* Progress Typography */}
                    <div className="text-xs font-bold tracking-widest uppercase flex items-center gap-4">
                        <span className="text-white">0{currentSlide + 1}</span>
                        <span className="w-12 h-[1px] bg-white/30 relative">
                            <motion.span 
                                key={currentSlide}
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 7, ease: "linear" }}
                                className="absolute left-0 top-0 h-full bg-white"
                            />
                        </span>
                        <span className="text-white/40">0{slides.length}</span>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-4">
                        <button 
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                        >
                            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                        >
                            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default HeroPage;
