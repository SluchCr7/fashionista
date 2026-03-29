'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const collections = [
    {
        id: 1,
        title: "Urban Streetwear",
        subtitle: "Bold looks for the concrete jungle.",
        image: "/Hero/bg_men.jpg", 
        cName: "col-span-1 md:col-span-2 row-span-2",
        link: "/Shop?category=Men",
        tag: "Vol. 01"
    },
    {
        id: 2,
        title: "Summer Breeze",
        subtitle: "Light, airy, and effortlessly chic.",
        image: "/Hero/bg_shoes_wom.jpg", 
        cName: "col-span-1 md:col-span-1 row-span-1",
        link: "/Shop?category=Women",
        tag: "Vol. 02"
    },
    {
        id: 3,
        title: "Sport & Active",
        subtitle: "Performance meets high style.",
        image: "/assets/mens-collection.webp", 
        cName: "col-span-1 md:col-span-1 row-span-1",
        link: "/Shop?category=Sport",
        tag: "Vol. 03"
    },
    {
        id: 4,
        title: "Evening Elegance",
        subtitle: "Sophisticated attire for exclusive nights.",
        image: "/Hero/h1_hero2.jpg.webp",
        cName: "col-span-1 md:col-span-2 row-span-1",
        link: "/Shop?category=Women",
        tag: "Vol. 04"
    }
];

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            
            {/* HERO CAMPAIGN */}
            <section className="relative h-[90vh] md:h-screen w-full flex flex-col justify-end bg-[#0a0a0a] pb-12 md:pb-24 px-6 md:px-12 overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/assets/generated/collections-hero.png"
                        alt="Fashionista Collections Campaign"
                        fill
                        className="object-cover opacity-90 scale-105"
                        priority
                    />
                </div>
                {/* Vignette & Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/10 to-transparent" />
                
                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <h1 className="text-7xl md:text-[10vw] font-serif font-black uppercase text-white tracking-tighter leading-[0.85] mix-blend-overlay">
                            Curated <br/> <span className="italic font-light">Editions.</span>
                        </h1>
                    </motion.div>
                    
                    <motion.p 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}
                        className="max-w-xl text-white/70 text-lg md:text-xl font-light leading-relaxed mt-8 mix-blend-plus-lighter"
                    >
                        Explore our exclusively selected sets, defining the trends of tomorrow with timeless, unapologetic aesthetics.
                    </motion.p>
                </div>
            </section>

            {/* BENTO GRID COLLECTIONS */}
            <section className="py-24 md:py-32 px-4 md:px-8 max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[400px] md:auto-rows-[450px]">
                    {collections.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`group relative overflow-hidden rounded-[2rem] bg-black/5 dark:bg-white/5 ${item.cName}`}
                        >
                            <Link href={item.link} className="absolute inset-0 w-full h-full block">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 opacity-60 group-hover:opacity-80" />
                                
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <span className="bg-black/30 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full">
                                            {item.tag}
                                        </span>
                                        <span className="bg-white text-black p-3 rounded-full opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                                            <ArrowUpRight size={20} strokeWidth={2.5}/>
                                        </span>
                                    </div>
                                    
                                    <div>
                                        <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-3 leading-tight tracking-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-white/70 text-lg md:text-xl font-light transform translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* MINIMAL NEWSLETTER */}
            <section className="py-24 md:py-40 bg-black text-white px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter mb-8">
                            Never Miss a <span className="italic text-white/50">Drop.</span>
                        </h2>
                        <p className="text-white/60 mb-12 text-lg md:text-xl font-light">
                            Subscribe to the inner circle and receive early access to new collections, exclusive editorials, and private sales.
                        </p>
                        
                        <form className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto relative group">
                            <input
                                type="email"
                                placeholder="Your private email address"
                                className="w-full bg-transparent border-b border-white/20 px-4 py-5 text-center sm:text-left focus:outline-none focus:border-white transition-colors text-lg placeholder:text-white/30"
                                required
                            />
                            <button 
                                type="button"
                                className="mt-6 sm:mt-0 sm:absolute sm:right-0 sm:bottom-0 sm:p-5 uppercase text-[10px] font-bold tracking-[0.2em] text-white hover:text-white/60 transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
