'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Sponsers = () => {
    // Imagined high-end luxury partners
    const imaginedBrands = [
        { name: "AURA", subtitle: "PARIS", font: "font-serif tracking-[0.2em]" },
        { name: "VÉLÜRE", subtitle: "MILANO", font: "font-sans tracking-[0.4em] font-black" },
        { name: "NOIR", subtitle: "EST. 1994", font: "font-serif tracking-widest italic" },
        { name: "KINETIC", subtitle: "STUDIOS", font: "font-mono tracking-tighter font-bold" },
        { name: "LUMIN", subtitle: "LONDON", font: "font-serif tracking-[0.3em] font-light" },
        { name: "OBLIQUE", subtitle: "TOKYO", font: "font-sans tracking-widest font-black" },
        { name: "ZYPHER", subtitle: "NEW YORK", font: "font-serif tracking-[0.15em]" },
    ];

    // Duplicate the array to create a seamless infinite loop
    const marqueeList = [...imaginedBrands, ...imaginedBrands, ...imaginedBrands];

    return (
        <section className="py-32 bg-white dark:bg-[#0a0a0a] border-y border-black/10 dark:border-white/10 overflow-hidden relative transition-colors duration-500">
            
            <div className="container mx-auto px-6 mb-20 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 dark:text-white/40"
                >
                    Official Partners & Global Stockists
                </motion.p>
            </div>

            <div className="relative w-full overflow-hidden flex items-center">
                
                {/* Gradient Masks for smooth fading on the edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-500" />
                <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-500" />

                {/* Animated Marquee */}
                <motion.div
                    className="flex flex-nowrap items-center gap-24 md:gap-40"
                    animate={{ x: ['0%', '-33.33%'] }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {marqueeList.map((brand, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center shrink-0 group cursor-default"
                        >
                            <span className={`text-4xl md:text-5xl text-black/30 dark:text-white/30 group-hover:text-black dark:group-hover:text-white transition-colors duration-700 ${brand.font}`}>
                                {brand.name}
                            </span>
                            <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-black/20 dark:text-white/20 mt-3 group-hover:text-black/50 dark:group-hover:text-white/50 transition-colors duration-700">
                                {brand.subtitle}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Sponsers;
