'use client';
import Image from 'next/image';
import React from 'react';
import { ArrowRight, MoveDown } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HomePage = () => {
  const collections = [
    {
      id: 1,
      title: "The Noir\nCollection",
      subtitle: "Winter 2024",
      image: "/Hero/men-1.jpg",
      link: "/Men",
      description: "A convergence of midnight tones and structured tailoring.",
      align: "left"
    },
    {
      id: 2,
      title: "Essential\nSilhouettes",
      subtitle: "The Core Series",
      image: "/Hero/women-1.jpg",
      link: "/Women",
      description: "Timeless pieces redefined for the modern minimalist.",
      align: "right"
    }
  ];

  return (
    <div className="bg-background">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Hero/HeroWomen.jpg"
            fill
            className="object-cover opacity-60 scale-105 animate-reveal"
            alt="Hero Background"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        <div className="container relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="typography-display text-white mb-6"
          >
            Spring / Summer 2024
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-9xl text-white font-serif italic font-light tracking-tight mb-12 drop-shadow-2xl"
          >
            The Art of <br /> <span className="not-italic font-bold">Presentation.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Link href="/Shop" className="button-luxury">
              Discover Selection
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center text-white/40 gap-4"
        >
          <span className="typography-display text-[8px]">Scroll to explore</span>
          <MoveDown size={14} />
        </motion.div>
      </section>

      {/* Editorial Content Grid */}
      <section className="py-32 px-4 md:px-0">
        <div className="container mx-auto">
          {collections.map((item, index) => (
            <div 
              key={item.id}
              className={`flex flex-col md:flex-row items-center gap-16 mb-44 ${
                item.align === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="w-full md:w-1/2 relative aspect-[3/4] overflow-hidden rounded-sm group shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
              >
                <Image
                  src={item.image}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </motion.div>

              <div className="w-full md:w-1/3 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: item.align === 'left' ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <p className="typography-display mb-4">{item.subtitle}</p>
                  <h2 className="text-5xl font-serif font-bold whitespace-pre-line mb-8 leading-[1]">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground text-lg font-medium leading-relaxed mb-12 max-w-sm">
                    {item.description}
                  </p>
                  <Link 
                    href={item.link} 
                    className="group inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] transition-all hover:gap-6"
                  >
                    View Selection
                    <ArrowRight size={16} className="text-accent" />
                  </Link>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Luxury Promo Section */}
      <section className="bg-primary text-primary-foreground py-44 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full mix-blend-overlay opacity-30">
          <Image src="/Hero/special-4.jpg" fill className="object-cover" alt="Decorative" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-12"
          >
            <h2 className="text-5xl md:text-7xl font-serif italic leading-none">
              A commitment to <br /> <span className="not-italic font-bold">Pure Craftsmanship.</span>
            </h2>
            <p className="text-primary-foreground/60 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto">
              Every piece in our selection is a testament to the pursuit of aesthetic perfection and enduring quality.
            </p>
            <Link href="/About" className="inline-block border-b border-white pb-2 text-[10px] font-bold uppercase tracking-[0.4em] hover:text-accent hover:border-accent transition-all">
              The Philosophy
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;