import Image from 'next/image'
import React from 'react'
import { Companies } from '../Data'

const Sponsers = () => {
  return (
    <div className='w-full py-10 bg-gray-50'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6'>
        {Companies.slice(0, 4).map((logo, index) => (
          <div key={index} className='flex items-center justify-center'>
            <Image
              src={logo}
              alt={`Company Logo ${index + 1}`}
              className='w-full h-auto object-contain grayscale hover:grayscale-0 hover:scale-105 transition duration-300 ease-in-out'
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sponsers
