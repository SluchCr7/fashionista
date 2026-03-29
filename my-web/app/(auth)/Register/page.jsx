'use client';
import { AuthContext } from '@/app/Context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/lib/toast';

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return toast.warning("Please complete all required forms.");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return toast.warning("Please provide a valid email address.");
        if (password.length < 6) return toast.warning("Password must be at least 6 characters.");

        setLoading(true);
        await register({ name, email, password });
        setLoading(false);
    }

    return (
        <div className="flex min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

            {/* Form Side - Left on large screens */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative z-10">
                <div className="w-full max-w-[400px]">
                    <div className="mb-16">
                        <Link href="/" className="inline-block mb-12">
                            <h1 className="text-2xl font-serif font-black tracking-widest uppercase hover:italic transition-all">Fashionista.</h1>
                        </Link>
                        <h2 className="text-4xl font-serif font-black mb-4 uppercase tracking-tighter">Register</h2>
                        <p className="text-black/50 dark:text-white/50 font-light">Exclusive access to the archive.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-12">
                        
                        <div className="relative group">
                            <input
                                type="text" value={name} onChange={(e) => setName(e.target.value)} required
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent"
                                placeholder="Full Name" id="reg-name"
                            />
                            <label htmlFor="reg-name" className="absolute left-0 top-3 text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Full Name</label>
                        </div>

                        <div className="relative group">
                            <input
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent"
                                placeholder="Email Address" id="reg-email"
                            />
                            <label htmlFor="reg-email" className="absolute left-0 top-3 text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Email Address</label>
                        </div>

                        <div className="relative group">
                            <input
                                type="password" value={password} onChange={(e) => setPass(e.target.value)} required
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent"
                                placeholder="Password" id="reg-password"
                            />
                            <label htmlFor="reg-password" className="absolute left-0 top-3 text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Password</label>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-black text-white dark:bg-white dark:text-black py-5 uppercase font-bold text-xs tracking-widest hover:opacity-80 transition-opacity flex items-center justify-between px-8 disabled:opacity-50 mt-8"
                        >
                            <span>{loading ? "Transmitting" : "Join Atelier"}</span>
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">
                        Existing Member?{" "}
                        <Link href="/Login" className="text-black dark:text-white border-b border-black dark:border-white pb-1 ml-4 hover:opacity-50 transition-opacity">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Visual Side - Right on large screens */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="hidden lg:block w-1/2 relative bg-[#0a0a0a]">
                <Image
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                    alt="Register Editorial Visual"
                    fill priority unoptimized
                    className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-20 text-white text-right">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                        <h2 className="text-6xl font-serif font-black mb-6 leading-[0.9] tracking-tighter uppercase">Join <br/><span className="italic text-white/50">Circle.</span></h2>
                        <p className="text-xl font-light opacity-90 max-w-sm ml-auto">Unlock unbridled access to limited drops and private curation.</p>
                    </motion.div>
                </div>
            </motion.div>

        </div>
    );
}
