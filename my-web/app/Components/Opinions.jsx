'use client'
import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import Image from 'next/image'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Intro from './Intro'
import { testimonials } from '../Data'

const Opinions = memo(() => {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const count = testimonials?.length || 0

  const safeIndex = (i) => (count ? (i + count) % count : 0)

  const next = useCallback(() => setIndex((i) => safeIndex(i + 1)), [count])
  const prev = useCallback(() => setIndex((i) => safeIndex(i - 1)), [count])

  // Auto play
  useEffect(() => {
    if (isPaused || !count) return
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [isPaused, count, next])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev])

  if (!count) return null
  const t = testimonials[index]
  const rating = typeof t.rating === 'number' ? t.rating : 5

  const Stars = ({ rating }) => (
    <div className="flex justify-center gap-1 mt-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-lg ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  )

  return (
    <section
      className="relative w-full py-24 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
      aria-label="Customer Testimonials"
    >
      {/* Subtle gradient blobs for luxury feel */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-300/20 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300/20 rounded-full blur-[180px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <Intro
          title="What Our Customers Say"
          para="Trusted by thousands of happy customers worldwide"
        />

        {/* === Main Card Slider === */}
        <div
          className="relative mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) next()
                  if (info.offset.x > 80) prev()
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-10 flex flex-col items-center">
                  <FaQuoteLeft className="text-4xl text-red-500 mb-6 opacity-80" />

                  <p className="text-gray-700 text-lg md:text-xl italic leading-relaxed max-w-2xl">
                    “{t.opinion}”
                  </p>

                  <Stars rating={rating} />

                  <div className="mt-8">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={90}
                      height={90}
                      className="rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">
                      {t.name}
                    </h3>
                    <p className="text-sm text-red-600 font-medium">{t.job}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            aria-label="Previous"
            onClick={prev}
            className="absolute left-0 md:left-[-50px] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
          >
            <FaChevronLeft className="text-gray-700 text-lg" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            aria-label="Next"
            onClick={next}
            className="absolute right-0 md:right-[-50px] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
          >
            <FaChevronRight className="text-gray-700 text-lg" />
          </motion.button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === i ? 'w-6 bg-red-500' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href="/Reviews"
            className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-red-700 transition-all duration-300 shadow-md"
          >
            Read More Reviews
          </a>
        </div>
      </div>
    </section>
  )
})

Opinions.displayName = 'Opinions'
export default Opinions
