'use client';
import { AuthContext } from '@/app/Context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/lib/toast';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warning("Please provide your access credentials to continue.");
            return;
        }

        setLoading(true);
        await login(email, password);
        setLoading(false);
    }

    return (
        <div className="flex min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

            {/* Visual Side */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="hidden lg:block w-1/2 relative bg-[#0a0a0a]">
                <Image
                    src="https://images.unsplash.com/photo-1542295669297-4d352b042bce?q=80&w=2070&auto=format&fit=crop"
                    alt="Login Editorial Visual"
                    fill priority unoptimized
                    className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-20 text-white">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                        <h2 className="text-6xl font-serif font-black mb-6 leading-[0.9] tracking-tighter uppercase">Resume <br/><span className="italic text-white/50">Journey.</span></h2>
                        <p className="text-xl font-light opacity-90 max-w-sm">Access your curated profile and private collections.</p>
                    </motion.div>
                </div>
            </motion.div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 relative">
                <div className="w-full max-w-[400px] relative z-10">
                    <div className="mb-16">
                        <Link href="/" className="inline-block mb-12">
                            <h1 className="text-2xl font-serif font-black tracking-widest uppercase hover:italic transition-all">Fashionista.</h1>
                        </Link>
                        <h2 className="text-4xl font-serif font-black mb-4 uppercase tracking-tighter">Sign In</h2>
                        <p className="text-black/50 dark:text-white/50 font-light">Enter your private credentials below.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-12">
                        
                        <div className="relative group">
                            <input
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent"
                                placeholder="Email Address" id="login-email"
                            />
                            <label htmlFor="login-email" className="absolute left-0 top-3 text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Email Address</label>
                        </div>

                        <div className="relative group">
                            <div className="absolute right-0 -top-6">
                                <Link href="/Forgot" className="text-[10px] font-bold uppercase tracking-widest hover:italic transition-all opacity-50 hover:opacity-100">Recover</Link>
                            </div>
                            <input
                                type="password" value={password} onChange={(e) => setPass(e.target.value)} required
                                className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent"
                                placeholder="Password" id="login-password"
                            />
                            <label htmlFor="login-password" className="absolute left-0 top-3 text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all pointer-events-none">Password</label>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-black text-white dark:bg-white dark:text-black py-5 uppercase font-bold text-xs tracking-widest hover:opacity-80 transition-opacity flex items-center justify-between px-8 disabled:opacity-50 mt-8"
                        >
                            <span>{loading ? "Authenticating" : "Access Account"}</span>
                            {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10 text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">
                        New Member?{" "}
                        <Link href="/Register" className="text-black dark:text-white border-b border-black dark:border-white pb-1 ml-4 hover:opacity-50 transition-opacity">
                            Apply
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
