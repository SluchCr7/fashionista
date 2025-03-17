import Image from 'next/image'
import React from 'react'

const HomePage = () => {
  return (
      <div className='w-full relative h-[100vh] px-10 py-0 flex items-center flex-col md:flex-row overflow-hidden justify-between'>
          <div className='img_spicial flex items-center justify-center'>
              <Image src={'/Hero/men-1.jpg'} width={1000} height={1000} className='img relative top-[60%] md:top-0' alt='bg-picture' />
              <span className='text-white text-5xl absolute top-[50%] md:top-[80%] font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Man</span>
          </div>
          <div className='img_man flex items-center justify-center'>
            <Image  src={'/Hero/special-4.jpg'} width={1000} height={1000} className='img relative top-[60%] md:top-0' alt='bg-picture'/>
              <span className='text-white text-5xl absolute top-[50%] md:top-[80%] font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Special</span>
          </div>
          <div className='img_woman flex items-center justify-center'>
            <Image src={'/Hero/women-1.jpg'} width={1000} height={1000} className='img' alt='bg-picture'/>
              <span className='text-white text-5xl absolute top-[50%] md:top-[80%] font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2'>Woman</span>
        </div>
    </div>
  )
}

export default HomePage