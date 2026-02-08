'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-20 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-4xl relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* 404 Header */}
          <div className="relative inline-block mb-8">
            <motion.h1
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2
              }}
              className="text-[120px] md:text-[200px] font-black text-foreground/5 leading-none select-none"
            >
              404
            </motion.h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-3xl font-serif font-bold text-foreground border-b-2 border-primary pb-2"
              >
                Page Not Found
              </motion.div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed"
          >
            It seems the page you are looking for has been moved or doesn&apos;t exist.
            Perhaps it&apos;s out of season?
          </motion.p>

          {/* Action Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full"
          >
            <Link
              href="/"
              className="flex items-center justify-center gap-3 p-6 bg-primary text-primary-foreground rounded-2xl hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl group"
            >
              <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
            </Link>

            <Link
              href="/Shop"
              className="flex items-center justify-center gap-3 p-6 bg-card border border-border text-foreground rounded-2xl hover:bg-secondary/50 hover:scale-[1.03] transition-all group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-xs">New Collection</span>
            </Link>

            <Link
              href="/Shop"
              className="flex items-center justify-center gap-3 p-6 bg-card border border-border text-foreground rounded-2xl hover:bg-secondary/50 hover:scale-[1.03] transition-all group sm:col-span-2 md:col-span-1"
            >
              <Search className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-bold uppercase tracking-widest text-xs">Search Style</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-border flex flex-col items-center gap-4"
          >
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Need help? <Link href="/Contact" className="text-primary font-bold hover:underline">Contact Support</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}