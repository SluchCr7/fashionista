'use client'
import Intro from '@/app/Components/Intro'
import ClothesGender from '@/app/Components/ClothesGender'
import Image from 'next/image'
import React, { useContext } from 'react'

const Women = () => {
  return (
    <div className='flex items-center flex-col w-full gap-3'>
        <Image src={'/Hero/bg-woman.webp'} width={1000} height={1000} className='w-full h-auto' alt='bg-picture' />
        <div className='flex items-center flex-col gap-3 w-[100%] md:w-[80%] px-10 py-5'>
            <ClothesGender gender={"women"} title={"Top Women Clothes"} Para={"Discover New And high women Wears in Store"} />
        </div>
    </div>
  )
}

export default Women