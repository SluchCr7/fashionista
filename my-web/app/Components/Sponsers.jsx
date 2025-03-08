import Image from 'next/image'
import React from 'react'

const Sponsers = () => {
  const images = [
    "/sponsers/06Oct24 Anis Pro Upload.png",
    "/sponsers/Black and White Y2K Streetwear Clothing Logo.png",
    "/sponsers/Red Minimalist Fashion Woman Free Logo.png",
    "/sponsers/White and Black Apparel Clothing Business Logo.png",
  ]
  return (
    <div className='w-[100%]'>
      <div className='grid grid-cols-1 md:grid-cols-2 w-[70%] mx-auto lg:grid-cols-4 gap-8'>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Sponser ${index + 1}`}
            className='w-[100%] object-contain'
            width={400}
            height={400}
          />
        ))}
      </div>
    </div>
  )
}

export default Sponsers