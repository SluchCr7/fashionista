'use client'

import React, { useState, useMemo, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CiStar } from 'react-icons/ci'
import { FaShoppingCart, FaChevronRight } from 'react-icons/fa'
import { ProductContext } from '@/app/Context/ProductContext'
import { ReviewContext } from '@/app/Context/ReviewContext'

/* =========================
   ⭐ Rating Component
   ========================= */
const Rating = ({ rating = 0, size = 18, count = 5 }) => {
  const stars = []
  for (let i = 0; i < count; i++) {
    const filled = i < Math.round(rating)
    stars.push(
      <CiStar key={i} className={filled ? 'text-yellow-400' : 'text-gray-300'} size={size} />
    )
  }
  return <div className="flex items-center gap-1">{stars}</div>
}

/* =========================
   ⭐ Skeleton Loader
   ========================= */
const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
    <div className="h-48 sm:h-56 md:h-64 bg-gray-200" />
    <div className="p-4">
      <div className="h-4 bg-gray-200 w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 w-full rounded" />
    </div>
  </div>
)

/* =========================
   ⭐ MAIN COMPONENT
   ========================= */
export default function ShoesRedesign() {
  const { products = [] } = useContext(ProductContext)
  const { Reviews = [] } = useContext(ReviewContext)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [gender, setGender] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)
  const perPage = 9
  const [loading, setLoading] = useState(false)

  /* =========================
       BRANDS LIST
     ========================= */
  const brands = useMemo(() => {
    const b = new Set()
    products.forEach(p => p?.brand && b.add(p.brand))
    return Array.from(b)
  }, [products])

  /* =========================
       RATING MERGE LOGIC
     ========================= */
  const productsWithRating = useMemo(() => {
    return products.map(p => {
      const pr = Reviews.filter(r => r?.product?._id === p._id)
      const avg = pr.length ? pr.reduce((a, r) => a + (r.rating || 0), 0) / pr.length : 0
      return { ...p, avgRating: avg, reviewsCount: pr.length }
    })
  }, [products, Reviews])

  /* =========================
       FILTERING
     ========================= */
  const filtered = useMemo(() => {
    let list = productsWithRating.filter(p => p?.category === 'Shoes')

    if (gender !== 'All') list = list.filter(p => (p.gender || 'All') === gender)
    if (query) list = list.filter(p => (p.name || '').toLowerCase().includes(query.toLowerCase()))
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand))

    list = list.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1])

    /* Sorting */
    switch (sort) {
      case 'price-asc': list.sort((a,b) => a.price - b.price); break
      case 'price-desc': list.sort((a,b) => b.price - a.price); break
      case 'rating': list.sort((a,b) => (b.avgRating||0) - (a.avgRating||0)); break
      default: break
    }

    return list
  }, [productsWithRating, gender, query, selectedBrands, priceRange, sort])

  /* =========================
       PAGINATION
     ========================= */
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  useEffect(() => setPage(1), [query, gender, selectedBrands, priceRange, sort])
  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  const toggleBrand = (b) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])

  /* Loading UX */
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [query, sort, gender, selectedBrands, priceRange, page])

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">

      {/* HERO SECTION - MOBILE FIRST IMPROVED */}
      <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-8">

          {/* LEFT TEXT */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} className="text-3xl md:text-5xl font-extrabold leading-snug">
              Step into the Future — <span className="text-yellow-400">Premium Shoes</span>
            </motion.h1>

            <p className="mt-4 text-gray-200 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base">
              Curated collections from top brands. Engineered comfort, modern design.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <Link href="/Shop?category=Shoes" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow hover:scale-[1.02] transition">
                Shop Shoes <FaChevronRight />
              </Link>
              <Link href="/collections/new" className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-full text-white/90 hover:bg-white/5 transition">
                New Arrivals
              </Link>
            </div>
          </div>

          {/* HERO IMAGES */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden bg-white/5 p-3">
              <Image src="/Hero/hero_shoe_1.jpg" alt="hero 1" width={600} height={400} className="object-cover rounded-lg" />
            </div>

            <div className="relative rounded-xl overflow-hidden bg-white/5 p-3">
              <Image src="/Hero/hero_shoe_2.jpg" alt="hero 2" width={600} height={400} className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="w-full max-w-7xl px-4 sm:px-6 -mt-10 md:-mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* =========================
               SIDEBAR FILTERS
             ========================= */}
          <aside className="col-span-1 bg-white rounded-xl shadow p-5 sticky top-20 h-fit order-2 lg:order-1">
            <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* Search */}
            <input
              type="text"
              placeholder="Search shoes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-black/50"
            />

            {/* Gender Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Gender</h3>
              {['All', 'Men', 'Women', 'Unisex'].map((g) => (
                <label key={g} className="flex items-center gap-2 mb-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={gender === g}
                    onChange={() => setGender(g)}
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Brands</h3>
              <div className="grid grid-cols-2 gap-2">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => toggleBrand(b)}
                    className={`px-3 py-2 rounded-lg border text-sm transition ${selectedBrands.includes(b)
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full"
              />
              <p className="text-sm mt-1 text-gray-600">Up to ${priceRange[1]}</p>
            </div>

            {/* Sort */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Sort by</h3>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </aside>

          <section className="col-span-1 lg:col-span-3 order-1 lg:order-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Shoes Collection</h2>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('grid')}
                  className={`px-3 py-1 rounded ${view === 'grid' ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-3 py-1 rounded ${view === 'list' ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  List
                </button>
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* PRODUCT GRID */}
            {!loading && paged.length > 0 && (
              <div className={`${view === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'}`}
              >
                {paged.map((p) => (
                  <Link
                    href={`/Product/${p._id}`}
                    key={p._id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
                  >
                    <div className="relative h-60 bg-gray-100">
                      <Image
                        src={p.image?.url || '/placeholder.jpg'}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-2 py-1 rounded">{p.brand}</span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
                      <Rating rating={p.avgRating} />
                      <p className="text-black font-bold mt-2">${p.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* EMPTY */}
            {!loading && paged.length === 0 && (
              <p className="text-gray-600 text-center py-10">No products match your filters.</p>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded ${page === i + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
