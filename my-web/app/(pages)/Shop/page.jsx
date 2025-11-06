"use client";
import React, { useState, useMemo, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { IoMdHeart } from "react-icons/io";
import { ProductContext } from "@/app/Context/ProductContext";
import { CartContext } from "@/app/Context/Cart";
import { motion } from "framer-motion";

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
  const colors = [
    "Yellow",
    "Black",
    "White",
    "Blue",
    "Red",
    "Green",
    "Brown",
    "Orange",
    "Purple",
    "Silver",
    "Gold",
    "Gray",
    "Navy",
    "Beige",
    "Pink",
  ];
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
      const matchesCategory =
        !filters.category || p.category === filters.category;
      const matchesGender = !filters.gender || p.gender === filters.gender;
      const matchesMaterial =
        filters.material.length === 0 || filters.material.includes(p.material);
      const matchesColor =
        filters.color.length === 0 ||
        p.colors?.some((c) => filters.color.includes(c));
      const matchesSize =
        filters.size.length === 0 ||
        p.sizes?.some((s) => filters.size.includes(s));
      const matchesPrice =
        p.price >= filters.minPrice && p.price <= filters.maxPrice;
      return (
        matchesCategory &&
        matchesGender &&
        matchesMaterial &&
        matchesColor &&
        matchesSize &&
        matchesPrice
      );
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
    <div className="flex flex-col lg:flex-row gap-6 px-3 sm:px-6 py-8 sm:py-10 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 top-0 left-0 h-full w-[85%] sm:w-[60%] md:w-[40%] lg:w-[22%] bg-white shadow-2xl p-5 sm:p-6 transition-transform transform ${
          showFilters
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="lg:hidden text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>
        <div className="space-y-6 overflow-y-auto h-[75vh] pr-2 custom-scrollbar">
          {/* Category */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">Category</h3>
            <div className="space-y-1">
              {categories.map((c) => (
                <label
                  key={c}
                  className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-black text-sm sm:text-base"
                >
                  <input
                    type="radio"
                    checked={filters.category === c}
                    onChange={() => handleFilterChange("category", c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">Gender</h3>
            {genders.map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-black text-sm sm:text-base"
              >
                <input
                  type="radio"
                  checked={filters.gender === g}
                  onChange={() => handleFilterChange("gender", g)}
                />
                {g}
              </label>
            ))}
          </div>

          {/* Material */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">Material</h3>
            {materials.map((m) => (
              <label
                key={m}
                className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-black text-sm sm:text-base"
              >
                <input
                  type="checkbox"
                  checked={filters.material.includes(m)}
                  onChange={() => handleFilterChange("material", m)}
                />
                {m}
              </label>
            ))}
          </div>

          {/* Colors */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">Color</h3>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {colors.map((c) => (
                <label
                  key={c}
                  style={{ backgroundColor: c.toLowerCase() }}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full cursor-pointer border ${
                    filters.color.includes(c) ? "ring-2 ring-black" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.color.includes(c)}
                    onChange={() => handleFilterChange("color", c)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => handleFilterChange("size", s)}
                  className={`px-3 py-1 border rounded-lg text-xs sm:text-sm font-medium transition ${
                    filters.size.includes(s)
                      ? "bg-black text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700 text-sm sm:text-base">Price Range</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) =>
                handleFilterChange("maxPrice", parseFloat(e.target.value))
              }
              className="w-full accent-black"
            />
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-1">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="w-full mt-4 py-2 bg-gray-800 hover:bg-black text-white rounded-lg font-semibold transition text-sm sm:text-base"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Products */}
      <div className="w-full lg:w-[78%]">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <button
            className="lg:hidden px-4 py-2 border rounded-lg text-sm sm:text-base"
            onClick={() => setShowFilters(true)}
          >
            ☰ Filters
          </button>
          <select
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="border p-2 rounded-lg bg-white shadow-sm text-sm sm:text-base"
          >
            <option value="default">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {sortedProducts.slice(page * 8, page * 8 + 8).map((prod) => (
            <motion.div
              key={prod._id}
              whileHover={{ scale: 1.03 }}
              className="relative group bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition-all"
            >
              <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow hover:text-red-500 transition">
                <IoMdHeart size={20} />
              </button>

              {discount && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  -{discount}%
                </span>
              )}

              <Link href={`/Product/${prod._id}`}>
                <div className="overflow-hidden rounded-t-xl">
                  <Image
                    src={prod.Photo[0].url}
                    alt={prod.name}
                    width={400}
                    height={400}
                    className="w-full h-44 sm:h-52 md:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-3 sm:p-4 text-center">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  {prod.name}
                </h3>
                <div className="flex justify-center items-center gap-2 mt-1">
                  <span className="text-red-600 font-bold text-sm sm:text-base">
                    ${prod.price}
                  </span>
                  {discount && (
                    <span className="line-through text-gray-400 text-xs sm:text-sm">
                      ${(prod.price + discount).toFixed(2)}
                    </span>
                  )}
                </div>
                <button className="mt-3 w-full py-1.5 sm:py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition hidden group-hover:block text-xs sm:text-sm">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-black hover:text-white transition text-sm sm:text-base"
          >
            Prev
          </button>
          {[...Array(Math.ceil(sortedProducts.length / 8)).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 border rounded-lg transition text-sm sm:text-base ${
                page === i ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === Math.ceil(sortedProducts.length / 8) - 1}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded-lg disabled:opacity-50 hover:bg-black hover:text-white transition text-sm sm:text-base"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
