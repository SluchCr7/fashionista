'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ClothesGender from '@/app/Components/ClothesGender'
import { ArrowRight } from 'lucide-react'

export default function KidsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
            
            {/* CINEMATIC HERO */}
            <section className="relative w-full h-[90vh] md:h-screen flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden bg-[#0a0a0a]">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=2070&auto=format&fit=crop"
                        alt="Kids Fashion Campaign" fill unoptimized priority
                        className="object-cover opacity-80"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                
                <div className="relative z-10 max-w-[1600px] mx-auto w-full">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
                        <h1 className="text-7xl md:text-[10rem] font-serif font-black uppercase text-white tracking-tighter leading-[0.85] mix-blend-overlay">
                            Petit <br/> <span className="italic font-light">Atelier.</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* CURATED CATEGORIES */}
            <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-black/10 dark:border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight uppercase">Youth <span className="italic text-black/40 dark:text-white/40">Silhouettes</span>.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'The Essentials', link: '/Shop?gender=Kids&category=Casual', img: 'https://images.unsplash.com/photo-1519238396525-4523ad6c3fce?q=80&w=1974&auto=format&fit=crop' },
                        { title: 'Active Wear', link: '/Shop?gender=Kids&category=Sport', img: 'https://images.unsplash.com/photo-1471286174890-9c112ca3d0ce?q=80&w=2069&auto=format&fit=crop' },
                        { title: 'Occasions', link: '/Shop?gender=Kids&category=Dresses', img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=2028&auto=format&fit=crop' }
                    ].map((cat, idx) => (
                        <motion.div
                            key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group relative aspect-[3/4] overflow-hidden bg-black/5 dark:bg-white/5"
                        >
                            <Link href={cat.link} className="absolute inset-0 block">
                                <Image src={cat.img} alt={cat.title} fill unoptimized className="object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                                
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                    <h3 className="text-3xl font-serif font-black tracking-tighter mb-2">{cat.title}</h3>
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/50 flex items-center gap-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                        Explore <ArrowRight size={12} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CURATED COLLECTION */}
            <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-baseline mb-16 border-b border-black/10 dark:border-white/10 pb-6">
                    <h2 className="text-sm font-bold tracking-widest uppercase">The Archive</h2>
                    <Link href="/Shop?gender=Kids" className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">View All</Link>
                </div>
                <div className="w-full">
                    <ClothesGender gender={"kid"} title={""} Para={""} />
                </div>
            </section>
        </div>
    )
}