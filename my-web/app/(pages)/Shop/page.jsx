"use client";
import React, { useState, useMemo, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, SlidersHorizontal, ChevronDown, ChevronUp, Check, X, Grid, List, Search, Filter } from "lucide-react";
import { ProductContext } from "@/app/Context/ProductContext";
import { CartContext } from "@/app/Context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/app/Components/ProductCard";

const Shop = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, pagination, fetchProducts, loading } = useContext(ProductContext);
  const { discount } = useContext(CartContext);

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    material: [],
    colors: [],
    sizes: [],
    minPrice: 0,
    maxPrice: 1000,
  });
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortPrice, setSortPrice] = useState("-createdAt");
  const [showFilters, setShowFilters] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState({
    category: true, gender: true, material: false, colors: true, sizes: false, price: true
  });

  // Filter options
  const colorsList = ["black", "white", "blue", "red", "green", "brown", "purple", "gray", "yellow", "pink", "beige", "navy", "olive", "burgundy"];
  const sizesList = ["XS", "S", "M", "L", "XL", "XXL", "38", "39", "40", "41", "42", "43", "44", "45"];
  const categoryList = ["T-Shirts", "Shirts", "Pants", "Dresses", "Jackets", "Hoodies", "Shorts", "Skirts", "Accessories", "Suits"];
  const genderList = ["Men", "Women", "Kids", "Unisex"];
  const materialList = ["Cotton", "Linen", "Polyester", "Wool", "Silk", "Denim", "Leather"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const updatedFilters = {
      category: params.category || "",
      gender: params.gender || "",
      material: params.material ? params.material.split(",") : [],
      colors: params.colors ? params.colors.split(",") : [],
      sizes: params.sizes ? params.sizes.split(",") : [],
      minPrice: params.minPrice ? parseFloat(params.minPrice) : 0,
      maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 1000,
      page: params.page ? parseInt(params.page) : 1,
      sort: params.sort || "-createdAt",
      search: params.search || ""
    };

    setFilters(updatedFilters);
    setPriceRange([updatedFilters.minPrice, updatedFilters.maxPrice]);
    if (params.sort) setSortPrice(params.sort);

    fetchProducts(updatedFilters);
  }, [searchParams, fetchProducts]);

  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      const val = newFilters[key];
      if (Array.isArray(val) && val.length > 0) {
        params.append(key, val.join(","));
      } else if (val && !Array.isArray(val)) {
        params.append(key, val);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (type, value) => {
    const newFilters = { ...filters, page: 1 };
    if (Array.isArray(filters[type])) {
      newFilters[type] = filters[type].includes(value)
        ? filters[type].filter((item) => item !== value)
        : [...filters[type], value];
    } else {
      newFilters[type] = filters[type] === value ? "" : value;
    }
    updateUrlParams(newFilters);
  };

  const handlePageChange = (newPage) => {
    updateUrlParams({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetFilters = () => router.push("/Shop");

  const toggleAccordion = (section) => {
    setActiveAccordion(prev => ({ ...prev, [section]: !prev[section] }));
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-20">
      {/* 1. TOP BANNER / HEADER */}
      <div className="w-full bg-secondary/30 py-12 md:py-20 px-6 border-b border-border text-center overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter mb-4">The Shop</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto uppercase tracking-widest font-medium">Curated Excellence for Every Occasion</p>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-black text-foreground/[0.03] select-none pointer-events-none uppercase tracking-tighter">Fashionista</div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8">
        {/* 2. SIDEBAR FILTERS (Desktop) */}
        <aside className={`fixed lg:sticky top-28 z-50 lg:z-10 h-[calc(100vh-120px)] lg:h-fit w-full lg:w-72 bg-background lg:bg-transparent border-r-0 lg:border-r border-border pr-0 lg:pr-8 overflow-y-auto transition-transform duration-500 transform lg:translate-x-0 ${showFilters ? "translate-x-0 inset-0 p-8" : "-translate-x-full lg:translate-x-0"}`}>

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-lg font-bold font-serif uppercase tracking-widest flex items-center gap-2">
              <Filter size={18} /> Filters
            </h2>
            <div className="flex items-center gap-4">
              <button onClick={resetFilters} className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary underline underline-offset-4">Reset</button>
              <button onClick={() => setShowFilters(false)} className="lg:hidden p-2 rounded-full bg-secondary/50"><X size={20} /></button>
            </div>
          </div>

          <div className="space-y-1">
            {/* Filter Accordion Item Component */}
            {[
              { label: "Category", key: "category", type: "radio", options: categoryList },
              { label: "Gender", key: "gender", type: "radio", options: genderList },
              { label: "Sizes", key: "sizes", type: "badge", options: sizesList },
              { label: "Colors", key: "colors", type: "color", options: colorsList },
              { label: "Material", key: "material", type: "checkbox", options: materialList },
            ].map((section) => (
              <div key={section.key} className="border-b border-border/50 py-4">
                <button className="flex items-center justify-between w-full text-xs font-black uppercase tracking-widest py-2 hover:text-primary transition-colors" onClick={() => toggleAccordion(section.key)}>
                  {section.label}
                  <motion.div animate={{ rotate: activeAccordion[section.key] ? 180 : 0 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion[section.key] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-3 mt-4"
                    >
                      {section.type === "radio" && section.options.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-3 h-3 rounded-full border border-primary flex items-center justify-center transition-all ${filters[section.key] === opt ? "bg-primary" : "bg-transparent"}`}>
                            {filters[section.key] === opt && <div className="w-1 h-1 bg-primary-foreground rounded-full" />}
                          </div>
                          <input type="radio" checked={filters[section.key] === opt} onChange={() => handleFilterChange(section.key, opt)} className="hidden" />
                          <span className={`text-[11px] uppercase tracking-wide font-bold transition-colors ${filters[section.key] === opt ? "text-foreground" : "text-muted-foreground group-hover:text-primary"}`}>{opt}</span>
                        </label>
                      ))}

                      {section.type === "checkbox" && section.options.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-3.5 h-3.5 rounded border border-primary flex items-center justify-center transition-all ${filters[section.key].includes(opt) ? "bg-primary text-primary-foreground" : "bg-transparent"}`}>
                            {filters[section.key].includes(opt) && <Check size={10} />}
                          </div>
                          <input type="checkbox" checked={filters[section.key].includes(opt)} onChange={() => handleFilterChange(section.key, opt)} className="hidden" />
                          <span className={`text-[11px] uppercase tracking-wide font-bold transition-colors ${filters[section.key].includes(opt) ? "text-foreground" : "text-muted-foreground group-hover:text-primary"}`}>{opt}</span>
                        </label>
                      ))}

                      {section.type === "badge" && (
                        <div className="flex flex-wrap gap-1.5">
                          {section.options.map(opt => (
                            <button
                              key={opt}
                              onClick={() => handleFilterChange(section.key, opt)}
                              className={`px-3 py-1.5 text-[9px] font-black uppercase border rounded transition-all ${filters[section.key].includes(opt) ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'bg-transparent border-border hover:border-primary text-muted-foreground'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {section.type === "color" && (
                        <div className="flex flex-wrap gap-2.5">
                          {section.options.map(opt => (
                            <button
                              key={opt}
                              onClick={() => handleFilterChange(section.key, opt)}
                              className={`w-5 h-5 rounded-full border border-border flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${filters[section.key].includes(opt) ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                              style={{ backgroundColor: opt }}
                              title={opt}
                            >
                              {filters[section.key].includes(opt) && <Check size={10} className={opt === 'white' || opt === 'beige' || opt === 'yellow' ? 'text-black' : 'text-white'} />}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Price Range */}
            <div className="py-6">
              <h3 className="text-xs font-black uppercase tracking-widest mb-6">Price Limit</h3>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setPriceRange([0, val]);
                  handleFilterChange("maxPrice", val);
                }}
                className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-4">
                <span>$0</span>
                <span className="text-primary">${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* 3. MAIN PRODUCT GRID */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-border/50 pb-8">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-secondary py-2.5 px-5 rounded-full"
              >
                <SlidersHorizontal size={14} /> Refine
              </button>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                <span className="text-foreground">{pagination.total}</span> Items Discovery
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <select
                  value={sortPrice}
                  onChange={(e) => {
                    setSortPrice(e.target.value);
                    updateUrlParams({ ...filters, sort: e.target.value });
                  }}
                  className="w-full appearance-none bg-secondary/50 border border-transparent px-6 py-2.5 pr-12 rounded-full text-[10px] font-black uppercase tracking-widest focus:outline-none focus:bg-secondary transition-all cursor-pointer"
                >
                  <option value="-createdAt">Recently Added</option>
                  <option value="price">Price (Low - High)</option>
                  <option value="-price">Price (High - Low)</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={12} />
              </div>
            </div>
          </div>

          {/* Grid or Empty State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="animate-pulse space-y-4">
                  <div className="aspect-[3/4] bg-secondary rounded-3xl" />
                  <div className="h-4 bg-secondary rounded-full w-3/4" />
                  <div className="h-4 bg-secondary rounded-full w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center bg-secondary/10 rounded-[3rem] border-2 border-dashed border-border/50"
            >
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6 shadow-xl text-muted-foreground">
                <Search size={32} />
              </div>
              <h3 className="text-3xl font-serif font-black uppercase tracking-tighter mb-4">No results found</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-10 leading-relaxed uppercase tracking-widest font-medium">We couldn&apos;t find anything matching your current filters. Try relaxing them.</p>
              <button
                onClick={resetFilters}
                className="px-8 py-4 bg-primary text-primary-foreground text-xs font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Clear Selection
              </button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              <AnimatePresence>
                {products.map((prod, idx) => (
                  <motion.div
                    key={prod._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <ProductCard product={prod} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* 4. PAGINATION */}
          {pagination.pages > 1 && (
            <div className="flex justify-center mt-24 gap-3">
              <button
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="w-12 h-12 flex items-center justify-center border border-border rounded-full disabled:opacity-20 hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-90 transition-all shadow-md group"
              >
                <ChevronDown className="rotate-90 group-hover:-translate-x-0.5 transition-transform" size={18} />
              </button>

              <div className="flex items-center gap-2">
                {[...Array(pagination.pages).keys()].map((i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`min-w-[48px] h-12 flex items-center justify-center rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${pagination.page === i + 1 ? 'bg-primary text-primary-foreground scale-110 shadow-xl' : 'bg-background border border-border hover:border-primary hover:text-primary'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button
                disabled={pagination.page >= pagination.pages}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="w-12 h-12 flex items-center justify-center border border-border rounded-full disabled:opacity-20 hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-90 transition-all shadow-md group"
              >
                <ChevronDown className="-rotate-90 group-hover:translate-x-0.5 transition-transform" size={18} />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Overlay */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-[45] lg:hidden"
            onClick={() => setShowFilters(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
