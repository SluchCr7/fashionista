'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { stats } from '@/app/Data';
import {
  FaLeaf, FaUsers, FaStar, FaLightbulb,
  FaHandsHelping, FaGlobe
} from "react-icons/fa";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { loop: Infinity, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300 overflow-hidden">

      {/* 1. HERO SECTION - IMMERSIVE */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/Hero/h1_hero1.jpg.webp"
          alt="Fashion Hero"
          fill
          className="object-cover opacity-90 dark:opacity-60 transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-2xl"
          >
            Redefining <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">Luxury</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light tracking-wide"
          >
            Where timeless elegance meets sustainable innovation. We craft more than just clothing; we design confidence.
          </motion.p>
        </div>
      </section>

      {/* 2. WHO WE ARE - SPLIT LAYOUT */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative group"
          >
            <div className="relative aspect-[4/5] rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-2xl bg-secondary">
              <Image
                src="/assets/mens-collection.webp"
                alt="About Us"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary -z-10 rounded-full blur-3xl opacity-50" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 -z-10 rounded-full blur-3xl opacity-50" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 space-y-8"
          >
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Crafting a Legacy of <br /><span className="italic text-muted-foreground">Style & Substance</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are more than a fashion brand; we are a collective of dreamers and innovators.
              Founded on the belief that luxury should be accessible and ethical, every stitch tells a story of dedication.
            </p>
            <div className="grid grid-cols-2 gap-8 border-l-2 border-primary/30 pl-8 my-8">
              <div>
                <h3 className="text-3xl font-bold font-serif mb-1">20+</h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold font-serif mb-1">50k+</h3>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Happy Clients</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              From our atelier to your wardrobe, we ensure uncompromising quality.
              Our global community trusts us not just for how they look, but for how they feel in our creations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. STATISTICS - DARK BAND */}
      <section className="py-20 bg-secondary/30 border-y border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((ele, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center group cursor-default"
              >
                <CountUp
                  end={ele.num}
                  duration={2.5}
                  className="text-5xl md:text-6xl font-serif font-bold text-foreground group-hover:text-primary transition-colors"
                />
                <div className="w-12 h-1 bg-primary/50 mt-4 mb-3 rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{ele.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MISSION & VALUES - CARDS */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Our Core Philosophy</h2>
          <p className="text-muted-foreground text-lg">Guided by principles that prioritize the planet and the people.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            { icon: <FaLeaf />, title: "Sustainability", text: "Committed to eco-friendly materials and ethical manufacturing practices that honor our planet." },
            { icon: <FaStar />, title: "Uncompromising Quality", text: "Excellence isn't an act, it's a habit. Every garment undergoes rigorous quality checks." },
            { icon: <FaUsers />, title: "Customer Centric", text: "Your satisfaction is our north star. We design with your needs and desires in mind." },
            { icon: <FaLightbulb />, title: "Bold Innovation", text: "Staying ahead of trends while maintaining timeless appeal through creative design." },
            { icon: <FaHandsHelping />, title: "Community Driven", text: "Building meaningful connections and supporting local artisans and creators." },
            { icon: <FaGlobe />, title: "Global Accessibility", text: "Bringing premium fashion to doorsteps worldwide, bridging cultures through style." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-8 bg-card text-card-foreground rounded-2xl shadow-lg border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-secondary/50 w-fit rounded-xl text-primary text-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="pb-24 px-4">
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl container mx-auto shadow-2xl">
          <Image
            src="/Hero/h1_hero2.jpg.webp"
            alt="Call to Action"
            fill
            className="object-cover hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-4xl md:text-6xl font-serif font-bold mb-6"
            >
              Join the Movement
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-300 max-w-xl mb-10 text-lg"
            >
              Step into a world of unbridled style and sophistication. Your journey to exceptional fashion begins here.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest shadow-xl hover:bg-gray-100 transition-colors"
              onClick={() => window.location.href = '/Shop'}
            >
              Start Shopping
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
