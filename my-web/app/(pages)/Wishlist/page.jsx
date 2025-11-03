'use client'
import { ProductContext } from '@/app/Context/ProductContext'
import { UserContext } from '@/app/Context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { motion } from 'framer-motion'

const Wishlist = () => {
  const { user, toggleFavorite } = useContext(UserContext)
  const { products } = useContext(ProductContext)
  const [myProducts, setMyProducts] = useState([])

  useEffect(() => {
    if (user) {
      const myWishlist = products.filter(product => user.favorites.includes(product._id))
      setMyProducts(myWishlist)
    }
  }, [user, products])

  return (
    <div className="max-w-7xl mx-auto py-16 px-5">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          My <span className="text-red-600">Wishlist</span>
        </h1>
        <p className="text-gray-500 mt-2">Products you loved ❤️</p>
      </div>

      {myProducts.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {myProducts.map(product => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={product.Photo[0].url}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
                    alt={product.name}
                  />
                </Link>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Heart Button */}
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:bg-red-500 transition"
                >
                  <FaHeart className="text-red-500 group-hover:text-white transition" />
                </button>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col items-center text-center">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-red-600 text-xl font-bold mt-1">
                  ${product.price}
                </p>

                {/* Actions */}
                <div className="mt-5 w-full">
                  <button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg font-semibold hover:from-black hover:to-gray-900 transition-all duration-300 shadow-lg">
                    <MdOutlineShoppingCart className="text-xl" /> Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center text-gray-500 mt-20"
        >
          <Image
            src="/empty.svg"
            width={220}
            height={220}
            alt="empty wishlist"
            className="opacity-90"
          />
          <h2 className="mt-6 text-2xl font-semibold text-gray-700">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mt-2">
            Explore amazing products and add your favorites!
          </p>
          <Link
            href="/shop"
            className="mt-6 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-black hover:to-gray-900 transition-all duration-300 shadow-md"
          >
            Go to Shop
          </Link>
        </motion.div>
      )}
    </div>
  )
}

export default Wishlist
