import React from 'react'
import Image from 'next/image'
import { CiStar } from "react-icons/ci";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Shoes = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      {/* Hero Section */}
      <div className='relative w-full min-h-[100vh] flex items-center justify-center bg-cover bg-center' style={{ backgroundImage: "url('/Hero/shoesBg.jpg')" }}>
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='relative z-10 text-center text-white px-5'>
          <h1 className='text-5xl font-extrabold'>Step into Style</h1>
          <p className='mt-3 text-lg tracking-widest'>Discover the perfect pair for every occasion</p>
          <button className='mt-5 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition'>Shop Now</button>
        </div>
      </div>

      {/* Categories Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full py-10 max-w-7xl px-5'>
        {['Women Shoes', 'Men Shoes'].map((category, index) => (
          <div key={index} className='relative w-full h-[60vh] rounded-lg overflow-hidden'>
            <Image src={`/Hero/${index === 0 ? 'bg_shoes_wom' : 'bg_men'}.jpg`} layout='fill' objectFit='cover' alt={category} className='transition-transform duration-300 hover:scale-105'/>
            <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
              <h2 className='text-white text-4xl font-bold'>{category}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Section */}
      {['Best Sellers', 'New Arrivals'].map((section, index) => (
        <div key={index} className='w-full max-w-7xl px-5 py-10'>
          <div className='flex justify-between items-center'>
            <h2 className='text-3xl font-bold text-red-600'>{section}</h2>
            <button className='text-red-600 font-semibold border-b-2 border-red-600 hover:text-red-700 transition'>See All Products</button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition'>
                <Image src={`/Hero/shoes${item}.jpg`} width={500} height={500} layout='responsive' alt='Shoes' className='w-full'/>
                <div className='p-4 text-center'>
                  <h3 className='text-lg font-semibold'>Shoe {item}</h3>
                  <p className='text-red-600 text-lg font-bold'>$19.99 <span className='text-gray-500 line-through'>$29.99</span></p>
                  <div className='flex justify-center mt-2 text-yellow-500'>
                    {[...Array(5)].map((_, i) => (<CiStar key={i} />))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {/* Call to Action Section */}
      <div className='w-full min-h-[100vh] flex flex-col items-center justify-center bg-cover bg-center relative px-5 md:px-0' style={{ backgroundImage: "url(/Hero/bg_shoes.jpg)" }}>
        <div className='absolute inset-0 bg-black/60'></div>
        <div className='relative z-10 text-center text-white max-w-2xl px-5'>
          <h2 className='text-4xl font-extrabold'>New Collections of Shoes</h2>
          <p className='mt-3 text-lg'>Discover the latest trends in footwear and elevate your style with a Big Discount.</p>
        </div>
      </div>
      {/* Clients Openions in Shoes */}
      <div className="bg-gray-200 w-full py-10 min-h-[60vh] px-5 flex items-center flex-col gap-5 justify-center">
        <span className='text-3xl text-black'><FaQuoteLeft /></span>
        <p className='w-[60%] text-center text-sm tracking-[1px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque in exercitationem quod, vitae ad magnam expedita tempora dolorum voluptate delectus quam eius repellat dolore, ex ratione quo voluptas fugit nulla.</p>
        <Image src={"/Openions/testimonial5-1.jpg"} alt='img_client' width={500} height={500}
          className='w-[80px] h-[80px] rounded-full'
        />
        <span className='font-bold text-DarkRed'>Ahmed Alaa</span>
      </div>
    </div>
  );
}
export default Shoes