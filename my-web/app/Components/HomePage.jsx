'use client';
import Image from 'next/image';
import React from 'react';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HomePage = () => {
  const categories = [
    {
      id: 1,
      title: "Men's Collection",
      subtitle: "Sophisticated & Bold",
      image: "/Hero/men-1.jpg",
      link: "/Men",
      gradient: "from-blue-600/80 to-indigo-600/80",
      badge: "New Arrivals",
    },
    {
      id: 2,
      title: "Special Edition",
      subtitle: "Limited Collection",
      image: "/Hero/special-4.jpg",
      link: "/Collections",
      gradient: "from-amber-600/80 to-yellow-600/80",
      badge: "Exclusive",
      featured: true,
    },
    {
      id: 3,
      title: "Women's Collection",
      subtitle: "Elegant & Timeless",
      image: "/Hero/women-1.jpg",
      link: "/Women",
      gradient: "from-rose-600/80 to-pink-600/80",
      badge: "Trending",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold tracking-widest uppercase">The Edit</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
            Curated For You
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of premium fashion pieces designed to elevate your style
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className={`group relative rounded-2xl overflow-hidden ${category.featured ? 'md:row-span-1' : ''
                }`}
            >
              <Link href={category.link} className="block">
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Gradient Overlay - Professional & Theme-Aware */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />

                  {/* Subtle Color Accent Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} mix-blend-multiply transition-opacity duration-700`} />

                  {/* High-End Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
                    {/* Badge */}
                    <div className="flex justify-between items-start">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/40 backdrop-blur-md border border-white/20 text-foreground text-[10px] font-bold uppercase tracking-widest shadow-lg">
                        {category.badge === "Exclusive" && <Sparkles size={12} className="text-accent" />}
                        {category.badge === "Trending" && <TrendingUp size={12} className="text-accent" />}
                        {category.badge}
                      </span>
                    </div>

                    {/* Title & CTA */}
                    <div className="space-y-5">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-foreground/70 text-xs font-bold uppercase tracking-widest mb-2">
                          {category.subtitle}
                        </p>
                        <h3 className={`text-foreground font-serif font-bold leading-tight ${category.featured ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
                          }`}>
                          {category.title}
                        </h3>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-3 text-foreground/80 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <span className="font-bold text-xs uppercase tracking-[0.2em]">
                          {category.featured ? 'Explore Collection' : 'Shop Now'}
                        </span>
                        <div className="w-8 h-px bg-foreground/50 transition-all group-hover:w-12" />
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  {category.featured && (
                    <div className="absolute top-0 right-0 w-24 h-24">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent transform rotate-45 translate-x-12 -translate-y-12" />
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link
            href="/Shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            View All Collections
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
};

export default HomePage;