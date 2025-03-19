import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
const Ads = () => {
  return (
    <div className='flex items-center flex-col gap-3 py-5 min-h-[100vh] bg-gray-100 w-full my-10'>
        <div className='max-w-7xl flex items-center rounded-xl flex-col md:flex-row mx-auto w-full bg-white'>
            <Image src={'/Hero/HeroCollection.jpg'} width={1000} height={1000}
                className='w-[100%] md:w-[50%] h-auto rounded-l-xl'
                alt='bg-picture'
            />
            <div className='flex items-start w-full md:w-[50%] flex-col gap-6 p-5'>
                <span className='text-5xl font-bold'>Special Women Collection</span>
                <p className='text-gray-600 tracking-[1px] w-full md:w-[70%]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. A, ipsam! Beatae consequuntur ipsam nemo veniam quas assumenda minus fugiat sint nulla ducimus totam, recusandae aperiam reiciendis earum repudiandae omnis iusto.</p>
                <button className='bg-DarkRed text-white px-5 w-[80%] md:w-[30%] py-2 rounded-md'>
                  <Link href="/Woman">
                    Shop Now
                  </Link>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Ads