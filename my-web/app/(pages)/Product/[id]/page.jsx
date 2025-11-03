"use client";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { ProductContext } from "@/app/Context/ProductContext";
import { UserContext } from "@/app/Context/UserContext";
import { CartContext } from "@/app/Context/Cart";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { Star, Heart } from "lucide-react";
import ProductSkeleton from "@/app/Skeletons/ProductSkeleton";

const Product = ({ params }) => {
  const { id } = params;
  const { products } = useContext(ProductContext);
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState({});
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ تحميل المنتج
  useEffect(() => {
    const selected = products.find((p) => p._id === id);
    if (selected) {
      setProduct(selected);
    }
  }, [id, products]);

  // ✅ فحص هل المنتج في المفضلة أم لا
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("Data"));
    if (stored && stored.favorites?.includes(id)) {
      setIsFavorite(true);
    }
  }, [id]);

  // ✅ إضافة / إزالة من المفضلة
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

      // تحديث localStorage
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

  // ✅ إضافة للسلة
  const handleAddToCart = () => {
    setAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setAdding(false);
    }, 600);
  };

  if (!product || Object.keys(product).length === 0) {
    return <ProductSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        Home / {product.category} /{" "}
        <span className="text-black">{product.name}</span>
      </div>

      {/* Alert Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black text-white text-center py-2 mb-4 rounded-lg"
        >
          {message}
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <div className="relative">
            <Image
              src={product?.Photo?.[0]?.url}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto rounded-2xl object-cover shadow-lg"
              priority
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavourite}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition ${
                isFavorite
                  ? "bg-red-600 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-600"
              }`}
            >
              <Heart
                size={22}
                fill={isFavorite ? "white" : "none"}
                strokeWidth={1.8}
              />
            </motion.button>
          </div>

          <div className="flex gap-3 mt-4">
            {product?.Photo?.slice(0, 4).map((img, idx) => (
              <Image
                key={idx}
                src={img.url}
                alt={`thumb-${idx}`}
                width={100}
                height={100}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-4xl font-extrabold text-gray-900">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews?.length || 0} Reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-red-600">${product.price}</p>

          {/* Stock / Brand / Gender */}
          <div className="space-y-1 text-gray-700">
            <p>
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Gender:</span>{" "}
              {product.gender || "Unisex"}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description ||
              "This premium product is designed for comfort and durability."}
          </p>

          {/* Quantity + Add to Cart */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="px-5 py-2 text-lg font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition ${
                adding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {adding ? (
                <>
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <span>🛒</span> Add to Cart
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <div className="border-b flex gap-6 text-gray-600 font-semibold">
          <button className="pb-2 border-b-2 border-black">Description</button>
          <button className="pb-2 hover:border-b-2 hover:border-gray-400">
            Details
          </button>
          <button className="pb-2 hover:border-b-2 hover:border-gray-400">
            Reviews
          </button>
        </div>
        <div className="mt-4 text-gray-700 leading-relaxed">
          <p>{product.description || "No additional details available."}</p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products
            .filter(
              (p) =>
                p.category === product.category && p._id !== product._id
            )
            .slice(0, 5)
            .map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Image
                  src={p.Photo?.[0]?.url}
                  alt={p.name}
                  width={300}
                  height={300}
                  className="w-full h-60 object-cover rounded-lg shadow-md"
                />
                <div className="mt-2">
                  <span className="block text-black font-semibold">
                    {p.name}
                  </span>
                  <span className="text-red-600 font-bold">${p.price}</span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
