"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductNavSearch = ({ setShowSearch, search, setSearch, filteredProducts }) => {
  return (
    <div className="w-full max-w-[1200px] mx-auto pt-8 pb-16">
      
      {/* MASSIVE MINIMALIST SEARCH INPUT */}
      <div className="relative mb-16 group">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="SEARCH ARCHIVE"
          className="w-full bg-transparent border-b-2 border-black/20 dark:border-white/20 py-6 text-4xl md:text-6xl font-serif font-black uppercase tracking-tighter outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-black/10 dark:placeholder:text-white/10 text-black dark:text-white"
          autoFocus
        />
        {search ? (
          <button
            onClick={() => setSearch('')}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:rotate-90 transition-all duration-300 p-4"
          >
            <X className="w-8 h-8 md:w-12 md:h-12" />
          </button>
        ) : (
          <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-black/10 dark:text-white/10 w-8 h-8 md:w-12 md:h-12 pointer-events-none transition-colors group-focus-within:text-black/40 dark:group-focus-within:text-white/40" />
        )}
      </div>

      {/* RESULTS AREA */}
      <div className="min-h-[40vh]">
        <AnimatePresence mode="wait">
          
          {search ? (
            filteredProducts.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-end mb-8 border-b border-black/10 dark:border-white/10 pb-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-black/50 dark:text-white/50">
                    Curated Results
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-widest">{filteredProducts.length} Objects</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                  <AnimatePresence>
                    {filteredProducts.slice(0, 8).map((p, idx) => (
                      <motion.div
                        key={p._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      >
                        <Link
                          href={`/Product/${p._id}`}
                          onClick={() => setShowSearch(false)}
                          className="group block"
                        >
                          <div className="relative w-full aspect-[3/4] overflow-hidden bg-black/5 dark:bg-white/5 mb-6">
                            <Image
                              src={p.Photo[0]?.url || '/placeholder.png'}
                              alt={p.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover mix-blend-multiply dark:mix-blend-normal transform scale-[1.02] group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                          </div>
                          
                          <div className="flex justify-between items-start gap-4">
                            <div>
                                <h4 className="font-serif font-bold text-lg leading-tight group-hover:italic transition-all">
                                  {p.name}
                                </h4>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 block mt-2">
                                  {p.category}
                                </span>
                            </div>
                            <span className="font-bold whitespace-nowrap">${p.price}</span>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                {filteredProducts.length > 8 && (
                   <div className="mt-16 text-center">
                      <button className="flex items-center gap-4 mx-auto text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-2 hover:opacity-50 transition-opacity group">
                         View All Results <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
                      </button>
                   </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <Search className="w-16 h-16 text-black/5 dark:text-white/5 mb-8" />
                <h3 className="text-3xl font-serif font-black tracking-tighter mb-4">Nothing Found.</h3>
                <p className="text-black/50 dark:text-white/50 text-lg font-light max-w-md mx-auto">
                    The archive does not contain anything matching &quot;{search}&quot;. Try adjusting your keywords.
                </p>
              </motion.div>
            )
          ) : (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-24"
            >
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-black/20 dark:text-white/20 animate-pulse">
                Type to Explore Archive
              </p>
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductNavSearch;
