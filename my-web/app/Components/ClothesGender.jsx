'use client'
import React , {memo, useContext} from 'react'
import Intro from './Intro'
import Image from 'next/image'
import { ProductContext } from '../Context/ProductContext'
const ClothesGender = memo(({gender , title , Para}) => {
  const {products} = useContext(ProductContext)
  return (
    <div className='flex items-center flex-col gap-3 w-[100%] px-10 py-5'>
          <Intro title={title} para={Para} />
          <div className='grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {
                products.filter((prod)=> prod.gender === gender).map((prod , index) => (
                    <div key={index} className='flex items-start flex-col w-full'>
                        <Image src={prod?.Photo[0]?.url} alt={"img_prod"} width={200} height={200} className='w-full h-auto rounded-md' />
                        <span className='text-black font-bold'>{prod?.name}</span>
                        <span className='text-DarkRed'>${prod?.price}</span>
                    </div>
                ))
            }
          </div>
    </div>
  )
})

export default ClothesGender