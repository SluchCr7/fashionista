'use client'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { ProductContext } from '../Context/ProductContext';
import Intro from './Intro';

const LatestCollection = () => {
  const scrollRef = useRef(null);
  const { products } = useContext(ProductContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Scroll buttons
  const scroll = (dir) => {
    const scrollAmount = dir === "left" ? -350 : 350;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update scroll states
  const handleScrollUpdate = () => {
    const container = scrollRef.current;
    if (container) {
      const left = container.scrollLeft;
      const right = container.scrollWidth > left + container.clientWidth + 5;
      setCanScrollLeft(left > 0);
      setCanScrollRight(right);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScrollUpdate);
      handleScrollUpdate();
      return () => container.removeEventListener("scroll", handleScrollUpdate);
    }
  }, []);

  return (
    <section className="relative max-w-[1370px] mx-auto w-full px-6 py-12">
      {/* Section Intro */}
      <Intro
        title="Latest Collection"
        para="Explore our latest arrivals and shop the newest trends now."
      />

      {/* Products carousel */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide relative py-6"
      >
        {products.slice(0, 8).map((product) => (
          <div
            key={product._id}
            className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%] group relative rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <Link href={`/Product/${product._id}`}>
              <Image
                src={product.Photo[0]?.url}
                alt={product.name}
                width={300}
                height={400}
                className="w-full h-[400px] object-cover rounded-lg transform group-hover:scale-105 transition duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm shadow">
                  View Product
                </span>
              </div>
            </Link>
            <div className="text-center py-4">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-red-600 font-bold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {products.length > 4 && (
        <>
          <button
            onClick={() => scroll("left")}
            className={`absolute top-1/2 -translate-y-1/2 left-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition 
              ${!canScrollLeft && "opacity-30 pointer-events-none"}`}
          >
            <FaLongArrowAltLeft className="text-xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute top-1/2 -translate-y-1/2 right-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition
              ${!canScrollRight && "opacity-30 pointer-events-none"}`}
          >
            <FaLongArrowAltRight className="text-xl" />
          </button>
        </>
      )}

      {/* CTA button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/Shop"
          className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default LatestCollection;
