'use client';
import Link from 'next/link';
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    Shop: [
      { name: "New Arrivals", link: "/Shop?sort=new" },
      { name: "Best Sellers", link: "/Shop?sort=best" },
      { name: "Men's Collection", link: "/Men" },
      { name: "Women's Collection", link: "/Women" },
      { name: "Accessories", link: "/Shop/Accessories" },
    ],
    Company: [
      { name: "About Us", link: "/About" },
      { name: "Careers", link: "/Careers" },
      { name: "Sustainability", link: "/Sustainability" },
      { name: "Press", link: "/Press" },
    ],
    Support: [
      { name: "Help Center", link: "/FAQ" },
      { name: "Shipping & Returns", link: "/Shipping" },
      { name: "Size Guide", link: "/SizeGuide" },
      { name: "Contact Us", link: "/Contact" },
    ]
  };

  return (
    <footer className="bg-foreground text-background pt-24 pb-12 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-serif font-bold tracking-tighter">
                FASHION<span className="text-muted-foreground italic">ISTA</span>
              </h2>
            </Link>
            <p className="text-muted/80 leading-relaxed max-w-sm">
              Curating the finest in luxury fashion since 2025. We believe in style that speaks, quality that lasts, and a sustainable future for fashion.
            </p>

            {/* Newsletter */}
            <div className="pt-4">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Subscribe to our newsletter</h3>
              <div className="flex max-w-sm relative group">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-background/5 border-b border-background/20 py-3 pr-12 text-sm text-background placeholder-background/40 outline-none focus:border-background/60 transition-colors"
                />
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-background/60 group-hover:text-background transition-colors p-2"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-serif font-bold text-lg mb-6">{category}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.link}
                        className="text-muted/60 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted/40">
            &copy; {new Date().getFullYear()} Fashionista. All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-6">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="text-muted/60 hover:text-white transition-colors hover:scale-110 transform duration-200"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>

          <div className="flex gap-6 text-xs text-muted/40">
            <Link href="/Privacy" className="hover:text-muted/80 transition-colors">Privacy Policy</Link>
            <Link href="/Terms" className="hover:text-muted/80 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
