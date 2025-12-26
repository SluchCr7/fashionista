"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/app/Context/ProductContext";
import { UserContext } from "@/app/Context/UserContext";
import { CartContext } from "@/app/Context/Cart";
import { useTheme } from "@/app/Context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Star, Heart, ShoppingBag, Minus, Plus, Share2, AlertCircle } from "lucide-react";
import ProductSkeleton from "@/app/Skeletons/ProductSkeleton";

const Product = ({ params }) => {
  const { id } = params;
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { theme } = useTheme();

  const [product, setProduct] = useState({});
  const [activeImage, setActiveImage] = useState(0);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");
  const [tabs, setTabs] = useState("description");

  // Load Product
  useEffect(() => {
    const selected = products.find((p) => p._id === id);
    if (selected) {
      setProduct(selected);
    }
  }, [id, products]);

  // Check Favorite
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Data"));
    if (stored && stored.favorites?.includes(id)) {
      setIsFavorite(true);
    }
  }, [id]);

  const toggleFavourite = async () => {
    if (!user) {
      setMessage("Please login first");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/favorite/${id}`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const { isFavorite: newStatus, message } = res.data;
      setIsFavorite(newStatus);
      setMessage(message);
      setTimeout(() => setMessage(""), 2000);

      const stored = JSON.parse(localStorage.getItem("Data"));
      if (stored) {
        if (newStatus && !stored.favorites.includes(id)) {
          stored.favorites.push(id);
        } else if (!newStatus) {
          stored.favorites = stored.favorites.filter((fid) => fid !== id);
        }
        localStorage.setItem("Data", JSON.stringify(stored));
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating favorite");
    }
  };

  const handleAddToCart = () => {
    setAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setAdding(false);
      setMessage("Added to cart!");
      setTimeout(() => setMessage(""), 2000);
    }, 600);
  };

  if (!product || Object.keys(product).length === 0) {
    return <ProductSkeleton />;
  }

  return (
    <div className="bg-background min-h-screen pb-20 pt-10">
      <div className="container mx-auto px-4 md:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/Shop`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Floating Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="fixed top-24 left-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Gallery */}
          <div className="space-y-6">
            <motion.div
              layoutId={`product-image-${id}`}
              className="relative aspect-[3/4] md:aspect-square bg-secondary/30 rounded-2xl overflow-hidden"
            >
              <Image
                src={product?.Photo?.[activeImage]?.url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <button
                onClick={toggleFavourite}
                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 ${isFavorite
                    ? "bg-destructive text-destructive-foreground"
                    : "bg-background/80 text-foreground hover:bg-background"
                  }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </motion.div>

            <div className="grid grid-cols-4 or grid-cols-5 gap-4">
              {product?.Photo?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
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
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-2">
              {product.stock > 0 ? (
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-green-500/10 text-green-600 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-destructive/10 text-destructive rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl md:text-3xl font-medium text-destructive">${product.price}</span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />
                <span className="text-foreground font-medium text-sm ml-1">4.8</span>
                <span className="text-muted-foreground text-sm">({product.reviews?.length || 12} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              {product.description || "Experience the perfect blend of style and comfort. Meticulously available in premium materials to ensure durability and elegance for every occasion."}
            </p>

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground w-20">Quantity</span>
                <div className="flex items-center border border-border rounded-full p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={adding || product.stock <= 0}
                className="flex-1 bg-primary text-primary-foreground h-14 rounded-full font-bold uppercase tracking-wider hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                {adding ? (
                  <span className="animate-pulse">Adding...</span>
                ) : (
                  <>
                    <ShoppingBag size={20} /> Add to Cart
                  </>
                )}
              </button>
              <button className="h-14 w-14 flex items-center justify-center border border-border rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                <Share2 size={20} />
              </button>
            </div>

            {/* Accordion / Tabs */}
            <div className="border-t border-border pt-8">
              <div className="flex gap-8 mb-6 border-b border-border">
                {['description', 'details', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTabs(tab)}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative ${tabs === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {tab}
                    {tabs === tab && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
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
                  className="text-muted-foreground leading-relaxed min-h-[100px]"
                >
                  {tabs === 'description' && (
                    <p>{product.description || "The quintessential piece for your wardrobe."}</p>
                  )}
                  {tabs === 'details' && (
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Brand: {product.brand || "Fashionista"}</li>
                      <li>Category: {product.category}</li>
                      <li>Gender: {product.gender || "Unisex"}</li>
                      <li>SKU: {product._id?.substring(0, 8).toUpperCase()}</li>
                    </ul>
                  )}
                  {tabs === 'reviews' && (
                    <div className="text-sm">
                      {product.reviews?.length > 0 ? (
                        "Reviews list would go here."
                      ) : (
                        "No reviews yet. Be the first to review!"
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif font-bold mb-10">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products
              .filter((p) => p.category === product.category && p._id !== product._id)
              .slice(0, 4)
              .map((p) => (
                <Link key={p._id} href={`/Product/${p._id}`} className="group block">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary/30 mb-4">
                    <Image
                      src={p.Photo?.[0]?.url}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif font-bold text-lg leading-tight group-hover:underline underline-offset-4">{p.name}</h3>
                  <p className="text-muted-foreground mt-1">${p.price}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
