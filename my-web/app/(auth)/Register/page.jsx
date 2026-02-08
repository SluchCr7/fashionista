'use client';
import { UserContext } from '@/app/Context/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { ArrowRight, Lock, Mail, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/lib/toast';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { Register } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.warning("🛎️ Please complete all required profile details to proceed.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warning("📧 Please provide a valid email address to proceed.");
      return;
    }

    if (password.length < 6) {
      toast.warning("🔒 For your security, passwords must be at least 6 characters.");
      return;
    }

    setLoading(true);
    // UserContext expects: (name, email, password)
    await Register(name, email, password);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">

      {/* Form Side - Left on large screens */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 relative bg-white dark:bg-black">
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center md:text-left mb-10">
            <Link href="/" className="inline-block mb-10 group">
              <h1 className="text-3xl font-serif font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">Fashion<span className="text-primary group-hover:text-foreground">ista</span></h1>
            </Link>
            <h2 className="text-4xl font-serif font-bold mb-3 text-foreground">Join the Elite</h2>
            <p className="text-muted-foreground text-lg">Create your account to unlock exclusive access.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-12 pr-12 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-6"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Create Account <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-muted-foreground">
              Already a member?{" "}
              <Link href="/Login" className="text-primary font-bold hover:underline underline-offset-4 decoration-2">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Visual Side - Right on large screens */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:block w-1/2 relative bg-secondary/10"
      >
        <Image
          src="/Hero/women-1.jpg"
          alt="Register Visual"
          fill
          className="object-cover mix-blend-multiply opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-16 text-white text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-5xl font-serif font-bold mb-6 leading-tight">Define Your<br />Signature Style.</h2>
            <p className="text-xl font-light opacity-90 ml-auto max-w-md">Be the first to access new drops, exclusive events, and personalized styling.</p>
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
};

export default Register;
