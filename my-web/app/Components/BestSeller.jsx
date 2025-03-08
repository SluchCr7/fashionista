'use client'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Intro from './Intro'
import Notify from './Notify'
import { CartContext } from '../Context/Cart'
import { ProductContext } from '../Context/ProductContext'
import ProductCont from './ProductCont'

const BestSeller = () => {
    const { products } = useContext(ProductContext)
    return (
        <div>
            <Intro title="Best Seller" para="Check out our best-selling products!" />
                <ProductCont product={products[0]}/>
        </div>
    )
}



export default BestSeller

            // <div className='max-w-6xl mx-auto p-8'>
            //     <div className='flex flex-col md:flex-row gap-8'>
            //         {/* Product Image */}
            //         <div className='md:w-1/2 relative'>
            //             <Image 
            //                 src={products[0]?.Photo[0]?.url} 
            //                 alt='product' 
            //                 width={500} 
            //                 height={500} 
            //                 className='w-full object-cover rounded-lg shadow-md'
            //             />
            //             <div className='absolute top-2 left-2 flex items-center gap-3'>
            //                 <span className=' bg-DarkRed p-2 rounded-full w-10 h-10 text-white flex items-center justify-center'>{discount}%</span>
            //                 <span className=' bg-DarkRed p-2 rounded-full w-10 h-10 text-white flex items-center justify-center'><IoMdHeart/></span>
            //             </div>
            //         </div>

            //         {/* Product Details */}
            //         <div className='md:w-1/2 flex flex-col gap-4'>
            //             <h1 className='text-2xl font-bold'>{products[0]?.name}</h1>

            //             <div className='text-lg flex items-center gap-3'>
            //                 <span className='line-through text-gray-500'>${products[0]?.price}</span>
            //             </div>

            //             <p className='text-gray-600'>{products[0]?.description}</p>

            //             {/* Color Selection */}
            //             <div className='flex flex-col gap-2'>
            //                 <span className='font-bold'>Color:</span>
            //                 <div className='flex items-center gap-3'>
            //                     {products[0]?.colors.map((clr, index) => (
            //                         <div 
            //                             key={index} 
            //                             onClick={() => setColor(clr)} 
            //                             style={{ backgroundColor: clr.toLowerCase() }}
            //                             className={`w-8 h-8 rounded-full cursor-pointer transition-all duration-300 
            //                                 ${color === clr ? 'border-4 border-black' : 'border border-gray-300'}`}
            //                         />
            //                     ))}
            //                 </div>
            //             </div>

            //             {/* Size Selection */}
            //             <div className='flex flex-col gap-2'>
            //                 <span className='font-bold'>Size:</span>
            //                 <div className='flex items-center gap-3'>
            //                     {products[0]?.sizes.map((sz, index) => (
            //                         <div 
            //                             key={index} 
            //                             onClick={() => setSize(sz)} 
            //                             className={`w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer transition-all duration-300
            //                                 ${size === sz ? 'bg-yellow-400 border-black text-black' : 'border-gray-300'}`}
            //                         >
            //                             {sz}
            //                         </div>
            //                     ))}
            //                 </div>
            //             </div>

            //             {/* Quantity Selection */}
            //             <div className="flex flex-col gap-2">
            //                 <span className='font-bold'>Quantity:</span>
            //                 <div className='flex items-center gap-2'>
            //                     <button onClick={minusNum} className='border p-2 w-8 h-8 rounded-sm'>-</button>
            //                     <span className='font-bold'>{num}</span>
            //                     <button onClick={addNum} className='border p-2 w-8 h-8 rounded-sm'>+</button>
            //                 </div>
            //             </div>

            //             {/* Add to Cart Button */}
            //             <button 
            //                 onClick={handleCart} 
            //                 className='w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-all duration-300'
            //             >
            //                 Add To Cart
            //             </button>

            //             {/* Product Characteristics */}
            //             <div className='border-t pt-2'>
            //                 <span className='font-bold'>Characteristics</span>
            //                 <div className='flex justify-between w-1/2'>
            //                     <span>Category:</span>
            //                     <span className='font-bold'>{products[0]?.category}</span>
            //                 </div>
            //                 <div className='flex justify-between w-1/2'>
            //                     <span>Material:</span>
            //                     <span className='font-bold'>{products[0]?.material}</span>
            //                 </div>
            //             </div>

                        
            //         </div>
            //     </div>
            // </div>