'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/app/Data';
import Image from 'next/image';

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500 flex flex-col pt-32 pb-24">
            
            <div className="container mx-auto max-w-[1600px] px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
                
                {/* LEFT PORTRAIT & TITLE */}
                <div className="lg:w-[40%] flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/50 dark:text-white/50 mb-6 block">Client Services</span>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-8xl font-serif font-black tracking-tighter uppercase leading-[0.9] mb-12">
                            Common <br/> <span className="italic text-black/30 dark:text-white/30">Inquiries.</span>
                        </motion.h1>
                        
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-lg md:text-xl font-light text-black/60 dark:text-white/60 leading-relaxed max-w-sm mb-12">
                            Find detailed information regarding orders, shipping, returns, and our commitment to uncompromising quality.
                        </motion.p>
                    </div>

                    <div className="hidden lg:block relative w-full aspect-[3/4] overflow-hidden bg-black/5 dark:bg-white/5">
                        <Image src="/assets/generated/collections-hero.png" alt="Fashionista FAQs" fill className="object-cover mix-blend-multiply dark:mix-blend-normal opacity-90" />
                    </div>
                </div>

                {/* RIGHT ACCORDIONS */}
                <div className="lg:w-[60%] lg:pt-32">
                    {faqs.map((section, secIndex) => (
                        <div key={secIndex} className="mb-20">
                            <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-10 pb-4 border-b border-black/20 dark:border-white/20 text-black/60 dark:text-white/60">
                                {section.category}
                            </h2>

                            <div className="space-y-2">
                                {section.items.map((faq, i) => {
                                    const index = `${secIndex}-${i}`;
                                    const isOpen = openIndex === index;
                                    return (
                                        <div key={index} className="border-b border-black/10 dark:border-white/10 group">
                                            <button
                                                onClick={() => toggleFAQ(index)}
                                                className="w-full flex justify-between items-center py-8 text-left focus:outline-none"
                                            >
                                                <span className={`text-2xl md:text-3xl font-serif tracking-tight pr-8 transition-colors ${isOpen ? 'italic font-black text-black dark:text-white' : 'text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white'}`}>
                                                    {faq.question}
                                                </span>
                                                <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
                                                    <div className={`absolute w-full h-[2px] bg-black dark:bg-white transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                                    <div className={`absolute w-[2px] h-full bg-black dark:bg-white transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="pb-10 pt-2 text-lg font-light text-black/60 dark:text-white/60 leading-relaxed max-w-3xl">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="mt-24 p-12 bg-black/5 dark:bg-white/5 text-center">
                        <h3 className="text-3xl font-serif font-black mb-4">Still need assistance?</h3>
                        <p className="text-black/60 dark:text-white/60 mb-8 max-w-md mx-auto">Our dedicated client advisors are available to assist you with any inquiries.</p>
                        <a href="/Contact" className="inline-block border-b-2 border-black dark:border-white pb-1 text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                            Contact Us
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
