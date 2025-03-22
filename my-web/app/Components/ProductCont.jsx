'use client'
import React, { useContext, useState, useEffect, memo, useCallback, useMemo } from 'react';
import { CartContext } from '../Context/Cart';
import { IoMdHeart, IoMdAdd, IoMdRemove } from 'react-icons/io';
import Image from 'next/image';
import { UserContext } from '../Context/UserContext';
import { motion } from 'framer-motion';
import { FaHeart } from "react-icons/fa6";
import { ReviewContext } from '../Context/ReviewContext';
import { FaStar } from "react-icons/fa";

const ProductCont = memo(({ product }) => {
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [num, setNum] = useState(1);
    const [notify, setNotify] = useState('');
    const {AddNewReview , Reviews } = useContext(ReviewContext);
    const { user, AddFavourite } = useContext(UserContext);
    const { addToCart, discount } = useContext(CartContext);
    const [productReviews , setProductReviews] = useState([])
    // Calculate Final Price
    const FinalPrice = useMemo(() => (product?.price * (1 - discount / 100)).toFixed(2), [product?.price, discount]);

    // Handle Add to Cart
    const handleCart = useCallback(() => {
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
    }, [user, color, size, num, FinalPrice, addToCart, product]);

    // Review System: Click on Star to Add Review
    const handleStarClick = useCallback((rating ) => {
        if (!user) {
            setNotify('Please Login to Review');
        } else {
            AddNewReview(product?._id, rating);
            setNotify(`Thank you for your ${rating}-star review!`);
        }
        setTimeout(() => setNotify(''), 3000);
    }, [user, AddNewReview, product]);

    // Calculate Star Rating based on the number of reviews
    const determineStarRating = useMemo(() => {
        const reviewCount = productReviews?.length || 0;
        if (reviewCount >= 50) return 5;
        if (reviewCount >= 40) return 4;
        if (reviewCount >= 20) return 3;
        if (reviewCount >= 10) return 2;
        return 1;
    }, [productReviews?.length]);
    useEffect(() => {
        setProductReviews(Reviews.filter(review => review.product === product?._id))
    }, [Reviews, product?._id])
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
                                {discount > 0 && <span className='bg-red-500 px-3 py-1 text-white rounded-full'>{discount}%</span>}
                                {user?.favorites?.includes(product?._id) ? (
                                    <span className='bg-white p-2 rounded-full cursor-pointer text-red-700' onClick={() => AddFavourite(product?._id)}>
                                        <FaHeart size={20} />
                                    </span>
                                ) : (
                                    <span className='bg-white p-2 rounded-full cursor-pointer text-black' onClick={() => AddFavourite(product?._id)}>
                                        <IoMdHeart size={20} />
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Product Details */}
                    <div className='flex items-start flex-col gap-2 md:w-1/2 w-full'>
                        <div className='flex flex-col gap-6'>
                            <h1 className='text-3xl font-bold'>{product?.name}</h1>
                            <p className='text-gray-600'>{product?.description}</p>

                            {/* Star Rating & Reviews */}
                            <div className="flex items-center gap-5">
                                <div className='flex items-center gap-1'>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.div 
                                            key={star} 
                                            onClick={() => handleStarClick(star)} 
                                            className="cursor-pointer"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <FaStar size={25} color={star <= determineStarRating ? 'yellow' : 'white'} />
                                        </motion.div>
                                    ))}
                                </div>
                                <span className='text-black '> {productReviews.length} Reviews</span>
                            </div>

                            {/* Pricing */}
                            <div className='text-xl font-bold flex gap-4'>
                                <span className='text-red-500'>${FinalPrice}</span>
                                {discount > 0 && <span className='line-through text-gray-400 text-lg'>${product?.price}</span>}
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
                                <button onClick={() => setNum((prev) => Math.max(prev - 1, 1))} className='border p-2 rounded-md'><IoMdRemove /></button>
                                <span className='text-lg font-bold'>{num}</span>
                                <button onClick={() => setNum((prev) => prev + 1)} className='border p-2 rounded-md'><IoMdAdd /></button>
                            </div>

                            {/* Add to Cart Button */}
                            <motion.button 
                                onClick={handleCart} 
                                className='w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-all' 
                                whileHover={{ scale: 1.05 }}
                            >
                                Add To Cart
                            </motion.button>
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
});

ProductCont.displayName = 'ProductCont';

export default ProductCont;
