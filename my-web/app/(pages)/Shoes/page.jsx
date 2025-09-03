'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiStar } from "react-icons/ci"
import { FaShoppingCart } from "react-icons/fa"
import { motion } from 'framer-motion'
import Intro from '@/app/Components/Intro'
import { ProductContext } from '@/app/Context/ProductContext'
import { ReviewContext } from '@/app/Context/ReviewContext'
import { brands } from '@/app/Data'

const Shoes = () => {
  const { products } = useContext(ProductContext)
  const { Reviews } = useContext(ReviewContext)

  // Helper to render stars rating
  const renderStars = (productId) => {
    const productReviews = Reviews.filter(r => r?.product?._id === productId)
    const avgRating = productReviews.length > 0 
      ? productReviews.reduce((a, r) => a + (r.rating || 4), 0) / productReviews.length 
      : 0
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <CiStar key={i} className={i < avgRating ? "text-yellow-400" : "text-gray-300"} />
        ))}
        <span className="text-gray-500 text-sm">({productReviews.length} Reviews)</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Hero Section */}
      <div 
        className="relative w-full min-h-[100vh] flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: "url('/Hero/shoesBg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-5"
        >
          <h1 className="text-5xl font-extrabold">Step into Style</h1>
          <p className="mt-3 text-lg tracking-widest">Discover the perfect pair for every occasion</p>
          <div className="flex gap-4 justify-center mt-6">
            <Link href="/Shop" className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              Shop Now
            </Link>
            <Link href="/Shop?category=Shoes" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
              Explore Shoes
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full py-10 max-w-7xl px-5">
        {['Women Shoes', 'Men Shoes'].map((category, index) => (
          <div key={index} className="relative w-full h-[60vh] rounded-lg overflow-hidden group">
            <Image 
              src={`/Hero/${index === 0 ? 'bg_shoes_wom' : 'bg_men'}.jpg`} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
              alt={category} 
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-4">
              <h2 className="text-white text-4xl font-bold">{category}</h2>
              <Link 
                href={`/Shop?gender=${index === 0 ? "Women" : "Men"}&category=Shoes`} 
                className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Section */}
      <div className="w-full max-w-7xl px-5 py-10">
        <Intro title="The Latest" para="Check out our best selling shoes" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {products.filter(p => p?.category === "Shoes").slice(0, 3).map((prod) => (
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              key={prod._id} 
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative">
                <Image 
                  src={prod?.Photo[0]?.url} 
                  alt={prod?.name} 
                  width={300} 
                  height={200} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform" 
                />
                <Link 
                  href={`/Product/${prod?._id}`} 
                  className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1 text-sm rounded-md opacity-0 group-hover:opacity-100 transition flex items-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </Link>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{prod?.name}</h3>
                <p className="text-DarkRed text-lg font-bold">${prod?.price}</p>
                {renderStars(prod?._id)}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/Shop?category=Shoes" className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
            View All
          </Link>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="w-full max-w-7xl px-5 py-10">
        <Intro title="Best Sellers" para="Check out our most popular shoes" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {products.filter(p => p?.category === "Shoes").slice(0, 3).map((prod) => (
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              key={prod._id} 
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="relative">
                <Image 
                  src={prod?.Photo[0]?.url} 
                  alt={prod?.name} 
                  width={300} 
                  height={200} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform" 
                />
                <Link 
                  href={`/Product/${prod?._id}`} 
                  className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1 text-sm rounded-md opacity-0 group-hover:opacity-100 transition flex items-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </Link>
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{prod?.name}</h3>
                <p className="text-DarkRed text-lg font-bold">${prod?.price}</p>
                {renderStars(prod?._id)}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/Shop?category=Shoes" className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
            View All
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-cover bg-center relative px-5 md:px-0" 
        style={{ backgroundImage: "url(/Hero/bg_shoes.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white max-w-2xl px-5"
        >
          <h2 className="text-4xl font-extrabold">New Collections of Shoes</h2>
          <p className="mt-3 text-lg">Discover the latest trends in footwear and elevate your style with a Big Discount.</p>
          <Link href="/Shop?category=Shoes" className="mt-5 inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Shop Collection
          </Link>
        </motion.div>
      </div>

      {/* Shop by Brand */}
      <div className="w-full max-w-7xl px-5 py-10">
        <Intro title="Shop by Brand" para="Choose your favorite brands" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {brands.map((brand, index) => (
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              key={index} 
              className="flex flex-col items-center cursor-pointer"
            >
              <Image src={brand.image} alt={brand.name} width={120} height={120} className="w-24 h-24 object-contain" />
              <p className="mt-2 text-lg font-semibold text-gray-700">{brand.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Shoes
