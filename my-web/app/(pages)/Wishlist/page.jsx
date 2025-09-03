'use client'
import { ProductContext } from '@/app/Context/ProductContext'
import { UserContext } from '@/app/Context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'
import { MdOutlineShoppingCart } from 'react-icons/md'

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
    <div className="max-w-7xl mx-auto py-12 px-5">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-10">My Wishlist</h1>

      {myProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {myProducts.map(product => (
            <div
              key={product._id}
              className="border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative">
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={product.Photo[0].url}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                    alt={product.name}
                  />
                </Link>
                <button
                  onClick={() => toggleFavorite(product._id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition"
                >
                  <FaHeart className="text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h2>
                <span className="text-DarkRed text-lg font-bold">${product.price}</span>

                {/* Actions */}
                <div className="flex gap-3 mt-3 w-full">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition">
                    <MdOutlineShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center text-gray-500 mt-20">
          <Image src="/assets/empty-wishlist.png" width={200} height={200} alt="empty wishlist" />
          <p className="mt-4 text-lg">Your wishlist is empty.</p>
          <Link
            href="/shop"
            className="mt-5 bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Go to Shop
          </Link>
        </div>
      )}
    </div>
  )
}

export default Wishlist
