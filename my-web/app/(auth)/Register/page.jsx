'use client';
import Notify from '@/app/Components/Notify';
import { UserContext } from '@/app/Context/UserContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { Register } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !name || !password) {
      setMessage("Please fill in all fields");
      return setTimeout(() => setMessage(""), 3000);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Enter a valid email address");
      return setTimeout(() => setMessage(""), 3000);
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return setTimeout(() => setMessage(""), 3000);
    }

    try {
      setLoading(true);
      await Register(email, name, password);
    } catch (err) {
      setMessage("Registration failed. Try again.");
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Notify Notify={message} />
      <div className="flex min-h-screen bg-background text-foreground">

        {/* Form Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md space-y-10">
            <div className="text-center">
              <Link href="/" className="inline-block mb-8">
                <h1 className="text-3xl font-serif font-bold tracking-tighter uppercase">Fashion<span className="text-primary">ista</span></h1>
              </Link>
              <h2 className="text-2xl font-bold mb-2">Create an account</h2>
              <p className="text-muted-foreground">Join us to get exclusive access and rewards.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="John Doe"
                />
              </div>

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

              <div className="space-y-2 relative">
                <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  className="w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : <>Sign Up <ArrowRight size={18} /></>}
              </button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/Login" className="text-primary font-bold hover:underline">Login</Link>
            </div>
          </div>
        </div>

        {/* Image Side - Order 0 on mobile? Hidden on mobile */}
        <div className="hidden lg:block w-1/2 relative bg-secondary/20 order-first lg:order-last">
          <Image
            src="/Hero/women-1.jpg" // Using an existing image
            alt="Register Visual"
            fill
            className="object-cover mix-blend-multiply opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-20 text-white">
            <h2 className="text-4xl font-serif font-bold mb-4">Join the Elite</h2>
            <p className="text-lg opacity-80">Be the first to know about new arrivals and special events.</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Register;
