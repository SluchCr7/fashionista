'use client';
import React, { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LatestCollection = () => {
  const { products } = useContext(ProductContext);
  const latest = products.slice(0, 5); // Take first 5 items
  const featured = latest[0];
  const gridItems = latest.slice(1);

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block"
            >
              Fresh Drops
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight"
            >
              Latest Collection
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/Shop" className="group flex items-center gap-2 text-foreground font-semibold uppercase tracking-widest text-sm hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
              Explore All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

          {/* Featured/Hero Item */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2 relative h-[500px] lg:h-auto overflow-hidden rounded-2xl group cursor-pointer"
          >
            <Link href={`/Product/${featured?._id}`} className="block w-full h-full relative">
              <Image
                src={featured?.Photo[0]?.url || '/placeholder.jpg'}
                alt="Featured Product"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                <span className="text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-4 inline-block">New Arrival</span>
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">{featured?.name}</h3>
                <p className="text-white/80 line-clamp-2 mb-6 max-w-sm text-sm md:text-base">{featured?.description}</p>
                <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:underline underline-offset-4">
                  Shop Now <ArrowUpRight size={16} />

                </span>
              </div>
            </Link>
          </motion.div>

          {/* Grid Items */}
          {gridItems.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}

          {/* CTA Card in Grid */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-secondary/10 rounded-2xl p-8 text-center border border-dashed border-border group hover:border-primary/50 transition-colors cursor-pointer">
            <Link href="/Shop" className="block w-full">
              <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-primary transition-colors">Discover More</h3>
              <p className="text-muted-foreground mb-6 text-sm">Browse our full catalog of over 500+ premium items.</p>
              <div className="w-12 h-12 rounded-full bg-white border border-border flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                <ArrowRight size={20} className="text-foreground" />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
