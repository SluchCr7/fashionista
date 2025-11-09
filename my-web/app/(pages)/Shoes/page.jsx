'use client'

import React, { useState, useMemo, useContext, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CiStar } from 'react-icons/ci'
import { FaShoppingCart, FaFilter, FaChevronRight, FaTimes } from 'react-icons/fa'
import { ProductContext } from '@/app/Context/ProductContext'
import { ReviewContext } from '@/app/Context/ReviewContext'

/* =========================
   Small utility components
   ========================= */

const Rating = ({ rating = 0, size = 16, count = 5 }) => {
  const stars = []
  for (let i = 0; i < count; i++) {
    const filled = i < Math.round(rating)
    stars.push(<CiStar key={i} className={filled ? 'text-yellow-400' : 'text-gray-300'} size={size} />)
  }
  return <div className="flex items-center gap-1">{stars}</div>
}

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow overflow-hidden">
    <div className="h-44 sm:h-52 md:h-56 bg-gray-200" />
    <div className="p-4">
      <div className="h-4 bg-gray-200 w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 w-1/2 mb-3" />
      <div className="h-8 bg-gray-200 w-full rounded" />
    </div>
  </div>
)

/* Product Card - memoized for performance */
const ProductCard = React.memo(function ProductCard({ prod, view }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      layout
      className={`bg-white rounded-xl shadow overflow-hidden flex ${view === 'list' ? 'flex-row items-stretch' : 'flex-col'}`}
    >
      <div className={view === 'list' ? 'relative w-40 h-40 flex-shrink-0' : 'relative h-56 w-full'}>
        <Image
          src={prod?.Photo?.[0]?.url || '/placeholder.png'}
          alt={prod?.name || 'Product'}
          fill
          sizes="(min-width:1280px) 360px, (min-width:768px) 33vw, 100vw"
          className="object-cover"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="bg-white/90 p-2 rounded-full shadow text-gray-800 hover:scale-105 transition" aria-label="Add to cart">
            <FaShoppingCart />
          </button>
        </div>
        <div className="absolute left-3 top-3 bg-black/60 text-white px-3 py-1 rounded text-xs">{prod?.tag || 'New'}</div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-lg font-semibold truncate">{prod?.name}</h4>
          <p className="text-sm text-gray-500 mt-1 truncate">{prod?.short || (prod?.description || '').slice(0, 90)}</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rating rating={prod.avgRating} />
              <span className="text-sm text-gray-400">({prod.reviewsCount})</span>
            </div>
            <div className="text-red-700 text-lg font-bold">${prod.price}</div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/Product/${prod._id}`} className="flex-1 inline-flex items-center justify-center gap-2 border rounded-full px-4 py-2 hover:bg-gray-50 text-sm">
            View
          </Link>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold text-sm">Add</button>
        </div>
      </div>
    </motion.article>
  )
})

/* =========================
   Main Component
   ========================= */

export default function ShoesRedesign() {
  const { products = [] } = useContext(ProductContext)
  const { Reviews = [] } = useContext(ReviewContext)

  // UI state
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [gender, setGender] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000]) // [min, max]
  const [selectedBrands, setSelectedBrands] = useState([])
  const [view, setView] = useState('grid') // 'grid' | 'list'
  const [page, setPage] = useState(1)
  const perPage = 9
  const [loading, setLoading] = useState(false)

  // Mobile UI
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [collapsedFilters, setCollapsedFilters] = useState({
    brands: false,
    price: true,
    sort: true,
  })

  // Derived lists
  const brands = useMemo(() => {
    const b = new Set()
    products.forEach(p => p?.brand && b.add(p.brand))
    return Array.from(b)
  }, [products])

  const productsWithRating = useMemo(() => {
    return products.map(p => {
      const pr = Reviews.filter(r => r?.product?._id === p._id)
      const avg = pr.length ? pr.reduce((a, r) => a + (r.rating || 0), 0) / pr.length : 0
      return { ...p, avgRating: avg, reviewsCount: pr.length }
    })
  }, [products, Reviews])

  // Filtering & Sorting
  const filtered = useMemo(() => {
    let list = productsWithRating.filter(p => p?.category === 'Shoes')

    if (gender !== 'All') list = list.filter(p => (p.gender || 'All') === gender)
    if (query) list = list.filter(p => (p.name || '').toLowerCase().includes(query.toLowerCase()))
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand))
    list = list.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1])

    switch (sort) {
      case 'price-asc': list = list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list = list.sort((a, b) => b.price - a.price); break
      case 'rating': list = list.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0)); break
      default: break
    }

    return list
  }, [productsWithRating, gender, query, selectedBrands, priceRange, sort])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  useEffect(() => setPage(1), [query, gender, selectedBrands, priceRange, sort])

  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  // Handlers
  const toggleBrand = useCallback((b) => {
    setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])
  }, [])

  // Fix earlier toggle placeholder: provide function to support mini brand buttons (keeps backward compatibility)
  function toggle({ b }) { toggleBrand(b) }

  // small loading simulation for UX
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(t)
  }, [query, sort, gender, selectedBrands, priceRange, page])

  // lock body scroll when filters drawer open on mobile
  useEffect(() => {
    if (filtersOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [filtersOpen])

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">

      {/* HERO */}
      <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .5 }} className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Step into the Future — <span className="text-yellow-400">Premium Shoes</span>
            </motion.h1>
            <p className="mt-3 max-w-lg mx-auto lg:mx-0 text-gray-200 text-sm sm:text-base">
              Curated collections from top brands. Engineered comfort, modern design, crafted for everyday performance.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
              <Link href="/Shop?category=Shoes" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-5 sm:px-6 py-2.5 rounded-full font-semibold shadow hover:scale-[1.02] transition">
                Shop Shoes <FaChevronRight />
              </Link>

              <Link href="/collections/new" className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 rounded-full text-white/90 hover:bg-white/5 transition">
                New Arrivals
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3">
            <div className="relative rounded-xl overflow-hidden bg-white/5 p-2 sm:p-4">
              <Image src="/Hero/bg_shoes_wom.jpg" alt="hero 1" width={800} height={600} className="object-cover rounded-lg" />
            </div>
            <div className="relative rounded-xl overflow-hidden bg-white/5 p-2 sm:p-4">
              <Image src="/Hero/bg_men.jpg" alt="hero 2" width={800} height={600} className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* SIDEBAR FILTERS - desktop / tablet */}
          <aside className="hidden lg:block col-span-1 bg-white rounded-xl shadow p-5 sticky top-20 h-fit">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => { setGender('All'); setSelectedBrands([]); setPriceRange([0, 1000]); setQuery('') }}
                className="text-sm text-gray-500"
              >
                Reset
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search model, color, code"
                  className="mt-2 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {['All', 'Women', 'Men', 'Unisex'].map(g => (
                    <button key={g} onClick={() => setGender(g)} className={`px-3 py-2 rounded-md text-sm ${gender === g ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-700'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Brands</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {brands.map(b => (
                    <button key={b} onClick={() => toggleBrand(b)} className={`text-sm px-3 py-2 rounded-md text-left ${selectedBrands.includes(b) ? 'bg-black text-white' : 'bg-gray-100'}`}>
                      {b}
                    </button>
                  ))}
                </div>

                <div className="mt-3 space-y-2 max-h-36 overflow-auto pr-2">
                  {brands.slice(0, 40).map(b => (
                    <label key={b} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="w-4 h-4" />
                      <span className="truncate">{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <div className="mt-2 flex items-center gap-2">
                  <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value || 0), priceRange[1]])} className="w-1/2 px-2 py-1 border rounded" />
                  <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value || 1000)])} className="w-1/2 px-2 py-1 border rounded" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Sort</label>
                <select value={sort} onChange={e => setSort(e.target.value)} className="mt-2 w-full px-3 py-2 border rounded-md">
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div className="pt-2 border-t mt-2">
                <p className="text-sm text-gray-500">Showing <strong>{filtered.length}</strong> results</p>
              </div>
            </div>
          </aside>

          {/* MOBILE FILTERS BUTTON & drawer */}
          <div className="col-span-full lg:hidden flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setFiltersOpen(true)} className="inline-flex items-center gap-2 px-3 py-2 rounded bg-white shadow">
                <FaFilter /> <span className="hidden sm:inline">Filters</span>
              </button>

              <div className="inline-flex items-center gap-2">
                <button onClick={() => setView('grid')} className={`px-3 py-2 rounded ${view === 'grid' ? 'bg-white shadow' : 'bg-gray-100'}`}>Grid</button>
                <button onClick={() => setView('list')} className={`px-3 py-2 rounded ${view === 'list' ? 'bg-white shadow' : 'bg-gray-100'}`}>List</button>
              </div>
            </div>

            <div className="text-sm text-gray-600">Page {page} / {totalPages}</div>
          </div>

          <AnimatePresence>
            {filtersOpen && (
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-5 shadow-lg lg:hidden"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button onClick={() => setFiltersOpen(false)} className="p-2 rounded bg-gray-100">
                    <FaTimes />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Search</label>
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search model, color, code" className="mt-2 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {['All', 'Women', 'Men', 'Unisex'].map(g => (
                        <button key={g} onClick={() => setGender(g)} className={`px-3 py-2 rounded-md text-sm ${gender === g ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-700'}`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => setCollapsedFilters(prev => ({ ...prev, brands: !prev.brands }))}
                      className="w-full text-left flex items-center justify-between"
                    >
                      <span className="font-medium">Brands</span>
                      <span className="text-sm text-gray-500">{collapsedFilters.brands ? 'Hide' : 'Show'}</span>
                    </button>

                    {collapsedFilters.brands && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {brands.map(b => (
                          <button key={b} onClick={() => toggleBrand(b)} className={`text-sm px-3 py-2 rounded-md text-left ${selectedBrands.includes(b) ? 'bg-black text-white' : 'bg-gray-100'}`}>
                            {b}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <button onClick={() => setCollapsedFilters(prev => ({ ...prev, price: !prev.price }))} className="w-full text-left flex items-center justify-between">
                      <span className="font-medium">Price</span>
                      <span className="text-sm text-gray-500">{collapsedFilters.price ? 'Hide' : 'Show'}</span>
                    </button>

                    {collapsedFilters.price && (
                      <div className="mt-2">
                        <input type="range" min="0" max="5000" value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full" />
                        <p className="text-sm mt-1 text-gray-600">Up to ${priceRange[1]}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <button onClick={() => setCollapsedFilters(prev => ({ ...prev, sort: !prev.sort }))} className="w-full text-left flex items-center justify-between">
                      <span className="font-medium">Sort</span>
                      <span className="text-sm text-gray-500">{collapsedFilters.sort ? 'Hide' : 'Show'}</span>
                    </button>

                    {collapsedFilters.sort && (
                      <select value={sort} onChange={e => setSort(e.target.value)} className="mt-2 w-full px-3 py-2 border rounded-md">
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                    )}
                  </div>

                  <div className="pt-2 border-t mt-2">
                    <p className="text-sm text-gray-500">Showing <strong>{filtered.length}</strong> results</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => { setGender('All'); setSelectedBrands([]); setPriceRange([0, 1000]); setQuery('') }} className="flex-1 px-4 py-2 rounded bg-gray-100">Reset</button>
                      <button onClick={() => setFiltersOpen(false)} className="flex-1 px-4 py-2 rounded bg-yellow-400 text-black">Apply</button>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* PRODUCTS LIST */}
          <section className="col-span-3">
            {/* Top controls for larger screens */}
            <div className="hidden lg:flex items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setView('grid')} className={`px-3 py-2 rounded ${view === 'grid' ? 'bg-white shadow' : 'bg-gray-100'}`}>Grid</button>
                <button onClick={() => setView('list')} className={`px-3 py-2 rounded ${view === 'list' ? 'bg-white shadow' : 'bg-gray-100'}`}>List</button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Page {page} / {totalPages}</span>
                <div className="flex gap-2">
                  <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-2 rounded bg-white shadow disabled:opacity-50">Prev</button>
                  <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-2 rounded bg-white shadow disabled:opacity-50">Next</button>
                </div>
              </div>
            </div>

            {/* Grid / List */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: perPage }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
                {paged.map(prod => (
                  <ProductCard key={prod._id} prod={prod} view={view} />
                ))}

                {paged.length === 0 && (
                  <div className="col-span-full bg-white rounded-xl p-8 text-center">
                    <h3 className="text-xl font-semibold">No products found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting filters or clear search.</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination small */}
            <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
              <button onClick={() => setPage(1)} className="px-3 py-1 rounded bg-white border">First</button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-yellow-400 text-black' : 'bg-white border'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(totalPages)} className="px-3 py-1 rounded bg-white border">Last</button>
            </div>
          </section>
        </div>

        {/* Brands carousel */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold">Shop by Brand</h3>
          <div className="mt-4 flex items-center gap-6 overflow-x-auto py-3">
            {brands.length ? brands.map((b) => (
              <div key={b} className="flex-shrink-0 w-40 h-20 bg-gray-50 rounded-lg flex items-center justify-center border">
                <span className="font-medium text-gray-700 truncate">{b}</span>
              </div>
            )) : (
              <p className="text-gray-500">No brands yet</p>
            )}
          </div>
        </div>

        {/* CTA large */}
        <section className="mt-12 rounded-xl overflow-hidden relative bg-gradient-to-r from-yellow-400 to-orange-400">
          <div className="absolute inset-0 opacity-20 bg-[url('/Hero/cta_bg_overlay.jpg')] bg-cover" />
          <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold">Limited Time — Extra 20% Off Select Shoes</h2>
              <p className="mt-2 text-sm text-gray-800">Use code <strong>STEP20</strong> at checkout. Selected styles only — while stocks last.</p>
            </div>

            <div>
              <Link href="/Shop?category=Shoes" className="px-5 py-2 rounded-full bg-black text-white font-semibold shadow">Shop the Sale</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full mt-12 py-10 text-center text-gray-600">
        <div className="max-w-7xl mx-auto px-6">© {new Date().getFullYear()} YourStore — Crafted with care</div>
      </footer>
    </div>
  )
}
