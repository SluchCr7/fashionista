'use client';

import React, { useState, useMemo, useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Filter, X, Heart, ChevronDown } from 'lucide-react';
import { ProductContext } from '@/app/Context/ProductContext';
import { ReviewContext } from '@/app/Context/ReviewContext';
import ProductCard from '@/app/Components/ProductCard';

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
  const perPage = 12;

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
      default: break;
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
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">

      {/* 1. HERO SECTION */}
      <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-secondary">
        <Image
          src="/Hero/bg_shoes_wom.jpg"
          alt="Shoes Collection"
          fill
          className="object-cover opacity-80 mix-blend-multiply dark:opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
          >
            Premium Footwear
          </motion.span>
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold text-foreground tracking-tight mb-6 drop-shadow-sm"
          >
            Walk the Talk
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-muted-foreground text-lg md:text-xl font-light mb-8 max-w-2xl leading-relaxed"
          >
            Discover our exclusive collection of premium footwear, engineered for comfort and designed for the modern visionary.
          </motion.p>
        </div>
      </section>

      {/* 2. MAIN CONTENT */}
      <main id="shop-grid" className="container mx-auto px-4 md:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 h-fit space-y-10 pr-6 border-r border-border/50">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <h2 className="text-lg font-bold font-serif uppercase tracking-wider">Refine By</h2>
              <button onClick={resetFilters} className="text-xs font-bold text-muted-foreground hover:text-primary underline decoration-muted-foreground/30 underline-offset-4 transition-colors">Clear All</button>
            </div>

            {/* Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search Keywords..."
                value={filterState.query}
                onChange={(e) => handleFilterChange('query', e.target.value)}
                className="w-full bg-secondary/30 border border-transparent rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/50"
              />
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Department</h3>
              <div className="space-y-2">
                {['All', 'Men', 'Women', 'Unisex'].map(g => (
                  <label key={g} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                    <div className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center ${filterState.gender === g ? 'border-primary bg-primary' : 'border-muted-foreground/30 group-hover:border-primary'}`}>
                      {filterState.gender === g && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                    </div>
                    <span className={`text-sm transition-colors ${filterState.gender === g ? 'font-bold text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
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
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Brands</h3>
              <div className="flex flex-wrap gap-2">
                {brandsList.slice(0, 10).map(b => (
                  <button
                    key={b}
                    onClick={() => toggleBrand(b)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${filterState.brands.includes(b)
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground'
                      }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price Range</h3>
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className="text-muted-foreground">$0</span>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={filterState.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                  className="flex-1 h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary hover:accent-foreground transition-all"
                />
                <span className="text-foreground">${filterState.priceRange[1]}</span>
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6 border-b border-border pb-6">
              <p className="text-muted-foreground text-sm font-medium tracking-wide">
                Showing <span className="text-foreground font-bold">{processedProducts.length}</span> Results
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary text-foreground rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-secondary/80 transition-colors"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <Filter size={14} /> Filters
                </button>

                <div className="relative group flex-1 sm:flex-none">
                  <select
                    value={filterState.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className="w-full sm:w-56 appearance-none bg-background border border-border text-foreground py-2.5 px-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:border-primary hover:border-foreground cursor-pointer transition-colors shadow-sm"
                  >
                    <option value="featured">Sort by: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {processedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-secondary/10 rounded-2xl border border-dashed border-border">
                <div className="bg-secondary/30 p-6 rounded-full mb-6">
                  <ShoppingBag size={48} className="text-muted-foreground/50" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 text-foreground">No matches found</h3>
                <p className="text-muted-foreground mb-8 max-w-sm">We couldn't find any products matching your current filters.</p>
                <button
                  onClick={resetFilters}
                  className="px-8 py-3 bg-foreground text-background rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 gap-y-12">
                {currentProducts.map(prod => (
                  <motion.div
                    key={prod._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={prod} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i + 1); document.getElementById('shop-grid').scrollIntoView({ behavior: 'smooth' }); }}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${page === i + 1
                      ? 'bg-foreground text-background scale-110 shadow-md'
                      : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground'
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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-background border-l border-border z-[101] shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-border">
                <h2 className="text-xl font-bold font-serif uppercase tracking-wider">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Mobile Filter Content */}
                {/* Same logic as desktop but styled for mobile */}
                {/* ... (simplified repetition of filters) ... */}
                <div>
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Gender</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['All', 'Women', 'Men', 'Unisex'].map(g => (
                      <button
                        key={g}
                        onClick={() => handleFilterChange('gender', g)}
                        className={`py-3 rounded-lg text-sm font-medium border transition-colors ${filterState.gender === g ? 'bg-foreground text-background border-foreground' : 'bg-background text-muted-foreground border-border'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                {/* ... Price ... */}
                <div>
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wider">Price Range</h3>
                  <input
                    type="range"
                    min="0" max="2000"
                    value={filterState.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                    className="w-full accent-primary h-2 bg-secondary rounded-lg"
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground font-medium">
                    <span>$0</span>
                    <span>${filterState.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-background">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-foreground text-background py-4 rounded-full font-bold uppercase tracking-widest hover:opacity-90 shadow-lg transition-all"
                >
                  Show {processedProducts.length} Results
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
