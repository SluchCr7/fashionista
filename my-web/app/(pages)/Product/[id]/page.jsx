"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/app/Context/ProductContext";
import { AuthContext } from "@/app/Context/AuthContext";
import { CartContext } from "@/app/Context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Minus, Plus, Share2, ChevronDown, Check, Info } from "lucide-react";
import ProductSkeleton from "@/app/Skeletons/ProductSkeleton";
import { toast, ecommerceToasts } from "@/lib/toast";
import ProductCard from "@/app/Components/ProductCard";
import ReviewsSection from "@/app/Components/Reviews/ReviewsSection";

const Product = ({ params }) => {
  const { id } = params;
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user, toggleFavorite } = useContext(AuthContext);

  const [product, setProduct] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [expandedSection, setExpandedSection] = useState("Description");

  useEffect(() => {
    const selected = products.find((p) => p._id === id);
    if (selected) {
      setProduct(selected);
      setActiveImage(0);
      if (selected.colors?.length > 0) setColor(selected.colors[0]);
      if (selected.sizes?.length > 0) setSize(selected.sizes[0]);
    }
  }, [id, products]);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product, quantity, size || 'M', color || 'Default');
    } catch (error) {
      toast.error("Process interrupted. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  if (!product || Object.keys(product).length === 0) return <ProductSkeleton />;

  const isFavorite = user?.favorites?.includes(product._id);

  return (
    <div className="bg-background text-foreground min-h-screen pt-32">
      <div className="container mx-auto px-6 pb-24">
        {/* Breadcrumb */}
        <nav className="typography-display !text-[8px] mb-12 flex items-center gap-3">
          <Link href="/" className="hover:text-accent transition-colors">Archive</Link>
          <span className="opacity-30">/</span>
          <Link href="/Shop" className="hover:text-accent transition-colors">Collection</Link>
          <span className="opacity-30">/</span>
          <span className="text-foreground">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Immersive Gallery */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F2F2F2] shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={product?.Photo?.[activeImage]?.url || "/placeholder.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Minimal Status */}
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="typography-display !text-[8px] bg-accent px-3 py-1.5 text-white">
                    Seasonal Offer -{product.discount}%
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleFavorite(product._id)}
                className="absolute top-8 right-8 p-4 transition-transform duration-500 hover:scale-110 active:scale-95"
              >
                <Heart size={24} strokeWidth={1} className={isFavorite ? "fill-accent text-accent" : "text-black"} />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            {product?.Photo?.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {product.Photo.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-[3/4] overflow-hidden transition-all duration-700 ${
                      activeImage === idx ? "ring-1 ring-black ring-offset-4" : "opacity-40 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.url} alt={`Selection ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Editorial Details */}
          <div className="lg:col-span-4 flex flex-col pt-4">
            <div className="space-y-8 mb-16">
              <div className="space-y-4">
                <p className="typography-display !text-accent">Edition № {product._id?.slice(-6).toUpperCase()}</p>
                <h1 className="text-5xl md:text-7xl font-serif font-black leading-none tracking-tighter">
                  {product.name}
                </h1>
                <div className="flex items-center gap-6 pt-4">
                  <span className="text-2xl font-black italic">${product.price}</span>
                  <div className="h-px flex-1 bg-border/20" />
                  <div className="flex items-center gap-2 typography-display !text-[9px]">
                    <Star size={10} fill="black" />
                    <span>{(product.averageRating || 0).toFixed(1)} Rating</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Elite Selectors */}
            <div className="space-y-12 mb-16">
              {product.colors?.length > 0 && (
                <div className="space-y-4">
                   <h3 className="typography-display !text-[9px] text-muted-foreground uppercase">Tonal Availability</h3>
                   <div className="flex flex-wrap gap-4">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded-full transition-all duration-500 ring-offset-4 ${
                          color === c ? 'ring-1 ring-black scale-110' : 'opacity-40 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.toLowerCase() }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes?.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="typography-display !text-[9px] text-muted-foreground uppercase">Size Selection</h3>
                    <button className="text-[8px] font-black underline decoration-accent underline-offset-4 uppercase tracking-[0.2em]">Size Chart</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${
                          size === s ? "bg-black text-white border-black" : "bg-transparent text-muted-foreground border-border/20 hover:border-black"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Acquistion Actions */}
            <div className="space-y-6">
              <button
                onClick={handleAddToCart}
                disabled={adding || product.stock <= 0}
                className="button-luxury w-full py-6 flex items-center justify-center gap-4 transition-all"
              >
                {adding ? "Synchronizing Selection..." : (
                  <>
                    <ShoppingBag size={18} strokeWidth={1} />
                    {product.stock <= 0 ? "Temporarily Unavailable" : "Acquire Piece"}
                  </>
                )}
              </button>
              
              <div className="divide-y divide-border/10 border-t border-b border-border/10">
                {['Craftsmanship', 'Logistics', 'Philosophy'].map((sect) => (
                  <div key={sect} className="py-6">
                    <button 
                      onClick={() => setExpandedSection(expandedSection === sect ? null : sect)}
                      className="flex items-center justify-between w-full typography-display active:text-accent"
                    >
                      {sect}
                      <Plus size={12} className={`transition-transform duration-500 ${expandedSection === sect ? "rotate-45" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {expandedSection === sect && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-6 text-xs text-muted-foreground leading-relaxed font-medium">
                            {sect === 'Craftsmanship' && "Each specimen is forged from the finest ethically-sourced materials, ensuring a lifetime of aesthetic integrity."}
                            {sect === 'Logistics' && "Complementary worldwide delivery on all acquisitions. Dispatched from our central workshop within 48 hours."}
                            {sect === 'Philosophy' && "Our pursuit of perfection is reflected in every stitch, prioritizing enduring quality over transient trends."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Curation Suggestion */}
        <div className="mt-44 pt-24 border-t border-border/10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="space-y-4">
              <p className="typography-display !text-accent">Curated Complement</p>
              <h2 className="text-4xl md:text-6xl font-serif font-black tracking-tighter">Complete <span className="italic font-light">The Ensemble.</span></h2>
            </div>
            <Link href="/Shop" className="typography-display decoration-accent underline underline-offset-8">Explore All Acquisitions</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {products
              .filter((p) => p.category === product.category && p._id !== product._id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
