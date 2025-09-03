'use client'
import React, { useRef, useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Intro from './Intro'
import Link from 'next/link'
import { ProductContext } from '../Context/ProductContext'
import { ReviewContext } from '../Context/ReviewContext'
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa"
import { CiStar } from "react-icons/ci"

const BestSeller = () => {
  const { products } = useContext(ProductContext)
  const { Reviews } = useContext(ReviewContext)

  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // scroll function
  const scroll = (dir) => {
    const scrollAmount = dir === "left" ? -300 : 300
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  // check scroll state
  const handleScrollUpdate = () => {
    const container = scrollRef.current
    if (container) {
      const leftScroll = container.scrollLeft
      const rightScroll = container.scrollWidth > leftScroll + container.clientWidth
      setCanScrollLeft(leftScroll > 0)
      setCanScrollRight(rightScroll)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScrollUpdate)
      handleScrollUpdate()
      return () => container.removeEventListener('scroll', handleScrollUpdate)
    }
  }, [])

  return (
    <div className="flex relative items-center justify-center max-w-[1370px] w-full flex-col gap-6 px-6 py-10">
      <Intro title="Best Seller" para="Check out our best-selling products!" />

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="scrollBar mx-auto w-full overflow-x-auto flex space-x-6 relative pb-4"
      >
        {
          products.slice(10, 16).map((prod, index) => (
            <div
              key={index}
              className="min-w-[80%] sm:min-w-[45%] lg:min-w-[30%] bg-white rounded-lg shadow-md hover:shadow-xl transition p-3"
            >
              <Link href={`/Product/${prod?._id}`}>
                <Image
                  src={prod?.Photo[0]?.url}
                  alt={prod?.name}
                  width={300}
                  height={300}
                  className="w-full h-[400px] object-cover rounded-md"
                />
                <div className="flex flex-col items-center gap-2 mt-3">
                  <span className="text-black font-semibold text-lg text-center">
                    {prod?.name}
                  </span>
                  <span className="text-DarkRed font-bold">${prod?.price}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <CiStar className="text-yellow-400 text-lg" />
                    <span className="text-gray-600">
                      {Reviews.filter(review => review?.product?._id === prod?._id).length} Reviews
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        }
      </div>

      {/* Navigation Buttons */}
      {products.length > 0 && (
        <>
          <button
            onClick={() => scroll("left")}
            className={`absolute top-[50%] left-[10px] transform -translate-y-1/2 z-50 
              ${canScrollLeft ? "bg-black text-white" : "bg-gray-200 text-gray-400 pointer-events-none"} 
              p-3 rounded-full shadow-md`}
          >
            <FaLongArrowAltLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`absolute top-[50%] right-[10px] transform -translate-y-1/2 z-50 
              ${canScrollRight ? "bg-black text-white" : "bg-gray-200 text-gray-400 pointer-events-none"} 
              p-3 rounded-full shadow-md`}
          >
            <FaLongArrowAltRight />
          </button>
        </>
      )}
    </div>
  )
}

export default BestSeller
