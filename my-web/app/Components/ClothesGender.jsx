'use client';
import React, { memo, useContext } from 'react';
import Intro from './Intro';
import Image from 'next/image';
import Link from 'next/link';
import { ProductContext } from '../Context/ProductContext';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
            className="group cursor-pointer flex flex-col gap-4"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm">
              <Image
                src={prod?.Photo[0]?.url}
                alt={prod?.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Overlay / Quick Action */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <Link
                href={`/Product/${prod?._id}`}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-black p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-black hover:text-white"
              >
                <ArrowUpRight size={20} />
              </Link>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <Link href={`/Product/${prod?._id}`}>
                  <h3 className="text-base font-medium text-gray-900 leading-tight group-hover:underline decoration-1 underline-offset-4">
                    {prod?.name}
                  </h3>
                </Link>
                <span className="text-sm font-semibold text-gray-900 ml-4">
                  ${prod?.price}
                </span>
              </div>
              <p className="text-sm text-gray-500 capitalize">{prod?.gender}'s Collection</p>
            </div>
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
