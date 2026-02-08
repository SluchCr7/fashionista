'use client';
import { UserContext } from '@/app/Context/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { ArrowRight, Lock, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/lib/toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const { Login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("🔑 Please provide your access credentials to continue.");
      return;
    }

    setLoading(true);
    // UserContext's Login function handles success/error toasts
    await Login(email, password);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">

      {/* Visual Side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:block w-1/2 relative bg-secondary/10"
      >
        <Image
          src="/Hero/HeroWomen.jpg"
          alt="Login Visual"
          fill
          className="object-cover mix-blend-multiply opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-5xl font-serif font-bold mb-6 leading-tight">Welcome Back,<br />Trendsetter.</h2>
            <p className="text-xl font-light opacity-90 max-w-md">Your personalized collection awaits. Continue your style journey with us.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center md:text-left">
            <Link href="/" className="inline-block mb-10 group">
              <h1 className="text-3xl font-serif font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">Fashion<span className="text-primary group-hover:text-foreground">ista</span></h1>
            </Link>
            <h2 className="text-3xl font-bold mb-3 text-foreground">Sign In</h2>
            <p className="text-muted-foreground text-lg">Enter your details to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors">Password</label>
                <Link href="/Forgot" className="text-xs font-semibold text-primary hover:underline underline-offset-4">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-xl pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground text-background py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Login <ArrowRight size={18} /></>}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-muted-foreground">
              Do not have an account?{" "}
              <Link href="/Register" className="text-primary font-bold hover:underline underline-offset-4 decoration-2">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
