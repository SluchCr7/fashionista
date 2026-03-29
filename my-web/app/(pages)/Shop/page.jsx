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
    <div className="min-h-screen bg-background text-foreground flex flex-col pt-32">
      {/* Editorial Header */}
      <div className="container mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-12"
        >
          <div className="space-y-6">
            <p className="typography-display">Ready to Wear</p>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-none">
              The <span className="not-italic font-bold">Catalog.</span>
            </h1>
          </div>
          <div className="max-w-xs text-right">
            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.2em] leading-relaxed">
              Discover our meticulously curated selection of seasonal offerings and timeless essentials.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-20">
        {/* Elite Sidebar Filters */}
        <aside className={`fixed lg:sticky top-32 z-50 lg:z-10 h-screen lg:h-fit w-full lg:w-72 bg-background lg:bg-transparent overflow-y-auto transition-transform duration-500 transform lg:translate-x-0 ${showFilters ? "translate-x-0 inset-0 p-12" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex justify-between items-center mb-16">
            <h2 className="typography-display text-foreground">Filter Selection</h2>
            <button onClick={resetFilters} className="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent decoration-accent underline underline-offset-8">Reset All</button>
          </div>

          <div className="space-y-8">
            {[
              { label: "By Category", key: "category", options: categoryList },
              { label: "By Gender", key: "gender", options: genderList },
            ].map((section) => (
              <div key={section.key} className="space-y-4">
                <h3 className="typography-display !text-[9px] text-muted-foreground">{section.label}</h3>
                <div className="flex flex-col gap-3">
                  {section.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleFilterChange(section.key, opt)}
                      className={`text-left text-xs font-black uppercase tracking-[0.2em] transition-all hover:translate-x-2 ${filters[section.key] === opt ? "text-accent" : "text-muted-foreground"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 py-12 border-t border-border/10">
            <h3 className="typography-display !text-[9px] text-muted-foreground mb-8">Price Threshold</h3>
            <div className="flex flex-col gap-4">
              <span className="text-sm font-black italic">${priceRange[1]}</span>
              <input
                type="range" min="0" max="1000" step="50"
                value={priceRange[1]}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setPriceRange([0, val]);
                  handleFilterChange("maxPrice", val);
                }}
                className="w-full h-[1px] bg-muted-foreground/20 appearance-none cursor-pointer accent-black"
              />
            </div>
          </div>
        </aside>

        {/* Dynamic Product Catalog */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-16 border-b border-border/10 pb-12">
            <p className="typography-display !text-[9px]">{pagination.total} Selected Pieces</p>
            <div className="flex items-center gap-12">
              <button onClick={() => setShowFilters(true)} className="lg:hidden typography-display border border-border px-6 py-2">Refine</button>
              <select
                value={sortPrice}
                onChange={(e) => {
                  setSortPrice(e.target.value);
                  updateUrlParams({ ...filters, sort: e.target.value });
                }}
                className="bg-transparent text-[8px] font-black uppercase tracking-[0.4em] focus:outline-none cursor-pointer"
              >
                <option value="-createdAt">Newest Drops</option>
                <option value="price">Price ascending</option>
                <option value="-price">Price descending</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="aspect-[3/4] bg-muted/20 animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-24">
              <AnimatePresence>
                {products
                  .filter(prod => prod.category !== 'Shoes')
                  .map((prod, idx) => (
                    <motion.div
                      key={prod._id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                    >
                      <ProductCard product={prod} />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          )}

          {/* Minimal Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center mt-44 gap-12">
              <button
                disabled={pagination.page <= 1}
                onClick={() => handlePageChange(pagination.page - 1)}
                className="typography-display hover:text-accent disabled:opacity-20"
              >
                Previous
              </button>
              <div className="flex gap-6">
                {[...Array(pagination.pages).keys()].map(i => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`text-[10px] font-black ${pagination.page === i + 1 ? 'text-accent border-b border-accent' : 'text-muted-foreground'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={pagination.page >= pagination.pages}
                onClick={() => handlePageChange(pagination.page + 1)}
                className="typography-display hover:text-accent disabled:opacity-20"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
