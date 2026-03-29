'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ClothesGender from '@/app/Components/ClothesGender'
import { ArrowRight } from 'lucide-react'

export default function MenPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
            
            {/* CINEMATIC HERO */}
            <section className="relative w-full h-[90vh] md:h-screen flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden bg-[#0a0a0a]">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop"
                        alt="Mens Fashion Campaign" fill unoptimized priority
                        className="object-cover opacity-80"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/20" />
                
                <div className="relative z-10 max-w-[1600px] mx-auto w-full">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
                        <h1 className="text-7xl md:text-[10rem] font-serif font-black uppercase text-white tracking-tighter leading-[0.85] mix-blend-overlay">
                            Mens <br/> <span className="italic font-light">Atelier.</span>
                        </h1>
                    </motion.div>
                </div>
            </section>

            {/* CURATED CATEGORIES */}
            <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-black/10 dark:border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight uppercase">The <span className="italic text-black/40 dark:text-white/40">Silhouettes</span>.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: 'Tailoring', link: '/Shop?gender=Men&category=Formal', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1780&auto=format&fit=crop' },
                        { title: 'Essentials', link: '/Shop?gender=Men&category=Casual', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop' },
                        { title: 'Leather', link: '/Shop?gender=Men&category=Accessories', img: 'https://images.unsplash.com/photo-1485218126466-34e6392ec754?q=80&w=2071&auto=format&fit=crop' }
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

            {/* CURATED COLLECTION (Reusing the Component) */}
            <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
                <div className="flex justify-between items-baseline mb-16 border-b border-black/10 dark:border-white/10 pb-6">
                    <h2 className="text-sm font-bold tracking-widest uppercase">The Archive</h2>
                    <Link href="/Shop?gender=Men" className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">View All</Link>
                </div>
                
                {/* 
                  Note: The underlying ClothesGender component relies on standard padding and a specific structure. 
                  We integrate it naturally here.
                */}
                <div className="w-full">
                    <ClothesGender gender={"men"} title={""} Para={""} />
                </div>
            </section>
        </div>
    )
}
