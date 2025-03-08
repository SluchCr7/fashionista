'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../Context/Cart'
import Notify from '@/app/Components/Notify'
import Image from 'next/image'
import { ProductContext } from '@/app/Context/ProductContext'
import ProductCont from '@/app/Components/ProductCont'
const Product = ({ params }) => {
    const { id } = params
    const [product , setProduct] = useState({})
    const {products} = useContext(ProductContext)
    useEffect(() => {
        const selectProduct = products.find((prod) => prod._id == id); // Use find() instead of filter()
        if (selectProduct) {
            setProduct(selectProduct);
        }
    }, [id , products]);
    return (
    <div>
        <div className='max-w-6xl mx-auto px-8 py-24'>
            {
                !product || Object.keys(product).length === 0 ? (
                    <p className='flex items-center justify-center w-full text-3xl font-bold min-h-[60vh]'>Product Loading ...</p>
                ) : (
                    <div className="flex items-center flex-col gap-4 w-full">
                        <div className='max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8'>
                            <ProductCont product={product}/>
                        </div>
                        <div className="flex items-start flex-col gap-2">
                            <span className='text-DarkRed'>Related Products</span>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 lg:grid-cols-5'>
                                {
                                    products.filter((prod) => prod.gender === product.gender && prod.category === product.category).map((prod, index) => (
                                        <div className='flex items-start flex-col w-full' key={index}>
                                            <Image src={prod?.Photo[0]?.url} alt={"img_prod"} width={100} height={100} className='w-full h-auto rounded-md' />
                                            <span className='text-black font-bold'>{prod?.name}</span>
                                            <span className='text-DarkRed'>${prod?.price}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}


export default Product

