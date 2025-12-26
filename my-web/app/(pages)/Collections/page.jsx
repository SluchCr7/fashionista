'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const collections = [
    {
        id: 1,
        title: "Urban Streetwear",
        subtitle: "Bold looks for the concrete jungle",
        image: "/Hero/bg_men.jpg", // Reusing existing asset
        cName: "col-span-1 md:col-span-2 row-span-2",
        link: "/Shop?category=Men"
    },
    {
        id: 2,
        title: "Summer Breeze",
        subtitle: "Light, airy, and effortlessly chic",
        image: "/Hero/bg_shoes_wom.jpg", // Reusing existing asset
        cName: "col-span-1 md:col-span-1 row-span-1",
        link: "/Shop?category=Women"
    },
    {
        id: 3,
        title: "Sport & Active",
        subtitle: "Performance meets style",
        image: "/Hero/bg_men.jpg", // Fallback/Reuse
        cName: "col-span-1 md:col-span-1 row-span-1",
        link: "/Shop?category=Sport"
    },
    {
        id: 4,
        title: "Evening Elegance",
        subtitle: "Sophisticated attire for special nights",
        image: "/Hero/bg_shoes_wom.jpg", // Fallback/Reuse
        cName: "col-span-1 md:col-span-2 row-span-1",
        link: "/Shop?category=Women"
    }
];

const CollectionItem = ({ item, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative group overflow-hidden rounded-2xl ${item.cName} h-[400px] md:h-auto min-h-[300px]`}
        >
            <Link href={item.link} className="block h-full w-full">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-2 transform group-hover:translate-x-2 transition-transform duration-300"
                    >
                        {item.title}
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-200 text-lg md:text-xl transform group-hover:translate-x-2 transition-transform duration-300 delay-75"
                    >
                        {item.subtitle}
                    </motion.p>

                    <div className="mt-6 overflow-hidden">
                        <span className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            Shop Collection
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            {/* Hero */}
            <section className="relative py-20 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-400 to-gray-600">
                        Curated <br className="md:hidden" /> Editions
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl">
                        Explore our exclusively selected sets, defining the trends of tomorrow with timeless aesthetics.
                    </p>
                </motion.div>
            </section>

            {/* Grid */}
            <section className="max-w-[1600px] mx-auto px-4 md:px-8 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px] md:auto-rows-[400px]">
                    {collections.map((item, index) => (
                        <CollectionItem key={item.id} item={item} index={index} />
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 bg-white text-black px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Never Miss a Drop</h2>
                    <p className="text-gray-600 mb-8">Subscribe to get notified about new collections and exclusive offers.</p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-6 py-4 bg-gray-100 rounded-full w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <button className="px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
