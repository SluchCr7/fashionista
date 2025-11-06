'use client';
import React, { useContext, useState, useEffect, memo, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IoMdHeart, IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FaHeart, FaStar } from 'react-icons/fa';
import { CartContext } from '../Context/Cart';
import { UserContext } from '../Context/UserContext';
import { ReviewContext } from '../Context/ReviewContext';

const ProductCont = memo(({ product }) => {
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [num, setNum] = useState(1);
  const [notify, setNotify] = useState('');
  const [productReviews, setProductReviews] = useState([]);

  const { addToCart, discount } = useContext(CartContext);
  const { user, AddFavourite } = useContext(UserContext);
  const { AddNewReview, Reviews } = useContext(ReviewContext);

  const FinalPrice = useMemo(() => (product?.price * (1 - discount / 100)).toFixed(2), [product?.price, discount]);

  // 🛒 Handle Add to Cart
  const handleCart = useCallback(() => {
    if (!user) return setNotify('Please login first');
    if (!color || !size) return setNotify('Please select color and size');
    addToCart(
      {
        id: product?._id,
        name: product?.name,
        description: product?.description,
        price: FinalPrice,
        color,
        size,
        img: product?.Photo[0]?.url,
      },
      num
    );
    setNotify('Added to cart successfully');
    setColor('');
    setSize('');
    setNum(1);
    setTimeout(() => setNotify(''), 3000);
  }, [user, color, size, num, FinalPrice, addToCart, product]);

  // ⭐ Add Review
  const handleStarClick = useCallback(
    (rating) => {
      if (!user) return setNotify('Please login to review');
      AddNewReview(product?._id, rating);
      setNotify(`Thank you for your ${rating}-star review!`);
      setTimeout(() => setNotify(''), 3000);
    },
    [user, AddNewReview, product]
  );

  // 💬 Filter Product Reviews
  useEffect(() => {
    setProductReviews(Reviews.filter((review) => review.product === product?._id));
  }, [Reviews, product?._id]);

  // ⭐ Calculate Average Rating
  const avgRating = useMemo(() => {
    const total = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return productReviews.length ? (total / productReviews.length).toFixed(1) : 0;
  }, [productReviews]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <motion.div className="w-16 h-16 border-4 border-t-transparent border-gray-800 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
      {notify && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full shadow-lg z-50"
        >
          {notify}
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 🖼️ Product Image */}
        <div className="lg:w-1/2 flex flex-col items-center">
          <motion.div whileHover={{ scale: 1.03 }} className="relative w-full">
            <Image
              src={product?.Photo[0]?.url}
              alt={product?.name}
              width={600}
              height={600}
              className="w-full rounded-2xl object-cover shadow-md"
            />

            {/* Discount & Wishlist */}
            <div className="absolute top-3 left-3 flex gap-3">
              {discount > 0 && <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">-{discount}%</span>}
              <button
                onClick={() => AddFavourite(product?._id)}
                className="bg-white p-2 rounded-full shadow-md hover:text-red-600 transition"
              >
                {user?.favorites?.includes(product?._id) ? <FaHeart size={20} color="red" /> : <IoMdHeart size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Thumbnail Gallery */}
          {product?.Photo?.length > 1 && (
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {product.Photo.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
                >
                  <Image src={img.url} alt="thumb" width={100} height={100} className="object-cover w-full h-full" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* 🛍️ Product Details */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product?.name}</h1>
          <p className="text-gray-600 leading-relaxed">{product?.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.div key={s} whileHover={{ scale: 1.2 }} onClick={() => handleStarClick(s)}>
                <FaStar size={22} color={s <= avgRating ? '#facc15' : '#e5e7eb'} />
              </motion.div>
            ))}
            <span className="text-gray-600 text-sm">({avgRating}/5 from {productReviews.length} reviews)</span>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4 text-xl font-semibold">
            <span className="text-red-600">${FinalPrice}</span>
            {discount > 0 && <span className="line-through text-gray-400">${product?.price}</span>}
          </div>

          {/* Color Selection */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Color</p>
            <div className="flex gap-3 flex-wrap">
              {product?.colors?.map((clr, i) => (
                <motion.div
                  key={i}
                  onClick={() => setColor(clr)}
                  style={{ backgroundColor: clr.toLowerCase() }}
                  className={`w-10 h-10 rounded-full cursor-pointer border ${
                    color === clr ? 'border-4 border-black scale-110' : 'border-gray-300'
                  }`}
                  whileHover={{ scale: 1.15 }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <p className="font-semibold text-gray-700 mb-1">Size</p>
            <div className="flex gap-3 flex-wrap">
              {product?.sizes?.map((sz, i) => (
                <motion.button
                  key={i}
                  onClick={() => setSize(sz)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 border rounded-lg font-medium ${
                    size === sz
                      ? 'bg-yellow-400 border-black text-black'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-gray-500'
                  }`}
                >
                  {sz}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-3">
            <button onClick={() => setNum((p) => Math.max(1, p - 1))} className="border p-2 rounded-lg hover:bg-gray-100">
              <IoMdRemove />
            </button>
            <span className="text-lg font-semibold">{num}</span>
            <button onClick={() => setNum((p) => p + 1)} className="border p-2 rounded-lg hover:bg-gray-100">
              <IoMdAdd />
            </button>
          </div>

          {/* Add to Cart */}
          <motion.button
            onClick={handleCart}
            whileHover={{ scale: 1.03 }}
            className="w-full bg-black text-white py-3 mt-4 rounded-lg font-semibold hover:bg-gray-900 transition-all"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </div>
  );
});

ProductCont.displayName = 'ProductCont';
export default ProductCont;
