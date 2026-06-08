'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, Suspense } from 'react';
import { ArrowRight, Loader2, MailCheck, FlaskConical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/lib/redux/hooks';
import { forgotPassword } from '@/lib/redux/slices/authSlice';
import { toast } from '@/lib/toast';

function ForgotForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [token, setToken] = useState("");
    const dispatch = useAppDispatch();

    const handleRecover = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.warning("Please specify your registered email address.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.warning("Please provide a valid email address.");
            return;
        }

        setLoading(true);
        try {
            const result = await dispatch(forgotPassword({ email })).unwrap();
            setToken(result.token || "");
            setSubmitted(true);
        } catch (err) {
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

            {/* Editorial Visual Campaign Side */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 1.5 }} 
                className="hidden lg:block w-1/2 relative bg-[#0a0a0a]"
            >
                <Image
                    src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2000&auto=format&fit=crop"
                    alt="Recovery Editorial Visual"
                    fill priority unoptimized
                    className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-[3s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-20 text-white">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-4 block">Archive Recovery</span>
                        <h2 className="text-6xl font-serif font-black mb-6 leading-[0.9] tracking-tighter uppercase">Restore <br/><span className="italic text-white/45">Credentials.</span></h2>
                        <p className="text-sm font-medium uppercase tracking-widest opacity-80 max-w-sm">Re-establish access to your private profile vault.</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Shifting Ambient Glow and Form Container */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20 relative bg-slate-50/10 dark:bg-[#070708]/30 backdrop-blur-md">
                
                {/* Glowing Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40 dark:opacity-30">
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
                        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent/20 blur-3xl"
                    />
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
                    {!submitted ? (
                        <>
                            <div className="mb-12">
                                <Link href="/" className="inline-block mb-10">
                                    <h1 className="text-xl font-serif font-black tracking-[0.15em] uppercase hover:italic transition-all">Fashionista.</h1>
                                </Link>
                                <h2 className="text-3xl font-serif font-black mb-3 uppercase tracking-tighter">Recover</h2>
                                <p className="text-black/40 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest">Restore access to your private curation archive.</p>
                            </div>

                            <form onSubmit={handleRecover} className="space-y-10">
                                
                                <div className="relative group">
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                        className="peer w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 text-sm focus:outline-none transition-colors placeholder-transparent text-black dark:text-white"
                                        placeholder="Email Address" id="forgot-email"
                                    />
                                    <label htmlFor="forgot-email" className="absolute left-0 top-3 text-[10px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-accent dark:peer-focus:text-accent peer-valid:-top-4 peer-valid:text-[9px] transition-all pointer-events-none">Email Address</label>
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent peer-focus:w-full transition-all duration-500 ease-out" />
                                </div>

                                <button
                                    type="submit" disabled={loading}
                                    className="w-full bg-black text-white dark:bg-white dark:text-black py-4 border border-transparent rounded-xl uppercase font-bold text-[10px] tracking-[0.25em] hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white transition-all duration-300 flex items-center justify-between px-8 disabled:opacity-50 mt-8"
                                >
                                    <span>{loading ? "Transmitting Protocol" : "Recover Account"}</span>
                                    {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
                                </button>
                            </form>
                        </>
                    ) : (
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center py-6 space-y-6"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4">
                                <MailCheck size={32} />
                            </div>
                            <h2 className="text-2xl font-serif font-black uppercase tracking-tighter">Instructions Dispatched</h2>
                            <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed max-w-sm mx-auto uppercase tracking-wider">
                                A private recovery transmission has been sent to your email address. Please consult your inbox to complete recovery.
                            </p>
                            
                            {/* Demo Mode Link */}
                            {token && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-2xl flex flex-col items-center gap-2"
                                >
                                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-accent">
                                        <FlaskConical size={12} /> Sandbox Demonstration Mode
                                    </div>
                                    <p className="text-[10px] text-muted-foreground leading-normal">
                                        Reset token generated. Bypass email delivery and reset password directly:
                                    </p>
                                    <Link 
                                        href={`/Reset?token=${token}`}
                                        className="text-xs font-black uppercase tracking-wider text-accent border-b border-accent pb-0.5 hover:opacity-60 transition-opacity"
                                    >
                                        Execute Reset Password
                                    </Link>
                                </motion.div>
                            )}
                            
                            <Link 
                                href="/Login" 
                                className="inline-block mt-8 px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black font-bold text-[9px] uppercase tracking-widest rounded-xl hover:bg-accent hover:text-white dark:hover:bg-accent dark:hover:text-white transition-colors"
                            >
                                Return to Sign In
                            </Link>
                        </motion.div>
                    )}

                    {!submitted && (
                        <div className="mt-12 pt-6 border-t border-black/5 dark:border-white/5 text-[9px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">
                            Remember credentials?{" "}
                            <Link href="/Login" className="text-black dark:text-white border-b border-black dark:border-white pb-0.5 ml-3 hover:text-accent dark:hover:text-accent hover:border-accent dark:hover:border-accent transition-colors">
                                Sign In
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default function ForgotPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={24} /></div>}>
            <ForgotForm />
        </Suspense>
    );
}
