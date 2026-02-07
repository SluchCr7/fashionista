"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Package } from "lucide-react";

const ProductNavSearch = ({ setShowSearch, search, setSearch, filteredProducts }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for products, collections, brands..."
          className="w-full bg-secondary/30 border border-border rounded-full py-4 pl-14 pr-12 text-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all font-serif"
          autoFocus
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Results */}
      <div className="min-h-[100px]">
        {search ? (
          filteredProducts.length > 0 ? (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Search Results ({filteredProducts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {filteredProducts.map((p) => (
                  <Link
                    key={p._id}
                    href={`/Product/${p._id}`}
                    onClick={() => setShowSearch(false)}
                    className="group flex gap-4 md:flex-col md:gap-2 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <div className="relative w-16 h-16 md:w-full md:aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
                      <Image
                        src={p.Photo[0].url}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 64px, 200px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center md:items-start">
                      <h4 className="font-serif font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-1">
                        {p.name}
                      </h4>
                      <span className="text-sm font-medium text-muted-foreground mt-1">
                        ${p.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground font-medium">No products found for {search}</p>
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Start typing to discover</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductNavSearch;
