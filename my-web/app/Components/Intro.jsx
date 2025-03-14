import React from 'react'

const Intro = ({title , para}) => {
  return (
    <div className="flex items-center justify-center w-full flex-col gap-2">
          <span className='uppercase font-black text-gray-500'>{title}</span>
          <span className='text-center tracking-[1px]'>{para}</span>
    </div>
  )
}

export default Intro