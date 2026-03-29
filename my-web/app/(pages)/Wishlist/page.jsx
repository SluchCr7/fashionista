'use client';
import { AuthContext } from '@/app/Context/AuthContext';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

export default function WishlistPage() {
    const { user, toggleFavorite } = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?._id) {
                setLoading(true);
                try {
                    const res = await api.get(`/api/auth/${user._id}`);
                    setMyProducts(res.data?.user?.favorites || res.data?.favorites || []);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [user]);

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }, exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } } };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pt-32 pb-24 transition-colors duration-500">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                
                {/* HERO HEADER */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 border-b border-black/10 dark:border-white/10 pb-16">
                    <div>
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/50 dark:text-white/50 mb-6 block">Private Vault</span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-black tracking-tighter uppercase leading-none">
                            Wishlist<span className="text-black/20 dark:text-white/20">.</span>
                        </h1>
                    </div>
                    <div className="md:text-right">
                        <p className="text-4xl font-serif italic text-black/40 dark:text-white/40">{loading ? '-' : myProducts.length}</p>
                        <p className="text-[10px] font-bold tracking-widest uppercase mt-2">Saved Objects</p>
                    </div>
                </motion.div>

                {/* CONTENT AREA */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-16">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[3/4] bg-black/5 dark:bg-white/5 mb-6" />
                                <div className="h-4 bg-black/5 dark:bg-white/5 w-2/3 mb-3" />
                                <div className="h-4 bg-black/5 dark:bg-white/5 w-1/3" />
                            </div>
                        ))}
                    </div>
                ) : myProducts.length > 0 ? (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-16">
                        <AnimatePresence>
                            {myProducts.map(product => (
                                <motion.div layout variants={itemVariants} key={product._id} className="group flex flex-col">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-black/5 dark:bg-white/5 mb-6">
                                        <Link href={`/product/${product._id}`} className="absolute inset-0 block">
                                            <Image src={product.Photo[0]?.url || '/placeholder.png'} alt={product.name} fill className="object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                                        </Link>
                                        
                                        <button onClick={() => toggleFavorite(product._id)} className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                            <X size={16} className="text-black dark:text-white" />
                                        </button>
                                        
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />
                                    </div>

                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-serif font-bold text-xl tracking-tight leading-tight mb-2 group-hover:underline underline-offset-4">{product.name}</h3>
                                            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40">{product.brand || 'Atelier'} / {product.category}</p>
                                        </div>
                                        <span className="font-bold text-lg">${product.price}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-32 text-center max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter mb-6">Nothing here yet.</h2>
                        <p className="text-black/50 dark:text-white/50 text-lg font-light leading-relaxed mb-12">
                            Your curation is currently empty. Explore our archives to construct your personal collection of standout silhouettes and timeless staples.
                        </p>
                        <Link href="/Shop" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-2 hover:opacity-60 transition-opacity">
                            Explore Archive <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
