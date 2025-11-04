'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa"
import { motion } from 'framer-motion'
import { CiStar } from "react-icons/ci"
import Intro from './Intro'

const CollectionSection = ({
  title,
  subtitle,
  products = [],
  showRating = false,
  calculateRating = () => ({ avg: 0, count: 0 }),
  ctaText = "Shop All Products",
  ctaLink = "/Shop"
}) => {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Scroll Logic
  const scroll = (dir) => {
    const scrollAmount = dir === "left" ? -400 : 400
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  const handleScrollUpdate = () => {
    const el = scrollRef.current
    if (el) {
      const left = el.scrollLeft
      const right = el.scrollWidth > left + el.clientWidth + 10
      setCanScrollLeft(left > 0)
      setCanScrollRight(right)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener("scroll", handleScrollUpdate)
      handleScrollUpdate()
      return () => el.removeEventListener("scroll", handleScrollUpdate)
    }
  }, [])

  return (
    <section className="relative w-full max-w-[1370px] mx-auto px-6 py-20">
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 -z-10"></div>
      <div className="pointer-events-none absolute -top-32 left-0 w-96 h-96 bg-red-200/20 blur-3xl rounded-full -z-10"></div>
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-yellow-200/20 blur-3xl rounded-full -z-10"></div>

      {/* Intro Section */}
      <Intro title={title} para={subtitle} />

      <div className="relative mt-10">
        {/* Navigation Buttons */}
        {products.length > 4 && (
          <>
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className={`absolute top-1/2 -translate-y-1/2 -left-4 z-20 p-4 rounded-full bg-black text-white shadow-lg hover:bg-red-600 transition duration-300 hidden lg:block
                ${!canScrollLeft && "opacity-30 pointer-events-none"}`}
            >
              <FaLongArrowAltLeft className="text-lg" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className={`absolute top-1/2 -translate-y-1/2 -right-4 z-20 p-4 rounded-full bg-black text-white shadow-lg hover:bg-red-600 transition duration-300 hidden lg:block
                ${!canScrollRight && "opacity-30 pointer-events-none"}`}
            >
              <FaLongArrowAltRight className="text-lg" />
            </button>
          </>
        )}

        {/* Product Cards */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-6"
        >
          {products.map((prod, idx) => {
            const { avg, count } = showRating ? calculateRating(prod._id) : { avg: null, count: null }

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="min-w-full sm:min-w-[48%] md:min-w-[31%] lg:min-w-[23%] bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden"
              >
                <Link href={`/Product/${prod._id}`}>
                  <div className="relative overflow-hidden h-[420px]">
                    <Image
                      src={prod.Photo[0]?.url || '/placeholder.jpg'}
                      alt={prod.name}
                      width={500}
                      height={700}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
                      <span className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">
                        View Product
                      </span>
                    </div>
                  </div>

                  <div className="p-5 text-center">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{prod.name}</h3>
                    <p className="text-red-600 font-extrabold text-xl mt-1">${prod.price}</p>

                    {showRating && (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <div className="flex text-yellow-500">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <CiStar
                                key={i}
                                className={`text-lg ${i < Math.round(avg) ? 'fill-yellow-500' : 'fill-gray-300'}`}
                              />
                            ))}
                        </div>
                        <span className="text-gray-800 font-medium text-sm">{avg} / 5</span>
                        <span className="text-gray-400 text-xs">({count} Reviews)</span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-14 flex justify-center">
        <Link
          href={ctaLink}
          className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg tracking-wider hover:bg-red-600 transition transform hover:scale-105 shadow-xl"
        >
          {ctaText}
        </Link>
      </div>
    </section>
  )
}

export default CollectionSection
