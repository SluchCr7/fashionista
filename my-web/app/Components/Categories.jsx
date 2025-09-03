import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const Categories = () => {
  const categories = [
    {
      img: "/Hero/WomenShop.jpg",
      title: "Women",
      link: "/Women"
    },
    {
      img: "/Hero/ManShop.jpg",
      title: "Men",
      link: "/Men"
    },
    {
      img: "/Hero/collection-item1.jpg",
      title: "Shoes",
      link: "/Shoes"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6 py-12 px-4">
      {categories.map((cat, index) => (
        <Link
          href={cat.link}
          key={index}
          className="relative group rounded-2xl overflow-hidden shadow-lg"
        >
          {/* Image */}
          <Image
            width={500}
            height={500}
            src={cat.img}
            alt={cat.title}
            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h2 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg">
              {cat.title}
            </h2>
            <span className="mt-2 text-gray-200 text-sm md:text-base">Discover Now</span>
            <span className="mt-4 bg-white text-gray-900 font-semibold px-5 py-2 rounded-full shadow-md transition group-hover:bg-red-500 group-hover:text-white">
              Shop Now
            </span>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

export default Categories
