import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Categories = () => {
    const categorty = [
        {
            img: "/Hero/WomenShop.jpg",
            title: "Women",
            link : "/Women"
        },
        {
            img: "/Hero/ManShop.jpg",
            title: "Men",
            link : "/Men"
        },
        {
            img: "/Hero/bg_shoes2.jpg",
            title: "Shoes",
            link : "/Shoes"
        }
    ]
  return (
    <div className='grid grid-cols-1 max-w-7xl py-10 md:grid-cols-2 w-full lg:grid-cols-3 gap-3'>
        {
            categorty.map((cat , index) => (
                <Link href={cat.link} key={index} className='relative w-full rounded-lg overflow-hidden'>
                    <Image width={500} height={500} src={cat?.img} alt={cat?.title} className='transition-transform duration-300 hover:scale-105 w-[100%] h-[100%]' />
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center'>
                        <h2 className='text-white text-4xl font-bold'>{cat?.title}</h2>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default Categories