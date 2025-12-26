'use client';
import Link from 'next/link';
import React from 'react';
import { Facebook, Instagram, Twitter, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden w-full py-16">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 z-10 w-full">

        {/* Brand & Newsletter */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          <h2 className="text-3xl font-serif font-bold tracking-tighter uppercase">
            Fashion<span className="text-destructive">ista</span>
          </h2>
          <p className="text-sm text-muted max-w-sm leading-relaxed">
            Discover the latest in fashion and lifestyle. Elevate your style with our curated collections.
          </p>

          <div className="mt-3 flex max-w-sm">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-background/10 border border-background/20 px-4 py-3 text-sm text-background placeholder-background/50 outline-none rounded-l-md focus:border-background/50 transition"
            />
            <button className="bg-background text-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-r-md hover:bg-background/90 transition">
              Subscribe
            </button>
          </div>
          <span className="text-xs text-muted/80">Get 10% off your first order 🎁</span>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Shop</h3>
          <ul className="space-y-3 text-sm text-muted">
            {["Men", "Women", "Kids", "Shoes", "Accessories"].map((item) => (
              <li key={item}>
                <Link href={`/Shop`} className="hover:text-background transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Company</h3>
          <ul className="space-y-3 text-sm text-muted">
            {["About", "Careers", "Blog", "Sustainability"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="hover:text-background transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Support</h3>
          <ul className="space-y-3 text-sm text-muted">
            {["FAQ", "Shipping", "Returns", "Contact"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase()}`} className="hover:text-background transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-4">
          <Link href="#" className="p-2 rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-colors">
            <Facebook className="w-5 h-5" />
          </Link>
          <Link href="#" className="p-2 rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-colors">
            <Instagram className="w-5 h-5" />
          </Link>
          <Link href="#" className="p-2 rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-colors">
            <Twitter className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Fashionista. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
