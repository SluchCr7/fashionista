import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Ads = () => {
  return (
    <div className='flex items-center flex-col gap-6 py-10 min-h-[80vh] bg-gray-100 w-full'>
      <div className='max-w-7xl flex flex-col md:flex-row mx-auto w-full bg-white rounded-xl shadow-md overflow-hidden'>
        
        {/* Image Section */}
        <div className='w-full md:w-1/2'>
          <Image 
            src={'/Hero/HeroCollection.jpg'} 
            width={1000} 
            height={1000}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className='w-full h-full object-cover md:rounded-l-xl'
            alt='Women Collection Banner'
          />
        </div>

        {/* Text Section */}
        <div className='flex flex-col justify-center gap-6 p-8 w-full md:w-1/2'>
          <h2 className='text-3xl md:text-5xl font-bold text-gray-900 leading-tight'>
            Special Women Collection
          </h2>
          <p className='text-gray-600 leading-relaxed max-w-lg'>
            Discover our exclusive Women’s Collection designed for style, comfort, and elegance. 
            Find the latest trends and timeless classics to elevate your wardrobe.
          </p>
          <Link 
            href="/Woman"
            className='bg-DarkRed text-white px-6 py-3 rounded-md text-center font-semibold
                       hover:bg-red-700 transition duration-300 ease-in-out w-fit'
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Ads
