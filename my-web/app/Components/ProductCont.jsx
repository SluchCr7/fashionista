'use client'
import React, { useContext, useState , useEffect } from 'react';
import { CartContext } from '../Context/Cart';
import { IoMdHeart, IoMdAdd, IoMdRemove } from 'react-icons/io';
import Image from 'next/image';
import { UserContext } from '../Context/UserContext';
import { motion } from 'framer-motion';
import { ProductContext } from '../Context/ProductContext';
import { FaHeart } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";

const ProductCont = ({ product }) => {
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [num, setNum] = useState(1);
    const { user , AddFavourite } = useContext(UserContext);
    const { addToCart, discount } = useContext(CartContext);
    const [notify, setNotify] = useState('');
    const FinalPrice = (product?.price * (1 - discount / 100)).toFixed(2)
    const handleCart = () => {
        if (!user) {
            setNotify('Please Login First');
        } else if (color && size) {
            addToCart({
                id: product?._id,
                name: product?.name,
                description: product?.description,
                price: FinalPrice,
                color,
                size,
                img: product?.Photo[0]?.url
            }, num);
            setNotify('Added to Cart Successfully');
            setSize('');
            setColor('');
            setNum(1);
        } else {
            setNotify('Please Select Color and Size');
        }
        setTimeout(() => setNotify(''), 3000);
    };
    return (
        <div className='max-w-6xl mx-auto px-10 py-5'>
            {product ? (
                <div className='flex flex-col md:flex-row gap-10'>
                    {/* Product Images */}
                    <div className='md:w-1/2 w-full flex flex-col gap-4'>
                        <motion.div className='relative' whileHover={{ scale: 1.02 }}>
                            <Image 
                                src={product?.Photo[0]?.url} 
                                alt='product' 
                                width={500} 
                                height={500} 
                                className='w-full object-cover rounded-xl shadow-lg'
                            />
                            <div className='absolute top-2 left-2 flex gap-3'>
                                {discount && <span className='bg-red-500 px-3 py-1 text-white rounded-full'>{discount}% OFF</span>}
                                {
                                    user?.favorites?.includes(product?._id) ? (
                                        <span className='bg-white p-2 rounded-full cursor-pointer text-red-700' onClick={() => AddFavourite(product?._id)}>
                                            <FaHeart size={20} />
                                        </span>
                                    ) : (
                                        <span className='bg-white p-2 rounded-full cursor-pointer text-black' onClick={() => AddFavourite(product?._id)}>
                                            <IoMdHeart size={20} />
                                        </span>
                                    )
                                }
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Product Details */}
                    <div className='md:w-1/2 w-full flex flex-col gap-6'>
                        <h1 className='text-3xl font-bold'>{product?.name}</h1>
                        <p className='text-gray-600'>{product?.description}</p>
                        <div>
                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1'>
                                    {[1, 2, 3, 4, 5].map((star, index) => (
                                        <motion.div 
                                            key={index} 
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <CiStar size={25} color={star <= product?.rating ? 'yellow' : 'gray'} />
                                        </motion.div>
                                    ))} 
                                </div>
                            </div>
                            <span className='text-gray-500'>{product?.reviews?.length} Reviews</span>
                        </div>
                        {/* Pricing */}
                        <div className='text-xl font-bold flex gap-4'>
                            <span className='text-red-500'>${FinalPrice}</span>
                            {discount && <span className='line-through text-gray-400 text-lg'>${product?.price}</span>}
                        </div>
                        
                        {/* Color Selection */}
                        <div>
                            <span className='font-semibold'>Select Color:</span>
                            <div className='flex gap-3 mt-2'>
                                {product?.colors?.map((clr, index) => (
                                    <motion.div 
                                        key={index} 
                                        onClick={() => setColor(clr)}
                                        style={{ backgroundColor: clr.toLowerCase() }}
                                        className={`w-10 h-10 rounded-full cursor-pointer transition-all ${color === clr ? 'border-4 border-black' : 'border border-gray-300'}`}
                                        whileHover={{ scale: 1.1 }}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {/* Size Selection */}
                        <div>
                            <span className='font-semibold'>Select Size:</span>
                            <div className='flex gap-3 mt-2'>
                                {product?.sizes?.map((sz, index) => (
                                    <motion.div 
                                        key={index} 
                                        onClick={() => setSize(sz)} 
                                        className={`px-4 py-2 border rounded-md cursor-pointer transition-all ${size === sz ? 'bg-yellow-400 border-black text-black' : 'border-gray-300'}`}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {sz}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Quantity Selection */}
                        <div className='flex items-center gap-3'>
                            <button onClick={() => setNum(prev => Math.max(prev - 1, 1))} className='border p-2 rounded-md'><IoMdRemove /></button>
                            <span className='text-lg font-bold'>{num}</span>
                            <button onClick={() => setNum(prev => prev + 1)} className='border p-2 rounded-md'><IoMdAdd /></button>
                        </div>
                        
                        {/* Add to Cart Button */}
                        <motion.button 
                            onClick={handleCart} 
                            className='w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-all' 
                            whileHover={{ scale: 1.05 }}
                        >
                            Add To Cart
                        </motion.button>
                        
                        {/* Product Characteristics */}
                        <div className='border-t pt-2'>
                            <span className='font-bold'>Product Details:</span>
                            <div className='grid grid-cols-2 gap-4 mt-2'>
                                <div className='text-sm'><span className='font-semibold'>Category:</span> {product?.category}</div>
                                <div className='text-sm'><span className='font-semibold'>Material:</span> {product?.material}</div>
                                <div className='text-sm'><span className='font-semibold'>Gender:</span> {product?.gender.charAt(0).toUpperCase() + product?.gender.slice(1).toLowerCase()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex justify-center items-center h-[40vh]'>
                    <motion.div className='w-16 h-16 border-4 border-t-transparent border-gray-800 rounded-full animate-spin' />
                </div>
            )}
        </div>
    );
};

export default ProductCont;
