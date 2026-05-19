'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import CountUp from 'react-countup';
import { motion, useScroll, useTransform } from 'framer-motion';
import { stats } from '@/app/Data';
import { Leaf, Users, Star, Lightbulb, HandHeart, Globe2, ArrowDownRight } from "lucide-react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div ref={containerRef} className="bg-white dark:bg-[#0a0a0a] text-black dark:text-white min-h-screen selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[100dvh] md:h-[110vh] overflow-hidden bg-[#0a0a0a]">
        <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/assets/generated/about-hero.png"
            alt="Fashionista Editorial Campaign"
            fill
            className="object-cover opacity-80"
            priority
            quality={100}
          />
        </motion.div>
        
        {/* Soft elegant gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/30" />
        
        <div className="absolute bottom-20 md:bottom-32 left-6 md:left-16 lg:left-24 right-6 text-white z-10 p-0 m-0">
          <motion.div 
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-black tracking-tighter leading-[0.85] uppercase mb-6 mix-blend-overlay">
              The <br/> Atelier.
            </h1>
          </motion.div>
          
          <motion.div 
            variants={fadeUp} initial="hidden" animate="visible"
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 max-w-7xl"
          >
            <p className="text-xl md:text-2xl font-light tracking-wide max-w-2xl leading-relaxed opacity-90 mix-blend-plus-lighter">
              Where timeless elegance meets sustainable innovation. We craft more than just clothing; we design confidence for the modern era.
            </p>
            <div className="flex items-center gap-4 text-sm font-bold tracking-[0.2em] uppercase">
              <span className="w-12 h-px bg-white/50" />
              Est. 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* CORE PHILOSOPHY / INTRO */}
      <section className="py-32 md:py-48 px-6 md:px-16 container mx-auto max-w-7xl relative z-20 bg-white dark:bg-[#0a0a0a]">
        <motion.h2 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
          variants={fadeUp}
          className="text-4xl md:text-5xl lg:text-7xl font-serif font-black leading-[1.1] tracking-[-0.03em] max-w-4xl"
        >
          We are more than a fashion brand; we are a <span className="italic text-black/40 dark:text-white/40">collective of dreamers</span> and innovators.
        </motion.h2>
        
        <div className="mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-5 md:pr-10">
            <h3 className="text-sm font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-black dark:bg-white" />
              Our Story
            </h3>
            <p className="text-lg text-black/60 dark:text-white/60 leading-relaxed mb-8">
              Founded on the belief that luxury should be accessible and ethical, every stitch tells a story of dedication. From our atelier to your wardrobe, we ensure uncompromising quality.
            </p>
            <p className="text-lg text-black/60 dark:text-white/60 leading-relaxed">
              Our global community trusts us not just for how they look, but for how they feel in our creations. Our vision extends beyond seasons; we aim to redefine the cultural dialogue around sustainability and aesthetic expression.
            </p>
          </div>
          
          <div className="lg:col-span-6 lg:col-start-7 lg:pl-10 grid grid-cols-2 gap-8 md:gap-16 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-10 md:pt-0 md:pl-10">
            {stats.map((ele, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-serif font-black mb-4">
                  <CountUp end={ele.num} duration={2.5} />+
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 border-t border-black/10 dark:border-white/10 pt-4">
                  {ele.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES PARALLAX IMAGERY */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tight leading-none">
              The Codes <br/>of <span className="italic text-white/50">Creation</span>.
            </h2>
            <p className="max-w-xs text-sm text-white/60 uppercase tracking-widest font-bold leading-relaxed">
              Guided by principles that prioritize the planet and the people.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[
              { icon: <Leaf strokeWidth={1.5} size={32} />, title: "Sustainability", text: "Committed to eco-friendly materials and ethical manufacturing practices that honor our planet." },
              { icon: <Star strokeWidth={1.5} size={32} />, title: "Excellence", text: "Excellence isn't an act, it's a habit. Every garment undergoes rigorous quality checks before reaching you." },
              { icon: <Users strokeWidth={1.5} size={32} />, title: "Client First", text: "Your satisfaction is our north star. We design with your needs, comfort, and ultimate desires in mind." },
              { icon: <Lightbulb strokeWidth={1.5} size={32} />, title: "Innovation", text: "Staying ahead of trends while maintaining a timeless appeal through highly creative and bold design." },
              { icon: <HandHeart strokeWidth={1.5} size={32} />, title: "Community", text: "Building meaningful connections and supporting local artisans and creators in every region we operate." },
              { icon: <Globe2 strokeWidth={1.5} size={32} />, title: "Global Scale", text: "Bringing premium fashion to doorsteps worldwide, seamlessly bridging diverse cultures through style." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.1 } } }}
                className="group border-t border-white/20 pt-8"
              >
                <div className="mb-8 text-white/50 group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                <p className="text-white/60 leading-relaxed font-light">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / MANIFESTO ENDING */}
      <section className="py-32 md:py-48 px-6 container mx-auto max-w-7xl flex flex-col items-center justify-center text-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl"
        >
          <div className="w-16 h-16 rounded-full border border-black dark:border-white mx-auto flex items-center justify-center mb-12">
            <ArrowDownRight size={24} />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-black tracking-[-0.03em] leading-tight mb-8">
            Step into a world of unbridled <span className="italic">sophistication</span>.
          </h2>
          <p className="text-xl text-black/60 dark:text-white/60 mb-16 font-light max-w-2xl mx-auto">
            Your journey to exceptional fashion begins here. Join the movement and redefine your aesthetic permanently.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a 
              href="/Shop"
              className="inline-flex items-center justify-center px-12 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
            >
              Enter Collection
            </a>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
