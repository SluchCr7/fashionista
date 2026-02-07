'use client';
import React, { memo, useContext } from 'react';
import Intro from './Intro';
import Image from 'next/image';
import Link from 'next/link';
import { ProductContext } from '../Context/ProductContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProductCard from './ProductCard';

const ClothesGender = memo(({ gender, title, Para }) => {
  const { products } = useContext(ProductContext);

  const genderProducts = products.filter((prod) => prod.gender === gender);

  return (
    <section className="w-full px-6 md:px-12 py-16 bg-white">
      {/* Introduction Header */}
      <div className="mb-12">
        <Intro title={title} para={Para} />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 w-full">
        {genderProducts.map((prod, index) => (
          <motion.div
            key={prod._id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <ProductCard product={prod} />
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-20 flex justify-center">
        <Link
          href={`/Shop?gender=${gender}`}
          className="group relative px-8 py-3 bg-transparent border border-black overflow-hidden rounded-full transition-all hover:bg-black"
        >
          <span className="relative z-10 text-black font-semibold uppercase tracking-widest text-xs group-hover:text-white transition-colors duration-300">
            View All {gender === 'men' ? 'Men' : 'Women'}
          </span>
        </Link>
      </div>
    </section>
  );
});

ClothesGender.displayName = 'ClothesGender';

export default ClothesGender;
