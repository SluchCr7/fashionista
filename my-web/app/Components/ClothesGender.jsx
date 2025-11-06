'use client'
import React, { memo, useContext } from 'react';
import Intro from './Intro';
import Image from 'next/image';
import Link from 'next/link';
import { ProductContext } from '../Context/ProductContext';
import { motion } from 'framer-motion';

const ClothesGender = memo(({ gender, title, Para }) => {
  const { products } = useContext(ProductContext);

  return (
    <div className="flex items-center flex-col gap-6 w-full px-6 md:px-12 py-10">
      <Intro title={title} para={Para} />

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {products
          .filter((prod) => prod.gender === gender)
          .map((prod, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="group bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-[380px] overflow-hidden">
                <Image
                  src={prod?.Photo[0]?.url}
                  alt={prod?.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <Link
                    href={`/Product/${prod?._id}`}
                    className="bg-white text-black px-4 py-2 rounded-lg font-medium shadow-md hover:bg-black hover:text-white transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1 p-4">
                <span className="text-base font-semibold text-gray-900 truncate">
                  {prod?.name}
                </span>
                <span className="text-lg font-bold text-red-600">
                  ${prod?.price}
                </span>
              </div>
            </motion.div>
          ))}
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Link
          href={`/Shop?gender=${gender}`}
          className="px-6 py-3 bg-black text-white rounded-lg font-semibold shadow-md hover:bg-red-600 transition"
        >
          Shop All {gender === 'men' ? 'Men' : 'Women'}
        </Link>
      </div>
    </div>
  );
});

ClothesGender.displayName = 'ClothesGender';

export default ClothesGender;
