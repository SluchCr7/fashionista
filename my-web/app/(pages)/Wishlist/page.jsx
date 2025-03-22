'use client'
import { ProductContext } from '@/app/Context/ProductContext'
import { UserContext } from '@/app/Context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

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
        <div className='max-w-7xl mx-auto py-8 px-5'>
            <h1 className='text-3xl font-bold text-center text-red-600 mb-6'>My Wishlist</h1>
            {myProducts.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {myProducts.map(product => (
                        <div key={product._id} className='border rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300'>
                            <Link href={`/product/${product._id}`}>
                                <Image src={product.Photo[0].url} width={300} height={300} className='w-full object-cover rounded-lg' alt={product.name} />
                            </Link>
                            <div className='flex justify-between flex-col items-center mt-3'>
                                <h2 className='text-lg font-semibold'>{product.name}</h2>
                                <span className='text-DarkRed text-lg font-bold'>${product.price}</span>
                            </div>
                            <button 
                                className='mt-3 w-full flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300'
                                onClick={() => toggleFavorite(product._id)}
                            >
                                <FaHeart /> Remove from Wishlist
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center text-gray-500 text-lg mt-10'>
                    <p>Your wishlist is empty. Start adding your favorite products!</p>
                    <Link href='/shop' className='text-red-600 font-bold underline mt-3 inline-block'>Go to Shop</Link>
                </div>
            )}
        </div>
    )
}

export default Wishlist
