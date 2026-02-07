"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/app/Context/ProductContext";
import { UserContext } from "@/app/Context/UserContext";
import { CartContext } from "@/app/Context/Cart";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingBag, Minus, Plus, Share2, ChevronDown, Check, Info } from "lucide-react";
import ProductSkeleton from "@/app/Skeletons/ProductSkeleton";
import { toast } from "@/lib/toast";
import ProductCard from "@/app/Components/ProductCard";

const Product = ({ params }) => {
  const { id } = params;
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user, AddFavourite } = useContext(UserContext);

  const [product, setProduct] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState("description");

  // Load Product
  useEffect(() => {
    const selected = products.find((p) => p._id === id);
    if (selected) {
      setProduct(selected);
      setActiveImage(0);
    }
  }, [id, products]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to shop");
      return;
    }

    setAdding(true);
    try {
      await addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.Photo?.[0]?.url,
        quantity: quantity,
      }, quantity);
      toast.success(`Added ${quantity} item(s) to bag`);
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) return toast.error("Please login first");
    await AddFavourite(product._id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  };

  if (!product || Object.keys(product).length === 0) return <ProductSkeleton />;

  const isFavorite = user?.favorites?.includes(product._id);

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      {/* 1. PRODUCT HEADER SECTION */}
      <div className="container mx-auto px-4 md:px-6 pt-6 pb-20">
        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm text-muted-foreground mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-50">/</span>
          <Link href="/Shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="opacity-50">/</span>
          <span className="text-foreground font-medium truncate">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">

          {/* LEFT: GALLERY (Sticky) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col-reverse lg:flex-row gap-4 h-fit lg:sticky lg:top-24">
            {/* Thumbnails (Vertical on Desktop, Horizontal on Mobile) */}
            {product?.Photo?.length > 1 && (
              <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] scrollbar-hide py-1">
                {product.Photo.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border transition-all duration-300 ${activeImage === idx
                        ? "border-primary ring-1 ring-primary/50 opacity-100 scale-95"
                        : "border-transparent opacity-70 hover:opacity-100 hover:border-border"
                      }`}
                  >
                    <Image src={img.url} alt={`View ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image */}
            <div className="relative flex-1 aspect-[3/4] lg:aspect-auto lg:h-[700px] bg-secondary/10 rounded-2xl overflow-hidden group border border-border/50">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
              >
                <Image
                  src={product?.Photo?.[activeImage]?.url || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </motion.div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.stock <= 0 && (
                  <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wider rounded-sm">
                    Sold Out
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-sm">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <button
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 p-3 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-all shadow-sm hover:shadow-md z-10"
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-red-500" : ""} />
              </button>
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col pt-2 lg:sticky lg:top-24 h-fit">
            <div className="mb-2 text-primary font-bold tracking-widest uppercase text-xs">
              {product.brand || "Fashionista Premium"}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight text-foreground">
              {product.name}
            </h1>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-medium">${product.price}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-secondary/30 px-3 py-1.5 rounded-full">
                <Star size={16} fill="currentColor" className="text-yellow-500" />
                <span className="font-bold text-sm">4.8</span>
                <span className="text-xs text-muted-foreground underline decoration-muted-foreground/50 underline-offset-2">
                  {product.reviews?.length || 12} Reviews
                </span>
              </div>
            </div>

            {/* Description Preview */}
            <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
              {product.description?.substring(0, 150)}...
            </p>

            {/* Selectors */}
            <div className="space-y-6 mb-10">
              {/* Example Size/Color Selectors could go here */}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Quantity</span>
                <div className="flex items-center border border-border rounded-full bg-background">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-secondary/50 rounded-l-full transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-medium text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-secondary/50 rounded-r-full transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mb-12">
              <button
                onClick={handleAddToCart}
                disabled={adding || product.stock <= 0}
                className="w-full h-14 bg-foreground text-background rounded-full font-bold uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                {adding ? (
                  <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag size={18} /> {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="w-full h-12 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border border-border rounded-full hover:bg-secondary/30 transition-colors"
              >
                <Share2 size={16} /> Share Product
              </button>
            </div>

            {/* Accordion Details */}
            <div className="divide-y divide-border border-t border-border">
              {['Description', 'Details', 'Delivery & Returns'].map((section) => (
                <div key={section} className="py-4">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="font-bold text-sm uppercase tracking-wide group-hover:text-primary transition-colors">
                      {section}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${expandedSection === section ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedSection === section && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 pb-2 text-sm text-muted-foreground leading-relaxed">
                          {section === 'Description' && (
                            <p>{product.description || "Designed with modern aesthetics and premium materials."}</p>
                          )}
                          {section === 'Details' && (
                            <ul className="space-y-1">
                              <li><strong className="text-foreground">SKU:</strong> {product._id?.slice(-8).toUpperCase()}</li>
                              <li><strong className="text-foreground">Material:</strong> Premium Blend</li>
                              <li><strong className="text-foreground">Fit:</strong> True to Size</li>
                            </ul>
                          )}
                          {section === 'Delivery & Returns' && (
                            <p>Free standard shipping on all orders over $200. Returns accepted within 30 days.</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Assurance */}
            <div className="grid grid-cols-2 gap-4 mt-8 bg-secondary/5 border border-border p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-background rounded-full shadow-sm"><Check size={14} className="text-green-500" /></div>
                <div>
                  <p className="text-xs font-bold text-foreground">Authentic</p>
                  <p className="text-[10px] text-muted-foreground">100% Genuine Products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-background rounded-full shadow-sm"><Info size={14} className="text-blue-500" /></div>
                <div>
                  <p className="text-xs font-bold text-foreground">Support</p>
                  <p className="text-[10px] text-muted-foreground">24/7 Customer Care</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. RELATED PRODUCTS */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b border-border pb-6">
            <div>
              <span className="text-primary text-xs font-bold uppercase tracking-widest block mb-2">Curated for You</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Complete the Look</h2>
            </div>
            <Link href="/Shop" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              View Collection <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
