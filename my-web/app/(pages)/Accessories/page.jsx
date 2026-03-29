'use client';
import React, { useState, useMemo, useContext, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { ProductContext } from '@/app/Context/ProductContext';
import { ReviewContext } from '@/app/Context/ReviewContext';
import ProductCard from '@/app/Components/ProductCard';
import api from '@/lib/api';

export default function AccessoriesPage() {
    const { fetchProducts } = useContext(ProductContext);
    const { Reviews = [] } = useContext(ReviewContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAccessories = async () => {
            setLoading(true);
            try {
                const res = await api.get('/api/product?category=Accessories&limit=100');
                if (res.success) setProducts(res.data.products);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getAccessories();
    }, []);

    const [filterState, setFilterState] = useState({
        query: '', sort: 'featured', gender: 'All', priceRange: [0, 1500], materials: []
    });
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [page, setPage] = useState(1);
    const perPage = 12;

    const materialsList = useMemo(() => Array.from(new Set(products.map(p => p.material).filter(Boolean))), [products]);

    const processedProducts = useMemo(() => {
        let result = products.map(p => {
            const pr = Reviews.filter(r => r?.product?._id === p._id);
            return { ...p, avgRating: pr.length ? pr.reduce((a, r) => a + (r.rating || 0), 0) / pr.length : 0 };
        });

        if (filterState.gender !== 'All') result = result.filter(p => (p.gender || 'All').toLowerCase() === filterState.gender.toLowerCase());
        if (filterState.query) result = result.filter(p => (p.name || '').toLowerCase().includes(filterState.query.toLowerCase()));
        if (filterState.materials.length) result = result.filter(p => filterState.materials.includes(p.material));
        result = result.filter(p => Number(p.price) >= 0 && Number(p.price) <= filterState.priceRange[1]);

        if (filterState.sort === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (filterState.sort === 'price-desc') result.sort((a, b) => b.price - a.price);
        if (filterState.sort === 'rating') result.sort((a, b) => b.avgRating - a.avgRating);
        return result;
    }, [products, Reviews, filterState]);

    const totalPages = Math.ceil(processedProducts.length / perPage) || 1;
    const currentProducts = processedProducts.slice((page - 1) * perPage, page * perPage);

    const handleFilterChange = (key, value) => { setFilterState(prev => ({ ...prev, [key]: value })); setPage(1); };
    const toggleMaterial = (mat) => {
        setFilterState(prev => ({ ...prev, materials: prev.materials.includes(mat) ? prev.materials.filter(m => m !== mat) : [...prev.materials, mat] }));
        setPage(1);
    };
    const resetFilters = () => setFilterState({ query: '', sort: 'featured', gender: 'All', priceRange: [0, 1500], materials: [] });

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            
            {/* CINEMATIC HERO */}
            <section className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
                <Image
                    src="/assets/generated/accessories-hero.png"
                    alt="Accessories Collection Hero"
                    fill
                    className="object-cover opacity-90 mix-blend-lighten"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                
                <div className="relative z-10 text-center px-4 w-full max-w-5xl mt-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="text-xs font-bold tracking-[0.3em] uppercase text-white/70 mb-6"
                    >
                        Department 04
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-serif font-black text-white uppercase tracking-tighter leading-none mb-8"
                    >
                        Objects of <br/> <span className="italic text-white/50">Desire.</span>
                    </motion.h1>
                </div>
            </section>

            {/* MAIN CATALOG */}
            <main className="container mx-auto px-6 md:px-12 py-24 max-w-[1600px]">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    
                    {/* MINIMALIST SIDEBAR (Desktop) */}
                    <aside className="hidden lg:block w-64 shrink-0 sticky top-32 h-fit space-y-12">
                        <div className="flex justify-between items-baseline border-b border-black/10 dark:border-white/10 pb-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest">Filters</h2>
                            <button onClick={resetFilters} className="text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">Clear</button>
                        </div>

                        {/* Search */}
                        <div className="space-y-4">
                            <input
                                type="text" placeholder="Search objects..."
                                value={filterState.query} onChange={(e) => handleFilterChange('query', e.target.value)}
                                className="w-full bg-transparent border-b border-black/20 dark:border-white/20 pb-3 text-sm focus:outline-none focus:border-black dark:focus:border-white placeholder:text-black/30 dark:placeholder:text-white/30 transition-colors"
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Category</h3>
                            <div className="flex flex-col gap-4">
                                {['All', 'Women', 'Men'].map(g => (
                                    <button
                                        key={g} onClick={() => handleFilterChange('gender', g)}
                                        className={`text-left text-sm transition-all flex items-center gap-4 ${filterState.gender === g ? 'font-bold' : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'}`}
                                    >
                                        <div className={`w-2 h-2 rounded-full transition-colors ${filterState.gender === g ? 'bg-black dark:bg-white' : 'bg-transparent border border-black/20 dark:border-white/20'}`} />
                                        {g} Accessories
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Material Grid */}
                        {materialsList.length > 0 && (
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Materials</h3>
                                <div className="flex flex-wrap gap-2">
                                    {materialsList.map(m => (
                                        <button
                                            key={m} onClick={() => toggleMaterial(m)}
                                            className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${filterState.materials.includes(m) ? 'bg-black text-white dark:bg-white dark:text-black border-transparent' : 'border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white'}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Price Range */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Maximum Price</h3>
                            <input
                                type="range" min="0" max="1500" step="10"
                                value={filterState.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])}
                                className="w-full h-px bg-black/20 dark:bg-white/20 appearance-none accent-black dark:accent-white cursor-ew-resize"
                            />
                            <div className="text-xl font-serif italic">${filterState.priceRange[1]}</div>
                        </div>
                    </aside>

                    {/* PRODUCT DISPLAY */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
                            <h2 className="text-4xl font-serif font-black tracking-tighter">
                                The <br/> <span className="italic text-black/40 dark:text-white/40">Collection</span>
                            </h2>
                            <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
                                <button
                                    className="lg:hidden px-6 py-3 border border-black/10 dark:border-white/10 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 flex-1"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <Filter size={14} /> Filter
                                </button>
                                <div className="relative group w-full sm:w-56">
                                    <select
                                        value={filterState.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}
                                        className="w-full appearance-none bg-transparent border-b border-black/20 dark:border-white/20 pb-2 text-sm font-medium focus:outline-none focus:border-black dark:focus:border-white cursor-pointer uppercase tracking-widest text-right pr-6"
                                    >
                                        <option value="featured">Featured View</option>
                                        <option value="price-asc">Price Ascending</option>
                                        <option value="price-desc">Price Descending</option>
                                        <option value="rating">Highest Rated</option>
                                    </select>
                                    <ChevronDown className="absolute right-0 top-1 text-black/40 dark:text-white/40 pointer-events-none w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-16">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="animate-pulse space-y-6">
                                        <div className="aspect-[3/4] bg-black/5 dark:bg-white/5" />
                                        <div className="h-4 bg-black/5 dark:bg-white/5 w-3/4" />
                                    </div>
                                ))}
                            </div>
                        ) : processedProducts.length === 0 ? (
                            <div className="py-32 text-center">
                                <p className="text-2xl font-serif italic text-black/50 dark:text-white/50 mb-6">No objects match your criteria.</p>
                                <button onClick={resetFilters} className="text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1">Reset Filters</button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-16 md:gap-y-24">
                                    {currentProducts.map((prod, idx) => (
                                        <motion.div
                                            key={prod._id}
                                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: (idx % 4) * 0.1 }} viewport={{ once: true }}
                                        >
                                            <ProductCard product={prod} />
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {/* Aesthetic Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-32 flex justify-center gap-4">
                                        {Array.from({ length: totalPages }).map((_, i) => (
                                            <button
                                                key={i} onClick={() => { setPage(i + 1); window.scrollTo({ top: window.innerHeight * 0.6, behavior: 'smooth' }); }}
                                                className={`text-2xl font-serif font-black transition-all ${page === i + 1 ? 'italic text-black dark:text-white' : 'text-black/20 dark:text-white/20 hover:text-black/60 dark:hover:text-white/60'}`}
                                            >
                                                {(i + 1).toString().padStart(2, '0')}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            {/* FULL SCREEN MOBILE FILTERS */}
            <AnimatePresence>
                {mobileFiltersOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-white dark:bg-[#0a0a0a] z-[200] flex flex-col pt-12 px-6 pb-6 lg:hidden"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-3xl font-serif font-black uppercase tracking-tighter">Filter <br/><span className="italic text-black/40 dark:text-white/40">Objects</span></h2>
                            <button onClick={() => setMobileFiltersOpen(false)} className="p-3 bg-black/5 dark:bg-white/10 rounded-full"><X size={20}/></button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto space-y-12 pb-24">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-6">Categories</h3>
                                <div className="flex flex-col gap-6">
                                    {['All', 'Women', 'Men'].map(g => (
                                        <button key={g} onClick={() => handleFilterChange('gender', g)} className={`text-3xl font-serif text-left ${filterState.gender === g ? 'italic font-black' : 'text-black/30 dark:text-white/30'}`}>
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-6">Max Price</h3>
                                <div className="text-5xl font-serif italic mb-6">${filterState.priceRange[1]}</div>
                                <input type="range" min="0" max="1500" value={filterState.priceRange[1]} onChange={(e) => handleFilterChange('priceRange', [0, Number(e.target.value)])} className="w-full accent-black dark:accent-white" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-black/10 dark:border-white/10 mt-auto">
                            <button onClick={() => setMobileFiltersOpen(false)} className="w-full px-8 py-5 bg-black text-white dark:bg-white dark:text-black rounded-full text-xs font-bold uppercase tracking-widest">
                                View {processedProducts.length} Objects
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
