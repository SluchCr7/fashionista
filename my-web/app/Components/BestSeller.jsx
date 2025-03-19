'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Intro from './Intro'
import Notify from './Notify'
import { CartContext } from '../Context/Cart'
import { ProductContext } from '../Context/ProductContext'
import ProductCont from './ProductCont'
import { CiStar } from "react-icons/ci";
import Link from 'next/link'

const BestSeller = () => {
    const { products } = useContext(ProductContext)
    return (
        <div className='max-w-[1370px] py-10 w-full mx-auto flex items-center flex-col'>
            <Intro title="Best Seller" para="Check out our best-selling products!" />
            {/* <ProductCont product={products[0]}/> */}
            <div className='grid grid-cols-1 w-full py-5 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    products.map((prod , index) => (
                        <Link href={`/Product/${prod?._id}`} key={index} className='flex items-center flex-col w-full'>
                            <Image src={prod?.Photo[0]?.url} alt={"img_prod"} width={200} height={200} className='w-full h-auto rounded-md' />
                            <div className="flex items-center gap-1 py-2 flex-col">
                                <span className='text-black font-bold text-xl'>{prod?.name}</span>
                                <span className='text-DarkRed'>${prod?.price}</span>
                                <div className='flex items-center gap-2'>
                                    <CiStar className='text-yellow-400' />
                                    <span className='text-gray-500'>{prod?.rating} Reviews</span>   
                                </div>
                            </div>
                        </Link>
                    )).slice(10 , 16)
                }
            </div>
        </div>
    )
}



export default BestSeller

