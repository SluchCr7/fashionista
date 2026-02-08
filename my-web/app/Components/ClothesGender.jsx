'use client';
import React, { memo, useEffect, useState } from 'react';
import Intro from './Intro';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import api from '@/lib/api';
import { ProductSkeleton as Skeleton } from '@/app/Skeletons/ProductSkeleton'; // Assuming there's a skeleton

const ClothesGender = memo(({ gender, title, Para }) => {
  const [genderProducts, setGenderProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenderProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/product?gender=${gender}&limit=8`);
        if (res.success) {
          setGenderProducts(res.data.products);
        }
      } catch (err) {
        console.error("Failed to fetch gender products", err);
      } finally {
        setLoading(false);
      }
    };
    if (gender) fetchGenderProducts();
  }, [gender]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full py-16">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    );
  }

  return (
    <section className="w-full px-6 md:px-12 py-16 bg-white">
      {/* Introduction Header */}
      {title && (
        <div className="mb-12">
          <Intro title={title} para={Para} />
        </div>
      )}

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
      {genderProducts.length > 0 && (
        <div className="mt-20 flex justify-center">
          <Link
            href={`/Shop?gender=${gender}`}
            className="group relative px-8 py-3 bg-transparent border border-black overflow-hidden rounded-full transition-all hover:bg-black"
          >
            <span className="relative z-10 text-black font-semibold uppercase tracking-widest text-xs group-hover:text-white transition-colors duration-300">
              View All {gender}
            </span>
          </Link>
        </div>
      )}
    </section>
  );
});

ClothesGender.displayName = 'ClothesGender';

export default ClothesGender;
