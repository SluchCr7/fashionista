"use client";
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiSearch, FiX } from "react-icons/fi";

const ProductNavSearch = ({ setShowSearch, search, setSearch, filteredProducts }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-[100] pt-24 px-4 sm:px-0"
      >
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="relative bg-white/95 w-full sm:w-[600px] rounded-2xl shadow-2xl border border-gray-200 p-6"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
            <FiSearch className="text-gray-400 text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for products..."
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              title="Close search"
            >
              <FiX className="text-gray-500 text-lg" />
            </button>
          </div>

          {/* Results */}
          <div className="mt-5 max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredProducts.map((p) => (
                  <Link
                    key={p._id}
                    href={`/Product/${p._id}`}
                    onClick={() => setShowSearch(false)}
                    className="group flex flex-col items-center border border-gray-100 rounded-xl p-3 hover:shadow-lg transition-all bg-white hover:bg-gray-50"
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-lg">
                      <Image
                        src={p.Photo[0].url}
                        alt={p.name}
                        fill
                        sizes="100px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[13px] mt-2 text-gray-800 text-center line-clamp-2">
                      {p.name}
                    </span>
                    <span className="text-sm text-red-600 font-semibold mt-1">
                      ${p.price}
                    </span>
                  </Link>
                ))}
              </div>
            ) : search ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-sm">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  alt="No results"
                  width={60}
                  height={60}
                  className="opacity-70 mb-3"
                />
                <p>No products found for “{search}”</p>
              </div>
            ) : (
              <div className="text-gray-400 text-sm text-center py-10">
                Start typing to search for products 🔍
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductNavSearch;
