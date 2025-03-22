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
            img: "/Hero/collection-item1.jpg",
            title: "Shoes",
            link : "/Shoes"
        }
    ]
  return (
    <div className='grid grid-cols-1 max-w-7xl py-10 md:grid-cols-2 w-full lg:grid-cols-3 gap-3'>
        {
            categorty.map((cat , index) => (
                <Link href={cat.link} key={index} className='compnentCont mx-auto'>
                    <Image width={500} height={500} src={cat?.img} alt={cat?.title} className='transition-transform duration-300 hover:scale-105 w-[100%] h-[100%]' />
                    <div className='cardCategory'>
                        <h2 className='text-white text-4xl font-bold'>{cat?.title}</h2>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default Categories