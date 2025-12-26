import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">The Edit</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mt-2">Curated For You</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[600px]">
          {/* Item 1 */}
          <div className="group relative rounded-xl overflow-hidden md:col-span-1">
            <Image src="/Hero/men-1.jpg" alt="Men" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-4xl font-serif font-bold text-white mb-4">Man</h3>
              <Link href="/Men" className="inline-flex items-center text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                Shop Now
              </Link>
            </div>
          </div>

          {/* Item 2 (Center - different aspect or span?) -> Let's keep equal or span 1. But styling implies "Special" is prominent. */}
          <div className="group relative rounded-xl overflow-hidden md:col-span-1">
            <Image src="/Hero/special-4.jpg" alt="Special Collection" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-yellow-400 font-bold uppercase tracking-wider text-sm mb-2">Limited Edition</span>
              <h3 className="text-5xl font-serif font-bold text-white mb-6">Special</h3>
              <Link href="/Collections" className="inline-flex items-center bg-white text-black px-8 py-3 rounded-full hover:bg-white/90 transition">
                Explore <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Item 3 */}
          <div className="group relative rounded-xl overflow-hidden md:col-span-1">
            <Image src="/Hero/women-1.jpg" alt="Woman" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-4xl font-serif font-bold text-white mb-4">Woman</h3>
              <Link href="/Women" className="inline-flex items-center text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;