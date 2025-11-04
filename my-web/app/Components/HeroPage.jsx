'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'


const DEFAULT_SLIDES = [
  {
    id: 's1',
    image: '/Hero/home-slider1.jpg',
    eyebrow: 'Limited Time',
    title: (
      <>
        Grab up to <span className="text-yellow-400">50% Off</span>
        <br /> Selected Styles
      </>
    ),
    description:
      'Signature pieces, reinvented. Fast shipping — find your new favorite look today.',
    cta: { text: 'Shop Now', href: '/shop' },
    theme: 'light',
  },
  {
    id: 's2',
    image: '/Hero/home-slider2.jpg',
    eyebrow: 'New Arrival',
    title: (
      <>
        Summer <span className="text-yellow-400">Collection</span> 2025
      </>
    ),
    description: 'Breezy silhouettes and fresh palettes — built for the season.',
    cta: { text: 'Explore Collection', href: '/collections' },
    theme: 'dark',
  },
  {
    id: 's3',
    image: '/Hero/home-slider3.jpg',
    eyebrow: 'Exclusive',
    title: (
      <>
        Limited Edition <span className="text-yellow-400">Pieces</span>
      </>
    ),
    description: 'Premium materials. Exceptional details. Once they’re gone — they’re gone.',
    cta: { text: 'Discover More', href: '/limited' },
    theme: 'light',
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
    // cleanup on unmount
    return () => clearInterval(timer.current)
  }, [])

  const go = (i) => setIndex(((i % count) + count) % count)
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  // keyboard accessibility
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
      className="relative w-full overflow-hidden bg-gray-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left / Main slider (dominant) */}
          <div className="col-span-12 lg:col-span-8 relative min-h-[420px] lg:min-h-[640px] rounded-xl overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              {slides.map((slide, i) => (
                i === index && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full flex items-center"
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 -z-10">
                      <Image
                        src={slide.image}
                        alt={(typeof slide.title === 'string' ? slide.title : 'Hero image')}
                        fill
                        sizes="(min-width: 1024px) 900px, 100vw"
                        className="object-cover object-center"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/25 mix-blend-multiply" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 px-6 md:px-12 lg:px-16 max-w-3xl mx-auto text-center lg:text-left">
                      <p className="text-sm md:text-base text-yellow-300 font-medium tracking-wide mb-3">{slide.eyebrow}</p>
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-lg">
                        {slide.title}
                      </h2>
                      <p className="mt-4 text-sm md:text-base text-gray-200 max-w-xl">{slide.description}</p>

                      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:gap-4 justify-center lg:justify-start">
                        <Link href={slide.cta?.href || '/'} className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full text-base uppercase tracking-wide hover:scale-[1.02] transition-shadow shadow-lg">
                          {slide.cta?.text || 'Shop Now'} <FiArrowRight />
                        </Link>

                        {slide.cta?.secondary && (
                          <Link href={slide.cta.secondary.href} className="mt-3 sm:mt-0 inline-flex items-center gap-2 text-white/90 px-4 py-2 rounded-md border border-white/20 hover:bg-white/5 transition">
                            {slide.cta.secondary.text}
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Navigation arrows (large screens) */}
                    <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-20">
                      <button aria-label="Previous slide" onClick={prev} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white shadow">
                        <FiChevronLeft />
                      </button>
                      <button aria-label="Next slide" onClick={next} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white shadow">
                        <FiChevronRight />
                      </button>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Small dots (below) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-30 flex items-center gap-3">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`w-10 h-2 rounded-full transition-all ${i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>

          {/* Right column - promo cards / categories (secondary) */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <div className="h-1/2 min-h-[180px] rounded-xl overflow-hidden relative bg-white shadow-md">
              <Image src="/Hero/promo1.jpg" alt="Promo" fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute z-10 left-6 bottom-6">
                <p className="text-sm text-yellow-300 font-medium">New Drop</p>
                <h3 className="text-lg font-bold text-white">Urban Essentials</h3>
                <Link href="/collections/urban" className="mt-3 inline-flex items-center gap-2 text-black bg-white px-4 py-2 rounded-full font-semibold">
                  Shop <FiArrowRight />
                </Link>
              </div>
            </div>

            <div className="h-1/2 min-h-[180px] rounded-xl overflow-hidden relative bg-white shadow-md grid grid-cols-2">
              <div className="relative">
                <Image src="/Hero/promo2a.jpg" alt="Category" fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute z-10 left-4 bottom-4">
                  <p className="text-xs text-white/90">Accessories</p>
                  <h4 className="text-sm font-semibold text-white">Bags & Wallets</h4>
                </div>
              </div>

              <div className="relative">
                <Image src="/Hero/promo2b.jpg" alt="Category" fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute z-10 left-4 bottom-4">
                  <p className="text-xs text-white/90">Trending</p>
                  <h4 className="text-sm font-semibold text-white">Summer Hats</h4>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* PRESET: small sticky CTA on mobile */}
      <div className="lg:hidden fixed left-4 right-4 bottom-6 z-40">
        <div className="bg-white/95 backdrop-blur rounded-full shadow-lg px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src={slides[index].image} alt="thumb" width={64} height={64} className="rounded-md object-cover" />
            <div>
              <p className="text-xs text-gray-500">{slides[index].eyebrow}</p>
              <p className="text-sm font-semibold">{typeof slides[index].title === 'string' ? slides[index].title : 'Latest'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev} aria-label="Prev" className="p-2 rounded-full border">
              <FiChevronLeft />
            </button>
            <Link href={slides[index].cta?.href || '/'} className="bg-yellow-400 px-4 py-2 rounded-full font-semibold">
              {slides[index].cta?.text || 'Shop'}
            </Link>
            <button onClick={next} aria-label="Next" className="p-2 rounded-full border">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
