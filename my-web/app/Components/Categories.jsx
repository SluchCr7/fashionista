'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      img: "/Hero/women-1.jpg",
      title: "Women's Collection",
      link: "/Women",
      desc: "Sophisticated styles for the modern woman",
      size: "large"
    },
    {
      id: 2,
      img: "/Hero/men-1.jpg",
      title: "Men's Edit",
      link: "/Men",
      desc: "Refined essentials and statement pieces",
      size: "normal"
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1974&auto=format&fit=crop",
      title: "Accessories",
      link: "/Shop?category=Accessories",
      desc: "The perfect finishing touch",
      size: "normal"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-3 tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              Explore our thoughtfully curated collections designed for every occasion and style.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/Shop"
              className="hidden md:inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-primary/80 transition-colors group"
            >
              View All Categories
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[500px]">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
            >
              <Link href={cat.link} className="block h-full w-full">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  priority={index === 0}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />

                {/* Hover Reveal Gradient */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-3xl md:text-4xl font-serif font-bold mb-2 leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-white/90 text-sm md:text-base font-medium mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 transform translate-y-2 group-hover:translate-y-0">
                      {cat.desc}
                    </p>

                    <div className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm border-b border-white/0 group-hover:border-white transition-all pb-1 w-fit">
                      Explore Collection <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/Shop"
            className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-primary/80 transition-colors"
          >
            View All Categories <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
