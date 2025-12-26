'use client'
import { UserContext } from '@/app/Context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaShoppingBag, FaArrowRight } from 'react-icons/fa'
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
      } else {
        // If no user, stop loading immediately (or handle redirect)
        if (user === null) setLoading(false); // user null means checked and not found
      }
    }
    fetchUserData()
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16"
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
              Wishlist.
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-light">
              Your curated collection of favorites.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 ml-12 mb-4"></div>
          <p className="text-gray-400 font-medium mb-4">{myProducts.length} Items</p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[0.8] rounded-2xl mb-4" />
                <div className="h-4 bg-gray-200 w-3/4 rounded mb-2" />
                <div className="h-4 bg-gray-200 w-1/4 rounded" />
              </div>
            ))}
          </div>
        ) : myProducts.length > 0 ? (
          <AnimatePresence>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
              {myProducts.map((product, index) => (
                <motion.div
                  layout
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[0.8] w-full overflow-hidden rounded-2xl bg-gray-200 mb-4 cursor-pointer">
                    <Link href={`/product/${product._id}`}>
                      <Image
                        src={product.Photo[0]?.url || '/placeholder.png'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={product.name}
                      />
                    </Link>

                    {/* Floating Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product._id); }}
                        className="p-3 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                        title="Remove from wishlist"
                      >
                        <FaHeart />
                      </button>
                    </div>

                    {/* Quick Add Button */}
                    <button className="absolute bottom-4 left-4 right-4 py-3 bg-white/90 backdrop-blur text-black font-semibold rounded-xl translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 hover:bg-black hover:text-white">
                      <FaShoppingBag size={14} /> Add to Bag
                    </button>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 truncate pr-4 text-lg">{product.name}</h3>
                      <span className="font-semibold text-gray-900">${product.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{product.category} • {product.brand || 'Generic'}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-4xl">
              💔
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Looks like you have not found your favorite picks yet. Explore our featured collections to find something you love.
            </p>
            <Link
              href="/Shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              Start Shopping <FaArrowRight />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
