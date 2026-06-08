'use client';
import { useAppDispatch } from '@/lib/redux/hooks';
import { registerUser } from '@/lib/redux/slices/authSlice';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/lib/toast';

function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return toast.warning("Please complete all required forms.");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return toast.warning("Please provide a valid email address.");
        if (password.length < 6) return toast.warning("Password must be at least 6 characters.");

        setLoading(true);
        try {
            await dispatch(registerUser({ name, email, password })).unwrap();
            // Redirect to login page and pre-fill email address on success
            router.push(`/Login?email=${encodeURIComponent(email)}`);
        } catch (error) {
            // Error handled in slice/toast
        }
        setLoading(false);
    }

    return (
        <div className="flex min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black relative w-full overflow-hidden">
            
            {/* Minimalist Floating Back to Home button */}
            <Link 
                href="/" 
                className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors group"
            >
                <ArrowRight size={14} className="transform rotate-180 group-hover:-translate-x-1.5 transition-transform" />
                Back to Maison
            </Link>

            {/* Shifting Ambient Glow and Form Container (Left Side on Register) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative bg-slate-50/10 dark:bg-[#070708]/30 backdrop-blur-md">
                
                {/* Glowing Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 dark:opacity-30">
                    <motion.div
                        animate={{
                            x: [0, -30, 50, 0],
                            y: [0, 40, -30, 0],
                            scale: [1, 0.8, 1.1, 1]
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, 40, -20, 0],
                            y: [0, -50, 30, 0],
                            scale: [1, 1.2, 0.9, 1]
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-3xl"
                    />
                </div>

                {/* Glass Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-[440px] relative z-10 bg-white/70 dark:bg-[#0a0a0b]/80 backdrop-blur-xl border border-black/5 dark:border-white/5 rounded-3xl p-8 sm:p-12 shadow-2xl"
                >
                    <div className="mb-12">
                        <Link href="/" className="inline-block mb-10">
                            <h1 className="text-xl font-serif font-black tracking-[0.15em] uppercase hover:italic transition-all">Fashionista.</h1>
                        </Link>
                        <h2 className="text-3xl font-serif font-black mb-3 uppercase tracking-tighter">Register</h2>
                        <p className="text-black/40 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest">Exclusive access to the archive.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-10">
                        
                        <div className="relative group">
                            <input
                                type="text" value={name} onChange={(e) => setName(e.target.value)} required
                                className="peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 text-sm focus:outline-none transition-colors placeholder-transparent text-black dark:text-white"
                                placeholder="Full Name" id="reg-name"
                            />
                            <label htmlFor="reg-name" className="absolute left-0 top-3 text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-accent dark:peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[9px] transition-all pointer-events-none">Full Name</label>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent peer-focus:w-full transition-all duration-500 ease-out" />
                        </div>

                        <div className="relative group">
                            <input
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                className="peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 text-sm focus:outline-none transition-colors placeholder-transparent text-black dark:text-white"
                                placeholder="Email Address" id="reg-email"
                            />
                            <label htmlFor="reg-email" className="absolute left-0 top-3 text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-accent dark:peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[9px] transition-all pointer-events-none">Email Address</label>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent peer-focus:w-full transition-all duration-500 ease-out" />
                        </div>

                        <div className="relative group">
                            <input
                                type="password" value={password} onChange={(e) => setPass(e.target.value)} required
                                className="peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 text-sm focus:outline-none transition-colors placeholder-transparent text-black dark:text-white"
                                placeholder="Password" id="reg-password"
                            />
                            <label htmlFor="reg-password" className="absolute left-0 top-3 text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-accent dark:peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[9px] transition-all pointer-events-none">Password</label>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent peer-focus:w-full transition-all duration-500 ease-out" />
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-black text-white dark:bg-white dark:text-black py-4 border border-transparent rounded-xl uppercase font-bold text-[10px] tracking-[0.25em] hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white transition-all duration-300 flex items-center justify-between px-8 disabled:opacity-50 mt-8"
                        >
                            <span>{loading ? "Transmitting" : "Join Atelier"}</span>
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="mt-12 pt-6 border-t border-black/5 dark:border-white/5 text-[9px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
                        Existing Member?{" "}
                        <Link href="/Login" className="text-black dark:text-white border-b border-black dark:border-white pb-0.5 ml-3 hover:text-accent dark:hover:text-accent hover:border-accent dark:hover:border-accent transition-colors">
                            Sign In
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Editorial Visual Campaign Side (Right Side) */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1.5 }} 
                className="hidden lg:block w-1/2 relative bg-[#0a0a0a]"
            >
                <Image
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                    alt="Register Editorial Visual"
                    fill priority unoptimized
                    className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-[3s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-20 text-white text-right">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-4 block">Maison Circle</span>
                        <h2 className="text-6xl font-serif font-black mb-6 leading-[0.9] tracking-tighter uppercase">Join <br/><span className="italic text-white/40">Circle.</span></h2>
                        <p className="text-sm font-medium uppercase tracking-widest opacity-80 max-w-sm ml-auto">Unlock unbridled access to limited drops and private curation.</p>
                    </motion.div>
                </div>
            </motion.div>

        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={24} /></div>}>
            <RegisterForm />
        </Suspense>
    );
}
