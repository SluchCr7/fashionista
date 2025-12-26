'use client';

import React, { useState, useMemo, useContext, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CiStar } from 'react-icons/ci';
import { FaShoppingCart, FaFilter, FaTimes, FaHeart, FaArrowRight } from 'react-icons/fa';
import { ProductContext } from '@/app/Context/ProductContext';
import { ReviewContext } from '@/app/Context/ReviewContext';

/* =========================
   Utility Components
   ========================= */

const Rating = ({ rating = 0, size = 14 }) => {
  return (
    <div className="flex items-center gap-0.5 text-yellow-500">
      <CiStar size={size} className={rating >= 1 ? 'fill-current' : 'text-gray-300'} />
      <span className="text-xs font-semibold ml-1 text-gray-900">{rating.toFixed(1)}</span>
    </div>
  );
};

/* Skeleton Loader */
const SkeletonCard = () => (
  <div className="animate-pulse flex flex-col gap-3">
    <div className="bg-gray-200 aspect-[0.8] rounded-xl w-full" />
    <div className="h-4 bg-gray-200 w-2/3 rounded" />
    <div className="h-4 bg-gray-200 w-1/3 rounded" />
  </div>
);

/* Premium Product Card */
const ProductCard = React.memo(function ProductCard({ prod }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col gap-3 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[0.85] w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
        <Link href={`/Product/${prod._id}`}>
          <Image
            src={prod?.Photo?.[0]?.url || '/placeholder.png'}
            alt={prod?.name || 'Product'}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </Link>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 z-10">
          <button className="bg-white p-2.5 rounded-full shadow-lg text-gray-900 hover:bg-black hover:text-white transition-colors duration-300" aria-label="Add to cart">
            <FaShoppingCart size={14} />
          </button>
          <button className="bg-white p-2.5 rounded-full shadow-lg text-gray-900 hover:bg-black hover:text-white transition-colors duration-300" aria-label="Add to Wishlist">
            <FaHeart size={14} />
          </button>
        </div>

        {/* Tag using Glassmorphism */}
        {prod?.tag && (
          <div className="absolute left-3 top-3 bg-white/30 backdrop-blur-md border border-white/20 text-black px-3 py-1 text-xs font-medium rounded-full">
            {prod.tag}
          </div>
        )}

        {/* Quick Add Overlay (Mobile Friendly) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 bg-gradient-to-t from-black/80 to-transparent">
          <Link href={`/Product/${prod._id}`} className="block w-full text-center text-white text-sm font-semibold tracking-wide py-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white hover:text-black transition-all">
            VIEW DETAILS
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-medium text-gray-900 truncate pr-4">{prod?.name}</h3>
          <span className="font-bold text-gray-900 text-base">${prod.price}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{prod?.category} • {prod?.brand}</p>

        <div className="mt-1 flex items-center gap-2">
          <Rating rating={prod.avgRating} size={14} />
          <span className="text-xs text-gray-400">({prod.reviewsCount} reviews)</span>
        </div>
      </div>
    </motion.div>
  );
});

/* =========================
   Main Component
   ========================= */

export default function ShoesPage() {
  const { products = [] } = useContext(ProductContext);
  const { Reviews = [] } = useContext(ReviewContext);

  // Filter State
  const [filterState, setFilterState] = useState({
    query: '',
    sort: 'featured',
    gender: 'All',
    priceRange: [0, 2000],
    brands: []
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12; // Increased for better grid view

  // Derived Data
  const brandsList = useMemo(() => {
    const b = new Set();
    products.forEach(p => p?.brand && b.add(p.brand));
    return Array.from(b);
  }, [products]);

  const processedProducts = useMemo(() => {
    // 1. Attach Ratings
    const withRatings = products.map(p => {
      const pr = Reviews.filter(r => r?.product?._id === p._id);
      const avg = pr.length ? pr.reduce((a, r) => a + (r.rating || 0), 0) / pr.length : 0;
      return { ...p, avgRating: avg, reviewsCount: pr.length };
    });

    // 2. Filter & Sort
    let result = withRatings.filter(p => p?.category === 'Shoes');

    if (filterState.gender !== 'All') result = result.filter(p => (p.gender || 'All') === filterState.gender);
    if (filterState.query) result = result.filter(p => (p.name || '').toLowerCase().includes(filterState.query.toLowerCase()));
    if (filterState.brands.length) result = result.filter(p => filterState.brands.includes(p.brand));
    result = result.filter(p => Number(p.price) >= filterState.priceRange[0] && Number(p.price) <= filterState.priceRange[1]);

    switch (filterState.sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.avgRating - a.avgRating); break;
      default: break; // featured (default order)
    }

    return result;
  }, [products, Reviews, filterState]);

  const totalPages = Math.ceil(processedProducts.length / perPage) || 1;
  const currentProducts = processedProducts.slice((page - 1) * perPage, page * perPage);

  // Handlers
  const handleFilterChange = (key, value) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const toggleBrand = (brand) => {
    setFilterState(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
    setPage(1);
  };

  const resetFilters = () => setFilterState({ query: '', sort: 'featured', gender: 'All', priceRange: [0, 2000], brands: [] });

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">

      {/* 1. IMMERSIVE HERO */}
      <section className="relative h-[60vh] md:h-[70vh] w-full bg-neutral-900 overflow-hidden">
        <Image
          src="/Hero/bg_shoes_wom.jpg"
          alt="Shoes Hero"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4"
          >
            WALK THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200">TALK</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-300 text-lg md:text-xl max-w-2xl font-light mb-8"
          >
            Premium footwear designed for the modern visionary. Experience comfort engineered with style.
          </motion.p>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-orange-50 transition-colors"
            onClick={() => {
              document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Collection
          </motion.button>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <main id="shop-grid" className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button onClick={resetFilters} className="text-xs text-gray-500 hover:text-black underline decoration-gray-300">Clear All</button>
            </div>

            {/* Search */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search shoes..."
                value={filterState.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="w-full bg-gray-50 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-black placeholder-gray-400"
              />
            </div>

            {/* Categories / Gender */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-gray-500">Department</h3>
              <div className="flex flex-col gap-2">
                {['All', 'Men', 'Women', 'Unisex'].map(g => (
                  <label key={g} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filterState.gender === g ? 'border-black' : 'border-gray-300'}`}>
                      {filterState.gender === g && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <span className={`text-sm group-hover:text-black transition-colors ${filterState.gender === g ? 'text-black font-medium' : 'text-gray-600'}`}>
                      {g} {g === 'All' ? 'Shoes' : ''}
                    </span>
                    <input
                      type="radio"
                      name="gender"
                      className="hidden"
                      checked={filterState.gender === g}
                      onChange={() => handleFilterChange('gender', g)}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-gray-500">Brands</h3>
              <div className="grid grid-cols-2 gap-2">
                {brandsList.slice(0, 10).map(b => ( // Show top 10 brands
                  <div
                    key={b}
                    onClick={() => toggleBrand(b)}
                    className={`cursor-pointer px-3 py-2 rounded-md text-sm border transition-all ${filterState.brands.includes(b)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                      }`}
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-medium mb-4 text-sm uppercase tracking-wider text-gray-500">Price Range</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">${filterState.priceRange[0]}</span>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={filterState.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                  className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <span className="font-medium">${filterState.priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <p className="text-gray-500 text-sm">Showing <span className="text-black font-semibold">{processedProducts.length}</span> Results</p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <FaFilter size={12} /> Filters
                </button>

                <div className="relative group flex-1 sm:flex-none">
                  <select
                    value={filterState.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-full sm:w-48 appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-black text-sm cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* List */}
            {processedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">👟</div>
                <h3 className="text-xl font-bold mb-2">No shoes found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
                <button onClick={resetFilters} className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:opacity-80 transition-opacity">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {currentProducts.map(prod => (
                  <ProductCard key={prod._id} prod={prod} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i + 1); document.getElementById('shop-grid').scrollIntoView({ behavior: 'smooth' }); }}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all ${page === i + 1
                        ? 'bg-black text-white scale-110 shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100] lg:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white z-[101] shadow-2xl lg:hidden p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="font-bold mb-3">Sort By</h3>
                  <select
                    value={filterState.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Gender</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['All', 'Women', 'Men', 'Unisex'].map(g => (
                      <button
                        key={g}
                        onClick={() => handleFilterChange('gender', g)}
                        className={`py-3 rounded-xl text-sm font-medium border transition-colors ${filterState.gender === g ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200'
                          }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Price Range</h3>
                  <input
                    type="range"
                    min="0" max="2000"
                    value={filterState.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                    className="w-full accent-black h-2 bg-gray-200 rounded-lg"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>$0</span>
                    <span>${filterState.priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Brands</h3>
                  <div className="flex flex-wrap gap-2">
                    {brandsList.map(b => (
                      <button
                        key={b}
                        onClick={() => toggleBrand(b)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${filterState.brands.includes(b) ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-600 border-gray-200'
                          }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold tracking-wide"
                >
                  APPLY FILTERS
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
