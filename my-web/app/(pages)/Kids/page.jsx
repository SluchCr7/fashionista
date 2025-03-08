'use client'
import ClothesGender from '@/app/Components/ClothesGender'
import TopMan from '@/app/Components/ClothesGender'
import Image from 'next/image'
import React from 'react'

const Kids = () => {
  return (
    <div className='flex items-center flex-col w-full gap-3'>
        <Image src={'/Hero/bg_kids.jpg'} width={1000} height={1000} className='w-full h-auto' alt='bg-picture' />
        <div className='flex items-center flex-col gap-3 w-[80%] px-10 py-5'>
            <ClothesGender gender={"kid"} title={"Top Kids Clothes"} Para={"Discover New And high Kids Wears in Store"} />
        </div>
    </div>
  )
}

export default Kids