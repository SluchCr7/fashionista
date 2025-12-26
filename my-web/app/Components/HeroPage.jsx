'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const DEFAULT_SLIDES = [
  {
    id: 's1',
    image: '/Hero/home-slider1.jpg',
    eyebrow: 'Limited Time',
    title: (
      <>
        Grab up to <span className="text-destructive">50% Off</span>
        <br /> Selected Styles
      </>
    ),
    description:
      'Signature pieces, reinvented. Fast shipping — find your new favorite look today.',
    cta: { text: 'Shop Now', href: '/shop' },
  },
  {
    id: 's2',
    image: '/Hero/home-slider2.jpg',
    eyebrow: 'New Arrival',
    title: (
      <>
        Summer <span className="text-destructive">Collection</span> 2025
      </>
    ),
    description: 'Breezy silhouettes and fresh palettes — built for the season.',
    cta: { text: 'Explore Collection', href: '/collections' },
  },
  {
    id: 's3',
    image: '/Hero/home-slider3.jpg',
    eyebrow: 'Exclusive',
    title: (
      <>
        Limited Edition <span className="text-destructive">Pieces</span>
      </>
    ),
    description: 'Premium materials. Exceptional details. Once they’re gone — they’re gone.',
    cta: { text: 'Discover More', href: '/shop' },
  },
]

export default function Hero({ slides = DEFAULT_SLIDES, autoPlay = true, interval = 6000 }) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timer = useRef(null)
  const count = slides.length

  useEffect(() => {
    if (!autoPlay || isPaused) return
    timer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % count)
    }, interval)
    return () => clearInterval(timer.current)
  }, [autoPlay, isPaused, interval, count])

  useEffect(() => {
    return () => clearInterval(timer.current)
  }, [])

  const go = (i) => setIndex(((i % count) + count) % count)
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-background py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Slider */}
          <div className="col-span-12 lg:col-span-8 relative min-h-[420px] lg:min-h-[640px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              {slides.map((slide, i) => (
                i === index && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center p-8 md:p-16"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={slide.image}
                        alt="Hero Image"
                        fill
                        className="object-cover object-center"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/40" /> {/* Overlay for readability */}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center text-white max-w-2xl">
                      <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest uppercase bg-white/20 backdrop-blur-sm rounded-full"
                      >
                        {slide.eyebrow}
                      </motion.span>
                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6"
                      >
                        {slide.title}
                      </motion.h2>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-white/90 mb-8 font-light"
                      >
                        {slide.description}
                      </motion.p>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Link href={slide.cta?.href || '/shop'} className="inline-flex items-center gap-2 bg-white text-black font-medium px-8 py-3 rounded-full hover:bg-white/90 transition-colors">
                          {slide.cta?.text || 'Shop Now'} <ArrowRight className="w-5 h-5" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Arrows */}
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-20 pointer-events-none">
              <button
                onClick={prev}
                className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={next}
                className="pointer-events-auto p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Side Content */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* Card 1 */}
            <div className="group relative flex-1 min-h-[250px] rounded-2xl overflow-hidden shadow-lg">
              <Image src="/Hero/promo1.jpg" alt="Promo" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">New Season</span>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">Urban Essentials</h3>
                <Link href="/collections" className="inline-flex items-center text-white font-medium hover:underline">
                  Shop Collection <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>

            {/* Card 2 Split */}
            <div className="flex-1 min-h-[250px] grid grid-cols-2 gap-4">
              <div className="group relative rounded-2xl overflow-hidden shadow-lg">
                <Image src="/Hero/promo2.jpg" alt="Accessories" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h4 className="text-lg font-serif font-bold text-white">Bags</h4>
                </div>
              </div>
              <div className="group relative rounded-2xl overflow-hidden shadow-lg">
                <Image src="/Hero/promo3.jpg" alt="Summer Hats" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h4 className="text-lg font-serif font-bold text-white">Hats</h4>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
