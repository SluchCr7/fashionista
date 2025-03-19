'use client'
import Link from 'next/link';
import React, { memo } from 'react'

const Intro = memo(({title , para}) => {
  console.log("intro rendered");
  return (
    <div className="flex items-center justify-between w-full gap-2">
        <span className='uppercase font-black text-gray-500'>{title}</span>
        <Link href="/Shop" className="text-DarkRed uppercase border-b border-DarkRed">View All Collection</Link>
    </div>
  )
})

Intro.displayName = "Intro"

export default Intro