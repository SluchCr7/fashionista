'use client'
import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import Image from 'next/image'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Intro from './Intro'
import { testimonials } from '../Data'

const Opinions = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const count = testimonials?.length || 0
  const safeIndex = (i: number) => (count ? (i + count) % count : 0)

  const nextSlide = useCallback(() => {
    if (!count) return
    setCurrentIndex((p) => safeIndex(p + 1))
  }, [count])

  const prevSlide = useCallback(() => {
    if (!count) return
    setCurrentIndex((p) => safeIndex(p - 1))
  }, [count])

  // Auto-play (pause on hover)
  useEffect(() => {
    if (!count || isHovered) return
    const id = setInterval(nextSlide, 5000)
    return () => clearInterval(id)
  }, [count, isHovered, nextSlide])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [nextSlide, prevSlide])

  // Star rating (uses testimonial.rating if available, else 5)
  const Stars = ({ rating = 5 }: { rating?: number }) => (
    <div className="flex items-center gap-1" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </div>
  )

  if (!count) return null

  const t = testimonials[currentIndex]
  const rating = typeof (t as any).rating === 'number' ? (t as any).rating : 5

  return (
    <section
      className="relative w-full py-20 overflow-hidden"
      aria-label="Customer Testimonials"
    >
      {/* Background gradient + subtle shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-red-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <Intro
          title="What Our Customers Say"
          para="Real feedback from our happy shoppers"
        />

        {/* Slider */}
        <div
          ref={sliderRef}
          className="relative mt-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="mx-auto w-full max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.45 }}
              >
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80 || info.velocity.x < -300) nextSlide()
                    if (info.offset.x > 80 || info.velocity.x > 300) prevSlide()
                  }}
                  className="w-full cursor-grab active:cursor-grabbing select-none"
                >
                  <div className="flex flex-col items-center gap-5 text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
                    <FaQuoteLeft aria-hidden className="text-4xl text-DarkRed" />
                    <p className="text-gray-700 text-lg md:text-xl italic leading-relaxed">
                      {t.opinion}
                    </p>

                    <Stars rating={rating} />

                    <Image
                      src={t.img}
                      alt={t.name}
                      width={88}
                      height={88}
                      className="w-22 h-22 rounded-full object-cover border-4 border-red-100"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-gray-900">{t.name}</span>
                      <span className="text-sm text-DarkRed">{t.job}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            aria-label="Previous testimonial"
            onClick={prevSlide}
            className="absolute left-0 md:left-[-24px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          >
            <FaChevronLeft className="text-gray-800" />
          </button>
          <button
            aria-label="Next testimonial"
            onClick={nextSlide}
            className="absolute right-0 md:right-[-24px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          >
            <FaChevronRight className="text-gray-800" />
          </button>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'w-6 bg-black' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="/Reviews"
            className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3 text-white font-semibold hover:bg-red-600 transition"
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
