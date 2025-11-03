'use client'
import { ProductContext } from '@/app/Context/ProductContext'
import { UserContext } from '@/app/Context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const Wishlist = () => {
  const { user, toggleFavorite } = useContext(UserContext)
  const [myProducts, setMyProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id && user?.token) {
        setLoading(true)
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${user._id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          setMyProducts(res.data?.favorites || [])
        } catch (err) {
          console.log(err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchUserData()
  }, [user?._id, user?.token])

  return (
    <div className="max-w-7xl mx-auto py-16 px-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          My <span className="text-red-600">Wishlist</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Products you loved ❤️</p>
      </motion.div>

      {/* Loading Skeleton */}
      {loading ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse border border-gray-100"
            >
              <div className="w-full h-64 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-[shimmer_1.5s_infinite]" />
              </div>
              <div className="p-5 space-y-4">
                <div className="h-5 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2 mx-auto"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-full mt-6"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : myProducts.length > 0 ? (
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {myProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Link href={`/product/${product._id}`}>
                    <Image
                      src={product.Photo[0]?.url || '/placeholder.png'}
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
        </AnimatePresence>
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
