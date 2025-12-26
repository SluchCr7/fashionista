'use client';
import Notify from '@/app/Components/Notify';
import { UserContext } from '@/app/Context/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { Login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setMessage("Please enter email and password");
      setTimeout(() => setMessage(""), 3000);
    } else {
      try {
        setLoading(true);
        await Login(email, password);
      } catch (err) {
        setMessage("Invalid credentials");
        setTimeout(() => setMessage(""), 3000);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Notify Notify={message} />
      <div className="flex min-h-screen bg-background text-foreground">

        {/* Image Side */}
        <div className="hidden lg:block w-1/2 relative bg-secondary/20">
          <Image
            src="/Hero/HeroWomen.jpg" // Using an existing image
            alt="Login Visual"
            fill
            className="object-cover mix-blend-multiply opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-20 text-white">
            <h2 className="text-4xl font-serif font-bold mb-4">Welcome Back</h2>
            <p className="text-lg opacity-80">Sign in to access your curated fashion feed and exclusive offers.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md space-y-10">
            <div className="text-center">
              <Link href="/" className="inline-block mb-8">
                <h1 className="text-3xl font-serif font-bold tracking-tighter uppercase">Fashion<span className="text-primary">ista</span></h1>
              </Link>
              <h2 className="text-2xl font-bold mb-2">Login to your account</h2>
              <p className="text-muted-foreground">Enter your details below to continue.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                  <Link href="/Forgot" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing In..." : <>Login <ArrowRight size={18} /></>}
              </button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/Register" className="text-primary font-bold hover:underline">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
