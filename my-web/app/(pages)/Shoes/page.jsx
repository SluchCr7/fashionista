'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { CiStar } from "react-icons/ci";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Intro from '@/app/Components/Intro';
import { ProductContext } from '@/app/Context/ProductContext';
import Link from 'next/link';
import { ReviewContext } from '@/app/Context/ReviewContext';
import { brands } from '@/app/Data';
import { useState, useEffect } from 'react';
const Shoes = () => {
  const {products} = useContext(ProductContext)
  const {Reviews } = useContext(ReviewContext);

  return (
    <div className='flex flex-col items-center w-full'>
      {/* Hero Section */}
      <div className='relative w-full min-h-[100vh] flex items-center justify-center bg-cover bg-center' style={{ backgroundImage: "url('/Hero/shoesBg.jpg')" }}>
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='relative z-10 text-center text-white px-5'>
          <h1 className='text-5xl font-extrabold'>Step into Style</h1>
          <p className='mt-3 text-lg tracking-widest'>Discover the perfect pair for every occasion</p>
          <button className='mt-5 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition'>Shop Now</button>
        </div>
      </div>
      {/* Categories Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full py-10 max-w-7xl px-5'>
        {['Women Shoes', 'Men Shoes'].map((category, index) => (
          <div key={index} className='relative w-full h-[60vh] rounded-lg overflow-hidden'>
            <Image src={`/Hero/${index === 0 ? 'bg_shoes_wom' : 'bg_men'}.jpg`} layout='fill' objectFit='cover' alt={category} className='transition-transform duration-300 hover:scale-105'/>
            <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
              <h2 className='text-white text-4xl font-bold'>{category}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className='w-full max-w-7xl px-5 py-10'>
        <Intro title={"The Latest"} para={"Check out our best selling shoes"} />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
            {
                products.filter((prod) => prod?.category === "Shoes" ).map((prod , index) => (
                    <Link href={`/Product/${prod?._id}`} key={index} className='flex items-center flex-col w-full'>
                        <Image src={prod?.Photo[0]?.url} alt={"img_prod"} width={200} height={200} className='w-full h-auto rounded-md' />
                        <div className="flex items-center gap-1 py-2 flex-col">
                            <h3 className='text-lg font-semibold'>{prod?.name}</h3>
                            <p className='text-DarkRed text-lg font-bold'>${prod?.price}</p>
                            <div className='flex items-center gap-2'>
                                <CiStar className='text-yellow-400' />
                                <span className='text-gray-500'>{Reviews.filter(review => review?.product?._id === prod?._id).length} Reviews</span>   
                            </div>
                        </div>
                    </Link>
                )).slice(0 , 3)
            }
        </div>  
      </div>
      <div className="w-full max-w-7xl px-5 py-10">
        <Intro title={"Best Sellers"} para={"Check out our best selling shoes"} />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
            {
                products.filter((prod) => prod?.category === "Shoes").map((prod , index) => (
                    <Link href={`/Product/${prod?._id}`} key={index} className='flex items-center flex-col w-full'>
                        <Image src={prod?.Photo[0]?.url} alt={"img_prod"} width={200} height={200} className='w-full h-auto rounded-md' />
                        <div className="flex items-center gap-1 py-2 flex-col">
                            <h3 className='text-lg font-semibold'>{prod?.name}</h3>
                            <p className='text-DarkRed text-lg font-bold'>${prod?.price}</p>
                            <div className='flex items-center gap-2'>
                                <CiStar className='text-yellow-400' />
                                <span className='text-gray-500'>{Reviews.filter(review => review?.product?._id === prod?._id).length} Reviews</span>   
                            </div>
                        </div>
                    </Link>
                )).slice(0 , 3)
            }
        </div>
      </div>
      {/* Call to Action Section */}
      <div className='w-full min-h-[100vh] flex flex-col items-center justify-center bg-cover bg-center relative px-5 md:px-0' style={{ backgroundImage: "url(/Hero/bg_shoes.jpg)" }}>
        <div className='absolute inset-0 bg-black/60'></div>
        <div className='relative z-10 text-center text-white max-w-2xl px-5'>
          <h2 className='text-4xl font-extrabold'>New Collections of Shoes</h2>
          <p className='mt-3 text-lg'>Discover the latest trends in footwear and elevate your style with a Big Discount.</p>
        </div>
      </div>
      {/* Shop by Brand */}
      <div className='w-full max-w-7xl px-5 py-10'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-6'>
          {brands.map((brand, index) => (
            <div key={index} className='flex flex-col items-center'>
              <Image src={brand.image} alt={brand.name} width={120} height={120} className='w-24 h-24 object-contain'/>
              {/* <p className='mt-2 text-lg font-semibold'>{brand.name}</p> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Shoes