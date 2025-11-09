'use client'

import React, { useState, useMemo, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CiStar } from 'react-icons/ci'
import { FaShoppingCart, FaFilter, FaChevronRight } from 'react-icons/fa'
import { ProductContext } from '@/app/Context/ProductContext'
import { ReviewContext } from '@/app/Context/ReviewContext'

// === Utility components inside the same file for convenience ===
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

const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
    <div className="h-56 bg-gray-200" />
    <div className="p-4">
      <div className="h-4 bg-gray-200 w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 w-full rounded" />
    </div>
  </div>
)

// === Main redesigned Shoes page ===
export default function ShoesRedesign() {
  const { products = [] } = useContext(ProductContext)
  const { Reviews = [] } = useContext(ReviewContext)

  // Local UI state
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [gender, setGender] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [view, setView] = useState('grid') // grid | list
  const [page, setPage] = useState(1)
  const perPage = 9
  const [loading, setLoading] = useState(false)

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

  // Filtering
  const filtered = useMemo(() => {
    let list = productsWithRating.filter(p => p?.category === 'Shoes')
    if (gender !== 'All') list = list.filter(p => (p.gender || 'All') === gender)
    if (query) list = list.filter(p => (p.name || '').toLowerCase().includes(query.toLowerCase()))
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand))
    list = list.filter(p => Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1])

    // Sort
    switch (sort) {
      case 'price-asc': list = list.sort((a,b) => a.price - b.price); break
      case 'price-desc': list = list.sort((a,b) => b.price - a.price); break
      case 'rating': list = list.sort((a,b) => (b.avgRating||0) - (a.avgRating||0)); break
      default: break
    }

    return list
  }, [productsWithRating, gender, query, selectedBrands, priceRange, sort])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  useEffect(() => {
    setPage(1)
  }, [query, gender, selectedBrands, priceRange, sort])

  const paged = filtered.slice((page - 1) * perPage, page * perPage)

  // Handlers
  const toggleBrand = (b) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x=>x!==b) : [...prev, b])

  // Small UX: simulate loading when user changes filters quickly
  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [query, sort, gender, selectedBrands, priceRange, page])

  return (
    <div className="w-full flex flex-col items-center bg-gray-50">

      {/* HERO */}
      <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .6 }} className="text-4xl md:text-5xl font-extrabold leading-tight">
              Step into the Future — <span className="text-yellow-400">Premium Shoes</span>
            </motion.h1>
            <p className="mt-4 max-w-lg text-gray-200">Curated collections from top brands. Engineered comfort, modern design, crafted for everyday performance.</p>

            <div className="mt-6 flex gap-3">
              <Link href="/Shop?category=Shoes" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow hover:scale-[1.02] transition">
                Shop Shoes <FaChevronRight />
              </Link>

              <Link href="/collections/new" className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 rounded-full text-white/90 hover:bg-white/5 transition">
                New Arrivals
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            {/* hero mini cards */}
            <div className="relative rounded-xl overflow-hidden bg-white/5 p-4">
              <Image src="/Hero/hero_shoe_1.jpg" alt="hero 1" width={600} height={400} className="object-cover rounded-lg" />
            </div>
            <div className="relative rounded-xl overflow-hidden bg-white/5 p-4">
              <Image src="/Hero/hero_shoe_2.jpg" alt="hero 2" width={600} height={400} className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-7xl px-6 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* SIDEBAR FILTERS */}
          <aside className="col-span-1 bg-white rounded-xl shadow p-5 sticky top-20 h-fit">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => { setGender('All'); setSelectedBrands([]); setPriceRange([0,1000]); setQuery('') }} className="text-sm text-gray-500">Reset</button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search model, color, code" className="mt-2 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="mt-2 flex gap-2">
                  {['All','Women','Men','Unisex'].map(g => (
                    <button key={g} onClick={() => setGender(g)} className={`px-3 py-2 rounded-md text-sm ${gender===g ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-700'}`}>{g}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Brands</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {brands.map((b) => (
                    <button key={b} onClick={() => toggle({ b })} className="text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-md text-left">{b}</button>
                  ))}
                </div>
                {/* Friendly brand checkbox list */}
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
                  <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value||0), priceRange[1]])} className="w-1/2 px-2 py-1 border rounded" />
                  <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value||1000)])} className="w-1/2 px-2 py-1 border rounded" />
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

          {/* PRODUCTS LIST */}
          <section className="col-span-3">
            <div className="flex items-center justify-between mb-4 gap-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setView('grid')} className={`px-3 py-2 rounded ${view==='grid' ? 'bg-white shadow' : 'bg-gray-100'}`}>Grid</button>
                <button onClick={() => setView('list')} className={`px-3 py-2 rounded ${view==='list' ? 'bg-white shadow' : 'bg-gray-100'}`}>List</button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Page {page} / {totalPages}</span>
                <div className="flex gap-2">
                  <button disabled={page<=1} onClick={() => setPage(p => Math.max(1, p-1))} className="px-3 py-2 rounded bg-white shadow">Prev</button>
                  <button disabled={page>=totalPages} onClick={() => setPage(p => Math.min(totalPages, p+1))} className="px-3 py-2 rounded bg-white shadow">Next</button>
                </div>
              </div>
            </div>

            {/* Grid / List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: perPage }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
                {paged.map(prod => (
                  <motion.article key={prod._id} whileHover={{ y: -6 }} className="bg-white rounded-xl shadow overflow-hidden flex flex-col">

                    <div className="relative h-64 w-full">
                      <Image src={prod?.Photo?.[0]?.url || '/placeholder.png'} alt={prod?.name} fill className="object-cover" sizes="(min-width:1024px) 400px, 100vw" />

                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button className="bg-white/90 p-2 rounded-full shadow text-gray-800 hover:scale-105 transition" aria-label="Add to cart">
                          <FaShoppingCart />
                        </button>
                      </div>

                      <div className="absolute left-3 top-3 bg-black/50 text-white px-3 py-1 rounded">{prod?.tag || 'New'}</div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-semibold truncate">{prod?.name}</h4>
                        <p className="text-sm text-gray-500 mt-1 truncate">{prod?.short || prod?.description?.slice(0, 90)}</p>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Rating rating={prod.avgRating} />
                            <span className="text-sm text-gray-400">({prod.reviewsCount})</span>
                          </div>
                          <div className="text-DarkRed text-lg font-bold">${prod.price}</div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Link href={`/Product/${prod._id}`} className="flex-1 inline-flex items-center justify-center gap-2 border rounded-full px-4 py-2 hover:bg-gray-50">View</Link>
                        <button className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">Add</button>
                      </div>
                    </div>

                  </motion.article>
                ))}

                {/* empty state */}
                {paged.length === 0 && (
                  <div className="col-span-full bg-white rounded-xl p-8 text-center">
                    <h3 className="text-xl font-semibold">No products found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting filters or clear search.</p>
                  </div>
                )}
              </div>
            )}

            {/* pagination small */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i+1)} className={`px-3 py-1 rounded ${page===i+1 ? 'bg-yellow-400 text-black' : 'bg-white border'}`}>{i+1}</button>
              ))}
            </div>

          </section>
        </div>

        {/* Brands carousel */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold">Shop by Brand</h3>
          <div className="mt-4 flex items-center gap-6 overflow-x-auto py-3">
            {brands.length ? brands.map((b, i) => (
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
          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Limited Time — Extra 20% Off Select Shoes</h2>
              <p className="mt-2 text-sm text-gray-800">Use code <strong>STEP20</strong> at checkout. Selected styles only — while stocks last.</p>
            </div>

            <div className="mt-6 md:mt-0">
              <Link href="/Shop?category=Shoes" className="px-6 py-3 rounded-full bg-black text-white font-semibold shadow">Shop the Sale</Link>
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

// small helper missing inlined to avoid extra imports
function toggle({ b }) { /* noop placeholder so file doesn't break inside canvas preview when editing */ }
