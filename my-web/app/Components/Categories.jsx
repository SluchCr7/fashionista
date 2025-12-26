import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      img: "/Hero/WomenShop.jpg",
      title: "Women",
      link: "/Women",
      desc: "Elegance redefined."
    },
    {
      img: "/Hero/ManShop.jpg",
      title: "Men",
      link: "/Men",
      desc: "Bold & Classic."
    },
    {
      img: "/Hero/collection-item1.jpg",
      title: "Shoes",
      link: "/Shoes",
      desc: "Step in style."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Curated collections for every occasion.</p>
          </div>
          <Link href="/Collections" className="hidden md:flex items-center text-primary font-medium hover:underline">
            View All Collections <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {categories.map((cat, index) => (
            <Link
              href={cat.link}
              key={index}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <Image
                src={cat.img}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-3xl font-serif font-bold mb-1">{cat.title}</h3>
                <p className="text-white/80 text-sm font-medium mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cat.desc}</p>
                <div className="flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Explore <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/Collections" className="flex items-center text-primary font-medium hover:underline">
            View All Collections <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
