'use client'
import React, { memo } from 'react'

const Intro = memo(({title , para}) => {
  console.log("intro rendered");
  return (
    <div className="flex items-center justify-center w-full flex-col gap-2">
          <span className='uppercase font-black text-gray-500'>{title}</span>
          <span className='text-center tracking-[1px]'>{para}</span>
    </div>
  )
})

Intro.displayName = "Intro"

export default Intro