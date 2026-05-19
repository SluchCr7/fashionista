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
      title: "La Femme",
      link: "/Women",
      desc: "Architectural silhouettes.",
      span: "lg:col-span-2 lg:row-span-2"
    },
    {
      id: 2,
      img: "/Hero/men-1.jpg",
      title: "L'Homme",
      link: "/Men",
      desc: "The refined modernist.",
      span: "lg:col-span-1 lg:row-span-1"
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1974&auto=format&fit=crop",
      title: "Objets",
      link: "/Accessories",
      desc: "Curated details.",
      span: "lg:col-span-1 lg:row-span-1"
    }
  ];

  return (
    <section className="py-44 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="space-y-4">
            <p className="typography-display !text-accent">Curated Selection</p>
            <h2 className="text-4xl md:text-7xl font-serif font-black tracking-tighter italic">Infinite <span className="font-light not-italic opacity-30">Expressions.</span></h2>
          </div>
          <Link href="/Shop" className="typography-display decoration-accent underline underline-offset-8">Browse the Archive</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-8 h-auto lg:h-[900px]">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden group cursor-pointer ${cat.span} aspect-square lg:aspect-auto`}
            >
              <Link href={cat.link} className="block w-full h-full">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
                
                <div className="absolute inset-x-8 bottom-8 text-white space-y-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                   <p className="typography-display !text-white/60 mb-2 uppercase text-[7px] tracking-[0.4em]">{cat.desc}</p>
                   <h3 className="text-4xl font-serif font-black italic tracking-tighter leading-none">{cat.title}</h3>
                   <div className="pt-4 flex items-center gap-4">
                     <span className="w-8 h-px bg-white/40" />
                     <span className="typography-display !text-[8px] text-white tracking-widest">DISCOVER</span>
                   </div>
                </div>

                <div className="absolute top-8 right-8 z-10">
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-4 group-hover:translate-x-0">
                      <ArrowUpRight size={16} strokeWidth={1} className="text-white" />
                   </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
