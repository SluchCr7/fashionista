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
  const latest = products.slice(0, 4);
  const featured = latest[0];
  const items = latest.slice(1);

  return (
    <section className="py-44 bg-background relative overflow-hidden border-t border-border/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
          <div className="space-y-4">
            <p className="typography-display !text-accent">Maison Selection</p>
            <h2 className="text-4xl md:text-7xl font-serif font-black tracking-tighter italic">Latest <span className="font-light not-italic opacity-30">Archive.</span></h2>
          </div>
          <Link href="/Shop" className="typography-display decoration-accent underline underline-offset-8">Explore Entire Catalog</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Main Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative aspect-[4/5] lg:aspect-auto overflow-hidden group shadow-2xl shadow-black/10"
          >
            <Link href={`/Product/${featured?._id}`} className="block w-full h-full relative">
              <Image
                src={featured?.Photo[0]?.url || '/placeholder.jpg'}
                alt="Featured Fragment"
                fill
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />

              <div className="absolute inset-12 flex flex-col justify-end text-white">
                <p className="typography-display !text-white/60 mb-4 uppercase text-[7px] tracking-[0.4em]">Limited Edition № 01</p>
                <h3 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter mb-8 leading-none">{featured?.name}</h3>
                <div className="flex items-center gap-6 group-hover:translate-x-4 transition-transform duration-700">
                  <div className="w-12 h-px bg-white/40" />
                  <span className="typography-display !text-[9px] text-white">ACQUIRE PIECE</span>
                </div>
              </div>

              <div className="absolute top-12 right-12">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <ArrowUpRight size={20} strokeWidth={1} className="text-white" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Secondary Fragments */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            {items.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-8 group cursor-pointer"
              >
                <Link href={`/Product/${product._id}`} className="relative w-40 aspect-[3/4] overflow-hidden shrink-0 shadow-lg">
                  <Image
                    src={product.Photo[0]?.url || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </Link>
                <div className="flex flex-col justify-center space-y-4">
                  <p className="typography-display !text-accent text-[8px]">Fragment {idx + 2}</p>
                  <h4 className="text-2xl font-serif font-black italic tracking-tight">{product.name}</h4>
                  <p className="text-muted-foreground text-[10px] font-medium leading-relaxed uppercase tracking-widest !text-[9px] line-clamp-2 max-w-[200px]">
                    {product.description}
                  </p>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <p className="typography-display !text-[7px] text-foreground">DETAILS —</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-auto p-12 bg-white border border-border/10 flex flex-col items-center justify-center text-center space-y-6 shadow-sm"
            >
              <p className="typography-display !text-muted-foreground">Beyond the Collection</p>
              <h3 className="text-2xl font-serif font-black italic tracking-tighter leading-none">The Complete <span className="opacity-30">Portfolio.</span></h3>
              <Link href="/Shop" className="button-luxury !py-4 !px-8 text-[9px]">Explore 500+ Items</Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
