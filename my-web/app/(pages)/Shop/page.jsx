"use client";
import React, { useState, useMemo, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, SlidersHorizontal, ChevronDown, ChevronUp, Check, X, Grid, List } from "lucide-react";
import { ProductContext } from "@/app/Context/ProductContext";
import { CartContext } from "@/app/Context/Cart";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/app/Components/ProductCard";

const Shop = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products } = useContext(ProductContext);
  const { discount, addToCart } = useContext(CartContext);

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    material: [],
    color: [],
    size: [],
    minPrice: 0,
    maxPrice: 200,
  });
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortPrice, setSortPrice] = useState("default");
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState({
    category: true, gender: true, material: false, color: true, size: false, price: true
  });

  const ITEMS_PER_PAGE = 12;

  const categories = [...new Set(products.map((p) => p.category))];
  const genders = [...new Set(products.map((p) => p.gender.toLowerCase()))];
  const materials = [...new Set(products.map((p) => p.material))];
  const colors = ["black", "white", "blue", "red", "green", "brown", "purple", "gray", "bg-yellow-400", "pink", "beige"]; // Simplification
  const sizes = [...new Set(products.flatMap((p) => p.sizes).filter(Boolean))];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      material: params.material ? params.material.split(",") : [],
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      minPrice: params.minPrice ? parseFloat(params.minPrice) : 0,
      maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 200,
    });
    setPriceRange([
      params.minPrice ? parseFloat(params.minPrice) : 0,
      params.maxPrice ? parseFloat(params.maxPrice) : 200,
    ]);
    if (params.sort) setSortPrice(params.sort);
  }, [searchParams]);

  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key] && !Array.isArray(newFilters[key])) {
        params.append(key, newFilters[key]);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (type === "material" || type === "color" || type === "size") {
        newFilters[type] = newFilters[type].includes(value)
          ? newFilters[type].filter((item) => item !== value)
          : [...newFilters[type], value];
      } else {
        newFilters[type] = newFilters[type] === value ? "" : value;
      }
      setPage(0);
      updateUrlParams(newFilters);
      return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters({ category: "", gender: "", material: [], color: [], size: [], minPrice: 0, maxPrice: 200 });
    setPriceRange([0, 200]);
    router.push("?");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesGender = !filters.gender || p.gender === filters.gender;
      const matchesMaterial = filters.material.length === 0 || filters.material.includes(p.material);
      const matchesColor = filters.color.length === 0 || p.colors?.some((c) => filters.color.includes(c));
      const matchesSize = filters.size.length === 0 || p.sizes?.some((s) => filters.size.includes(s));
      const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      return matchesCategory && matchesGender && matchesMaterial && matchesColor && matchesSize && matchesPrice;
    });
  }, [filters, products]);

  const sortedProducts = useMemo(() => {
    if (sortPrice === "lowToHigh") return [...filteredProducts].sort((a, b) => a.price - b.price);
    if (sortPrice === "highToLow") return [...filteredProducts].sort((a, b) => b.price - a.price);
    return filteredProducts;
  }, [sortPrice, filteredProducts]);

  const paginatedProducts = sortedProducts.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const toggleAccordion = (section) => {
    setActiveAccordion(prev => ({ ...prev, [section]: !prev[section] }));
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground">
      {/* Sidebar Filter */}
      <aside
        className={`fixed lg:sticky top-10 py-10 z-40 h-screen w-[300px] bg-background border-r border-border p-6 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${showFilters ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-serif font-bold uppercase tracking-wider">Filters</h2>
          <button onClick={() => setShowFilters(false)} className="lg:hidden p-2 rounded-full hover:bg-muted">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Helper for accordion items */}
          {[
            { label: "Category", key: "category", type: "radio", options: categories },
            { label: "Gender", key: "gender", type: "radio", options: genders },
            { label: "Size", key: "size", type: "button", options: sizes },
            { label: "Color", key: "color", type: "color", options: colors },
            { label: "Material", key: "material", type: "checkbox", options: materials },
          ].map((section) => (
            <div key={section.key} className="border-b border-border pb-4">
              <button className="flex items-center justify-between w-full py-2 font-semibold" onClick={() => toggleAccordion(section.key)}>
                {section.label}
                {activeAccordion[section.key] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <AnimatePresence>
                {activeAccordion[section.key] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden space-y-2 mt-2"
                  >
                    {section.type === "radio" && section.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border border-primary flex items-center justify-center ${filters[section.key] === opt ? "bg-primary" : "bg-transparent"}`}>
                          {filters[section.key] === opt && <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />}
                        </div>
                        <input type="radio" checked={filters[section.key] === opt} onChange={() => handleFilterChange(section.key, opt)} className="hidden" />
                        <span className={`text-sm group-hover:text-primary transition-colors ${filters[section.key] === opt ? "font-medium" : "text-muted-foreground"}`}>{opt}</span>
                      </label>
                    ))}
                    {section.type === "checkbox" && section.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border border-primary flex items-center justify-center ${filters[section.key].includes(opt) ? "bg-primary text-primary-foreground" : "bg-transparent"}`}>
                          {filters[section.key].includes(opt) && <Check size={12} />}
                        </div>
                        <input type="checkbox" checked={filters[section.key].includes(opt)} onChange={() => handleFilterChange(section.key, opt)} className="hidden" />
                        <span className={`text-sm group-hover:text-primary transition-colors ${filters[section.key].includes(opt) ? "font-medium" : "text-muted-foreground"}`}>{opt}</span>
                      </label>
                    ))}
                    {section.type === "button" && (
                      <div className="flex flex-wrap gap-2">
                        {section.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => handleFilterChange(section.key, opt)}
                            className={`px-3 py-1 text-xs uppercase border rounded-md transition-all ${filters.size.includes(opt) ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent border-input hover:border-primary'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    {section.type === "color" && (
                      <div className="flex flex-wrap gap-2">
                        {section.options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => handleFilterChange(section.key, opt)}
                            className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${filters.color.includes(opt) ? 'ring-2 ring-primary ring-offset-2' : 'border-input'}`}
                            style={{ backgroundColor: opt === "bg-yellow-400" ? "#FACC15" : opt }}
                            title={opt}
                          >
                            {filters.color.includes(opt) && <Check size={12} className={opt === 'white' || opt === 'beige' ? 'text-black' : 'text-white'} />}
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
          <div className="pt-4">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setPriceRange([0, val]); // Simple implementation, ideally 2 sliders
                handleFilterChange("maxPrice", val);
              }}
              className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>$0</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <button onClick={resetFilters} className="w-full py-3 mt-6 bg-secondary text-secondary-foreground font-bold uppercase text-xs tracking-widest rounded hover:bg-secondary/80 transition-colors">
            Clear Filters
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 py-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setShowFilters(true)} className="lg:hidden flex items-center gap-2 text-sm font-bold uppercase">
              <SlidersHorizontal size={18} /> Filters
            </button>
            <p className="text-sm text-muted-foreground hidden md:block">{filteredProducts.length} Products Found</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortPrice}
                onChange={(e) => setSortPrice(e.target.value)}
                className="appearance-none bg-background border border-border px-4 py-2 pr-8 rounded text-sm focus:outline-none focus:border-primary"
              >
                <option value="default">Newest</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {paginatedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-2xl font-serif font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters.</p>
            <button onClick={resetFilters} className="px-6 py-2 bg-primary text-primary-foreground rounded-full">Reset Filters</button>
          </div>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {paginatedProducts.map((prod) => (
                <motion.div key={prod._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ProductCard product={prod} />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) > 1 && (
              <div className="flex justify-center mt-12 gap-2">
                <button disabled={page === 0} onClick={() => setPage(page - 1)} className="p-2 border border-border rounded disabled:opacity-30 hover:bg-accent transition-colors">
                  <ChevronDown className="rotate-90" size={16} />
                </button>
                {[...Array(Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)).keys()].map((i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${page === i ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button disabled={page === Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) - 1} onClick={() => setPage(page + 1)} className="p-2 border border-border rounded disabled:opacity-30 hover:bg-accent transition-colors">
                  <ChevronDown className="-rotate-90" size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Overlay for mobile filters */}
      {showFilters && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setShowFilters(false)} />}
    </div>
  );
};

// Helper icon
import { Plus } from "lucide-react";

export default Shop;
