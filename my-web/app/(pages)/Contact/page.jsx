'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            alert("Message Received. Our atelier will contact you shortly.");
            setSubmitting(false);
            setFormData({ name: "", phone: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            
            {/* HERO SECTION */}
            <section className="relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden bg-[#0a0a0a]">
                <div className="absolute inset-0">
                    <Image src="/assets/generated/about-hero.png" alt="Contact Atelier" fill className="object-cover opacity-70 mix-blend-screen scale-105" priority />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
                
                <div className="relative z-10 max-w-[1600px] mx-auto w-full">
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-6 block">Concierge</span>
                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} className="text-6xl md:text-9xl font-serif font-black uppercase tracking-tighter text-white leading-[0.85] mix-blend-overlay">
                        Get in <br/> <span className="italic text-white/50">Touch.</span>
                    </motion.h1>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-24 md:py-32 container mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                
                {/* LEFT INFO */}
                <div className="flex flex-col justify-between order-2 lg:order-1 border-t border-black/10 dark:border-white/10 pt-12 lg:border-none lg:pt-0">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-serif font-black mb-12">The <span className="italic text-black/40 dark:text-white/40">Atelier.</span></h2>
                        
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/50 dark:text-white/50 mb-4">Location</h3>
                                <p className="text-xl md:text-2xl font-light leading-relaxed">Fashionista Headquarters<br/>15th Avenue of Elegance<br/>New York, NY 10011</p>
                            </div>
                            
                            <div>
                                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/50 dark:text-white/50 mb-4">Inquiries</h3>
                                <p className="text-xl md:text-2xl font-light leading-relaxed">
                                    <a href="mailto:concierge@fashionista.com" className="hover:italic transition-all">concierge@fashionista.com</a><br/>
                                    <a href="tel:+12125550198" className="hover:italic transition-all">+1 (212) 555-0198</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-20">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/50 dark:text-white/50 mb-6">Connect</h3>
                        <div className="flex gap-8 text-sm font-bold uppercase tracking-widest">
                            {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                                <a key={social} href="#" className="border-b border-transparent hover:border-black dark:hover:border-white pb-1 transition-all">{social}</a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="order-1 lg:order-2">
                    <form onSubmit={handleSubmit} className="space-y-12 bg-black/5 dark:bg-white/5 p-8 md:p-16">
                        <h3 className="text-2xl font-serif font-black uppercase tracking-widest mb-12">Private Inquiry</h3>
                        
                        <div className="relative group">
                            <input
                                type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-lg placeholder-transparent"
                                placeholder="Full Name" id="name"
                            />
                            <label htmlFor="name" className="absolute left-0 top-4 text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Full Name</label>
                        </div>

                        <div className="relative group">
                            <input
                                type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-lg placeholder-transparent"
                                placeholder="Email Address" id="email"
                            />
                            <label htmlFor="email" className="absolute left-0 top-4 text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Email Address</label>
                        </div>

                        <div className="relative group">
                            <input
                                type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-lg placeholder-transparent"
                                placeholder="Phone Number" id="phone"
                            />
                            <label htmlFor="phone" className="absolute left-0 top-4 text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Phone (Optional)</label>
                        </div>

                        <div className="relative group pt-4">
                            <textarea
                                value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required rows={4}
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-4 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-lg placeholder-transparent resize-none"
                                placeholder="Your Message" id="message"
                            />
                            <label htmlFor="message" className="absolute left-0 -top-0 text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Inquiry Details</label>
                        </div>

                        <button
                            type="submit" disabled={submitting}
                            className="w-full bg-black text-white dark:bg-white dark:text-black py-6 text-xs font-bold uppercase tracking-widest flex items-center justify-between px-8 hover:opacity-80 transition-opacity disabled:opacity-50"
                        >
                            <span>{submitting ? 'Transmitting' : 'Send Message'}</span>
                            <ArrowRight size={16} />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
