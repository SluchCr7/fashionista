'use client';
import Link from 'next/link';
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    Maison: [
      { name: "Our Heritage", link: "/About" },
      { name: "Sustainability", link: "/Sustainability" },
      { name: "Archive", link: "/Shop" },
      { name: "Careers", link: "/Careers" },
    ],
    Services: [
      { name: "Concierge", link: "/Contact" },
      { name: "Logistics", link: "/Shipping" },
      { name: "Private Viewings", link: "/Contact" },
      { name: "Gift Curation", link: "/GiftGuide" },
    ],
    Legal: [
      { name: "Privacy Protocol", link: "/Privacy" },
      { name: "Terms of Engagement", link: "/Terms" },
      { name: "Intellectual Property", link: "/Terms" },
    ]
  };

  return (
    <footer className="bg-background border-t border-border/5 text-foreground pt-32 pb-16 relative overflow-hidden">
      {/* Massive Brand Watermark */}
      <div className="absolute -bottom-24 left-0 w-full text-center pointer-events-none select-none opacity-[0.02] dark:opacity-[0.05]">
        <h2 className="text-[20vw] font-serif font-black leading-none tracking-tighter uppercase">FASHIONISTA</h2>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
          {/* Brand & Newsletter */}
          <div className="md:col-span-5 space-y-12">
            <div className="space-y-4">
              <Link href="/">
                <h2 className="text-4xl font-serif font-black tracking-tighter italic">FASHIONISTA.</h2>
              </Link>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm uppercase tracking-widest !text-[10px]">
                Defining the intersection of avant-garde design and timeless craftsmanship since 2025.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-border/10 max-w-sm">
              <p className="typography-display !text-accent">Maison Updates</p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="CONSULT YOUR EMAIL"
                  className="w-full bg-transparent border-b border-border/20 py-4 text-[10px] font-black uppercase tracking-[0.3em] outline-none focus:border-accent transition-all placeholder:text-muted-foreground/30"
                />
                <button className="absolute right-0 bottom-4 typography-display hover:text-accent transition-colors">Join</button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-8">
                <h3 className="typography-display !text-muted-foreground">{category}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.link}
                        className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-accent transition-all inline-block"
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

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="typography-display !text-[8px] text-muted-foreground">
            &copy; {new Date().getFullYear()} FASHIONISTA MAISON. ALL PRIVILEGES RESERVED.
          </p>

          <div className="flex items-center gap-12">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <Link key={i} href="#" className="text-muted-foreground hover:text-accent transition-all">
                <Icon size={16} strokeWidth={1} />
              </Link>
            ))}
          </div>

          <div className="typography-display !text-[8px] text-muted-foreground space-x-8">
            <Link href="/Privacy" className="hover:text-accent transition-colors">PRIVACY POLICY</Link>
            <Link href="/Terms" className="hover:text-accent transition-colors">TERMS & CONDITIONS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
