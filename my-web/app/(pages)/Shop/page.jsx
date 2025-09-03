"use client";
import React, { useState, useMemo, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { IoMdHeart } from "react-icons/io";
import { ProductContext } from "@/app/Context/ProductContext";
import { CartContext } from "@/app/Context/Cart";

const Shop = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products } = useContext(ProductContext);
  const { discount } = useContext(CartContext);

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    material: [],
    color: [],
    size: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortPrice, setSortPrice] = useState("default");
  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [...new Set(products.map((p) => p.category))];
  const genders = [...new Set(products.map((p) => p.gender.toLowerCase()))];
  const materials = [...new Set(products.map((p) => p.material))];
  const colors = ["Yellow", "Black", "White", "Blue", "Red", "Green", "Brown", "Orange", "Purple", "Silver", "Gold", "Gray", "Navy", "Beige", "Pink"];
  const sizes = [...new Set(products.flatMap((p) => p.sizes))];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      material: params.material ? params.material.split(",") : [],
      color: params.color ? params.color.split(",") : [],
      size: params.size ? params.size.split(",") : [],
      minPrice: params.minPrice ? parseFloat(params.minPrice) : 0,
      maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : 100,
    });
    setPriceRange([
      params.minPrice ? parseFloat(params.minPrice) : 0,
      params.maxPrice ? parseFloat(params.maxPrice) : 100,
    ]);
  }, [searchParams]);

  const updateUrlParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
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
      updateUrlParams(newFilters);
      return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      gender: "",
      material: [],
      color: [],
      size: [],
      minPrice: 0,
      maxPrice: 100,
    });
    setPriceRange([0, 100]);
    router.push("?");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesGender = !filters.gender || p.gender === filters.gender;
      const matchesMaterial = filters.material.length === 0 || filters.material.includes(p.material);
      const matchesColor = filters.color.length === 0 || p.colors.some((c) => filters.color.includes(c));
      const matchesSize = filters.size.length === 0 || p.sizes.some((s) => filters.size.includes(s));
      const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
      return matchesCategory && matchesGender && matchesMaterial && matchesColor && matchesSize && matchesPrice;
    });
  }, [filters, products]);

  const sortedProducts = useMemo(() => {
    return sortPrice === "lowToHigh"
      ? [...filteredProducts].sort((a, b) => a.price - b.price)
      : sortPrice === "highToLow"
      ? [...filteredProducts].sort((a, b) => b.price - a.price)
      : filteredProducts;
  }, [sortPrice, filteredProducts]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-6 py-8 bg-gray-100 min-h-screen">
      {/* Sidebar (Filters) */}
      <div className={`fixed lg:static z-40 top-0 left-0 h-full w-3/4 lg:w-[20%] bg-white shadow-lg p-6 transition-transform transform ${showFilters ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <button onClick={() => setShowFilters(false)} className="lg:hidden">✕</button>
        </div>
        <div className="space-y-6 overflow-y-auto h-[80vh]">
          {/* Category */}
          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            {categories.map((c) => (
              <label key={c} className="flex items-center gap-2">
                <input type="radio" checked={filters.category === c} onChange={() => handleFilterChange("category", c)} />
                {c}
              </label>
            ))}
          </div>
          {/* Gender */}
          <div>
            <h3 className="font-semibold mb-2">Gender</h3>
            {genders.map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input type="radio" checked={filters.gender === g} onChange={() => handleFilterChange("gender", g)} />
                {g}
              </label>
            ))}
          </div>
          {/* Material */}
          <div>
            <h3 className="font-semibold mb-2">Material</h3>
            {materials.map((m) => (
              <label key={m} className="flex items-center gap-2">
                <input type="checkbox" checked={filters.material.includes(m)} onChange={() => handleFilterChange("material", m)} />
                {m}
              </label>
            ))}
          </div>
          {/* Colors */}
          <div>
            <h3 className="font-semibold mb-2">Color</h3>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((c) => (
                <label key={c} style={{ backgroundColor: c.toLowerCase() }} className={`w-7 h-7 rounded-full cursor-pointer border ${filters.color.includes(c) ? "ring-2 ring-black" : ""}`}>
                  <input type="checkbox" checked={filters.color.includes(c)} onChange={() => handleFilterChange("color", c)} className="hidden" />
                </label>
              ))}
            </div>
          </div>
          {/* Size */}
          <div>
            <h3 className="font-semibold mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button key={s} onClick={() => handleFilterChange("size", s)} className={`px-3 py-1 border rounded ${filters.size.includes(s) ? "bg-black text-white" : "bg-white"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          {/* Price */}
          <div>
            <h3 className="font-semibold mb-2">Price</h3>
            <input type="range" min="0" max="100" value={priceRange[1]} onChange={(e) => handleFilterChange("maxPrice", parseFloat(e.target.value))} className="w-full" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
          {/* Reset */}
          <button onClick={resetFilters} className="w-full mt-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">Clear All</button>
        </div>
      </div>

      {/* Products Section */}
      <div className="w-full lg:w-[80%]">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button className="lg:hidden px-4 py-2 border rounded" onClick={() => setShowFilters(true)}>☰ Filters</button>
          <select value={sortPrice} onChange={(e) => setSortPrice(e.target.value)} className="border p-2 rounded">
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.slice(page * 8, page * 8 + 8).map((prod) => (
            <div key={prod._id} className="relative group bg-white rounded-lg shadow p-3 hover:shadow-lg transition">
              {/* Wishlist */}
              <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
                <IoMdHeart size={22} />
              </button>
              {/* Discount */}
              {discount && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  -{discount}%
                </span>
              )}
              {/* Image */}
              <Link href={`/Product/${prod._id}`}>
                <Image src={prod.Photo[0].url} alt={prod.name} width={300} height={300} className="w-full h-52 object-cover rounded-md group-hover:scale-105 transition" />
              </Link>
              {/* Info */}
              <h3 className="font-semibold mt-2">{prod.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold">${prod.price}</span>
                {discount && <span className="line-through text-gray-400 text-sm">${prod.price + discount}</span>}
              </div>
              {/* CTA */}
              <button className="hidden group-hover:block w-full mt-3 py-2 bg-black text-white rounded-md transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button disabled={page === 0} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          {[...Array(Math.ceil(sortedProducts.length / 8)).keys()].map((i) => (
            <button key={i} onClick={() => setPage(i)} className={`px-3 py-1 border rounded ${page === i ? "bg-black text-white" : ""}`}>
              {i + 1}
            </button>
          ))}
          <button disabled={page === Math.ceil(sortedProducts.length / 8) - 1} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
