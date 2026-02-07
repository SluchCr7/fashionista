"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/app/Context/ProductContext";
import { UserContext } from "@/app/Context/UserContext";
import { CartContext } from "@/app/Context/Cart";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Star, Heart, ShoppingBag, Minus, Plus, Share2 } from "lucide-react";
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
  const [tabs, setTabs] = useState("description");

  // Load Product
  useEffect(() => {
    const selected = products.find((p) => p._id === id);
    if (selected) {
      setProduct(selected);
      setActiveImage(0); // Reset image on product change
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
        // Add size/color if implemented in UI later
      }, quantity); // Pass quantity to addToCart
      toast.success(`Added ${quantity} x ${product.name} to cart`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    await AddFavourite(product._id);
    // Toast handled in Context usually, or we can add here if context doesn't.
    // Context usually handles it.
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  if (!product || Object.keys(product).length === 0) {
    return <ProductSkeleton />;
  }

  const isFavorite = user?.favorites?.includes(product._id);

  return (
    <div className="bg-background min-h-screen pb-24 pt-10">
      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/Shop`} className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Gallery */}
          <div className="space-y-6">
            <motion.div
              layoutId={`product-image-${id}`}
              className="relative aspect-[3/4] md:aspect-square bg-secondary/30 rounded-2xl overflow-hidden group"
            >
              <Image
                src={product?.Photo?.[activeImage]?.url || "/placeholder.jpg"}
                alt={product.name || "Product Image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <button
                onClick={handleToggleFavorite}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm hover:scale-110 ${isFavorite
                  ? "bg-white text-destructive shadow-red-200"
                  : "bg-white/80 text-muted-foreground hover:bg-white hover:text-destructive"
                  }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </motion.div>

            {product?.Photo?.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                {product.Photo.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary opacity-100 ring-2 ring-primary/20" : "border-transparent opacity-70 hover:opacity-100 hover:border-gray-200"
                      }`}
                  >
                    <Image
                      src={img.url}
                      alt={`View ${idx}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col">
            <div className="mb-4">
              {product.stock > 0 ? (
                <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-600 rounded-full border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> In Stock
                </div>
              ) : (
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-destructive/10 text-destructive rounded-full border border-destructive/20">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-medium text-foreground">${product.price}</span>
                {/* Placeholder for discount if any */}
                {/* <span className="text-lg text-muted-foreground line-through">$999.00</span> */}
              </div>

              <div className="h-8 w-px bg-border" />

              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="text-foreground font-bold text-sm ml-1">4.8</span>
                <span className="text-muted-foreground text-sm hover:underline cursor-pointer">({product.reviews?.length || 12} reviews)</span>
              </div>
            </div>

            <div className="prose prose-sm text-muted-foreground mb-10 max-w-none">
              <p className="leading-relaxed text-lg">
                {product.description || "Experience the perfect blend of style and comfort. Meticulously available in premium materials to ensure durability and elegance for every occasion."}
              </p>
            </div>

            {/* Controls */}
            <div className="space-y-8 mb-10">
              {/* Quantity */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quantity</span>
                <div className="flex items-center border border-border rounded-full p-1 bg-muted/20 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background shadow-sm transition-all disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background shadow-sm transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                disabled={adding || product.stock <= 0}
                className="flex-1 bg-foreground text-background h-14 rounded-full font-bold uppercase tracking-widest hover:bg-black/80 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {adding ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : (
                  <>
                    <ShoppingBag size={20} /> Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="h-14 w-14 flex items-center justify-center border border-border rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground active:scale-95"
                title="Share Product"
              >
                <Share2 size={20} />
              </button>
            </div>

            {/* Product Info Tabs */}
            <div className="border-t border-border pt-8">
              <div className="flex gap-8 mb-6 border-b border-border w-fit">
                {['description', 'details', 'shipping'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTabs(tab)}
                    className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${tabs === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {tab}
                    {tabs === tab && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground" />
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tabs}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-muted-foreground leading-relaxed min-h-[100px] text-sm"
                >
                  {tabs === 'description' && (
                    <p>{product.description || "The quintessential piece for your wardrobe. Crafted with attention to detail and premium materials."}</p>
                  )}
                  {tabs === 'details' && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                      <li className="flex justify-between border-b border-border/50 pb-2"><span>Brand</span> <span className="text-foreground font-medium">{product.brand || "Fashionista"}</span></li>
                      <li className="flex justify-between border-b border-border/50 pb-2"><span>Category</span> <span className="text-foreground font-medium">{product.category}</span></li>
                      <li className="flex justify-between border-b border-border/50 pb-2"><span>Gender</span> <span className="text-foreground font-medium">{product.gender || "Unisex"}</span></li>
                      <li className="flex justify-between border-b border-border/50 pb-2"><span>SKU</span> <span className="text-foreground font-medium">{product._id?.substring(0, 8).toUpperCase()}</span></li>
                    </ul>
                  )}
                  {tabs === 'shipping' && (
                    <div className="space-y-4">
                      <p>Free shipping on orders over $200. International shipping available.</p>
                      <p>Returns accepted within 30 days of purchase. Items must be unworn and in original packaging.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24 border-t border-border pt-16">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">You May Also Like</h2>
            <Link href="/Shop" className="hidden md:inline-flex text-sm font-bold uppercase tracking-widest border-b border-foreground/30 hover:border-foreground pb-1 transition-all">View All</Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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
