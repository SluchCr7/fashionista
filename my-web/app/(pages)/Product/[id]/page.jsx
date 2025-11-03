"use client"
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "@/app/Context/ProductContext";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { CartContext } from "@/app/Context/Cart";
import ProductSkeleton from "@/app/Skeletons/ProductSkeleton";

const Product = ({ params }) => {
  const { id } = params;
  const { products , getProductBuID, product , loadingProduct } = useContext(ProductContext);
  const {cart , addToCart} = useContext(CartContext)
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setAdding(true);
    setTimeout(() => {
      addToCart(product, quantity);
      setAdding(false);
    }, 600);
  };

  useEffect(() => {
    getProductBuID(id);
  }, [id]);

  if (loadingProduct) {
    return (
      <ProductSkeleton/>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        Home / {product.category} / <span className="text-black">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <Image
            src={product?.Photo[0]?.url}
            alt={product?.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-xl object-cover shadow-md"
            priority
          />
          <div className="flex gap-3 mt-4">
            {product?.Photo?.slice(0, 4).map((img, idx) => (
              <Image
                key={idx}
                src={img.url}
                alt={`thumb-${idx}`}
                width={100}
                height={100}
                className="w-20 h-20 object-cover rounded-md cursor-pointer hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </motion.div>

        {/* Right: Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-6"
        >
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
            <span className="text-sm text-gray-500 ml-2">(120 Reviews)</span>
          </div>
          {/* Price */}
          <p className="text-2xl font-bold text-red-600">${product.price}</p>
          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description || "This is a premium product designed with top quality materials."}
          </p>
          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
              >
                −
              </button>
              <span className="px-5 py-2 text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-2 text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition ${
                adding ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
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

            {/* Buy Now */}
            <button className="border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition">
              Buy Now
            </button>
          </div>

        </motion.div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b flex gap-6 text-gray-600">
          <button className="pb-2 border-b-2 border-black font-semibold">Description</button>
          <button className="pb-2 hover:border-b-2 hover:border-gray-400">Details</button>
          <button className="pb-2 hover:border-b-2 hover:border-gray-400">Reviews</button>
        </div>
        <div className="mt-4 text-gray-700">
          <p>{product.description || "No additional details available."}</p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products
            .filter(
              (prod) =>
                prod.gender === product.gender &&
                prod.category === product.category &&
                prod._id !== product._id
            )
            .slice(0, 5)
            .map((prod) => (
              <motion.div 
                key={prod._id} 
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Image
                  src={prod?.Photo[0]?.url}
                  alt={prod?.name}
                  width={300}
                  height={300}
                  className="w-full h-60 object-cover rounded-lg shadow"
                />
                <div className="mt-2">
                  <span className="block text-black font-semibold">{prod?.name}</span>
                  <span className="text-red-600 font-bold">${prod?.price}</span>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
