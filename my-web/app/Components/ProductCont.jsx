'use client';
import React, { useContext, useState, useEffect, memo, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdHeart, IoMdAdd, IoMdRemove } from 'react-icons/io';
import { FaHeart, FaStar } from 'react-icons/fa';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import { ReviewContext } from '../Context/ReviewContext';
import { ChevronRight, Share2, ShieldCheck } from 'lucide-react';

const ProductCont = memo(({ product }) => {
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [num, setNum] = useState(1);
  const [notify, setNotify] = useState('');
  const [productReviews, setProductReviews] = useState([]);
  const [activeImg, setActiveImg] = useState(0);

  const { addToCart, discount } = useContext(CartContext);
  const { user, toggleFavorite } = useContext(AuthContext);
  const { addReview, reviews } = useContext(ReviewContext);

  const FinalPrice = useMemo(() => (product?.price * (1 - discount / 100)).toFixed(2), [product?.price, discount]);

  // 🛒 Handle Add to Cart
  const handleCart = useCallback(() => {
    if (!color || !size) return setNotify('Please select color and size');
    addToCart(product, num, size, color);
    setNotify('Added to cart successfully');
    setColor('');
    setSize('');
    setNum(1);
    setTimeout(() => setNotify(''), 3000);
  }, [color, size, num, addToCart, product]);

  // ⭐ Add Review
  const handleStarClick = useCallback(
    (rating) => {
      if (!user) return setNotify('Please login to review');
      addReview({ product: product?._id, rating });
      setNotify(`Thank you for your ${rating}-star review!`);
      setTimeout(() => setNotify(''), 3000);
    },
    [user, addReview, product]
  );

  useEffect(() => {
    setProductReviews(reviews.filter((review) => review.product === product?._id));
  }, [reviews, product?._id]);


  const avgRating = useMemo(() => {
    const total = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return productReviews.length ? (total / productReviews.length).toFixed(1) : 0;
  }, [productReviews]);

  if (!product)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-gray-200 border-t-black rounded-full"
        />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 bg-white">
      <AnimatePresence>
        {notify && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-3 rounded-full shadow-2xl z-[100] text-sm font-medium tracking-wide"
          >
            {notify}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* 🖼️ Product Image Gallery */}
        <div className="lg:w-[55%] flex flex-col gap-6">
          <motion.div
            layoutId="product-main-img"
            className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50 rounded-sm group"
          >
            <Image
              src={product?.Photo[activeImg]?.url || product?.Photo[0]?.url}
              alt={product?.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Top Badge Overlay */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              {discount > 0 && (
                <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                  SALE {discount}% OFF
                </span>
              )}
            </div>

            <button
              onClick={() => toggleFavorite(product?._id)}
              className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:scale-110 transition-transform"
            >
              {user?.favorites?.includes(product?._id) ? <FaHeart size={18} className="text-red-500" /> : <IoMdHeart size={20} />}
            </button>
          </motion.div>

          {/* Thumbnails */}
          {product?.Photo?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {product.Photo.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-24 aspect-[4/5] flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all ${activeImg === i ? 'border-black opacity-100 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <Image src={img.url} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 🛍️ Product Info */}
        <div className="lg:w-[45%] flex flex-col">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 mb-8">
            <span className="hover:text-black cursor-pointer">Shop</span>
            <ChevronRight size={10} />
            <span className="hover:text-black cursor-pointer">{product?.gender}</span>
            <ChevronRight size={10} />
            <span className="text-black font-semibold truncate">{product?.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4 leading-tight">
            {product?.name}
          </h1>

          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-semibold text-black">${FinalPrice}</span>
              {discount > 0 && <span className="text-lg text-gray-400 line-through font-light">${product?.price}</span>}
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar key={s} size={14} className={s <= avgRating ? 'text-black' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{productReviews.length} Reviews</span>
            </div>
          </div>

          <p className="text-gray-500 font-light leading-relaxed mb-10">
            {product?.description}
          </p>

          {/* Selectors */}
          <div className="space-y-10 mb-12">
            {/* Color */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Select Color</p>
              <div className="flex gap-4">
                {product?.colors?.map((clr, i) => (
                  <button
                    key={i}
                    onClick={() => setColor(clr)}
                    className={`group relative w-10 h-10 rounded-full flex items-center justify-center border transition-all ${color === clr ? 'border-black scale-110' : 'border-transparent hover:border-gray-200'
                      }`}
                  >
                    <div
                      style={{ backgroundColor: clr.toLowerCase() }}
                      className="w-8 h-8 rounded-full shadow-inner"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Select Size</p>
                <button className="text-[10px] uppercase font-bold tracking-widest text-gray-900 underline underline-offset-4">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product?.sizes?.map((sz, i) => (
                  <button
                    key={i}
                    onClick={() => setSize(sz)}
                    className={`px-6 py-3 border text-xs font-bold tracking-widest transition-all rounded-sm ${size === sz
                      ? 'bg-black border-black text-white'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-black hover:text-black'
                      }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Quantity</p>
              <div className="flex items-center w-32 justify-between border border-gray-100 p-2 rounded-sm">
                <button onClick={() => setNum((p) => Math.max(1, p - 1))} className="p-2 hover:bg-gray-50 transition-colors">
                  <IoMdRemove />
                </button>
                <span className="text-sm font-bold">{num}</span>
                <button onClick={() => setNum((p) => p + 1)} className="p-2 hover:bg-gray-50 transition-colors">
                  <IoMdAdd />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <motion.button
              onClick={handleCart}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-black text-white py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-900 transition-all rounded-sm shadow-xl"
            >
              Add to Bag
            </motion.button>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-4 border border-gray-100 text-[10px] font-bold uppercase tracking-widest hover:border-black transition-colors rounded-sm">
                <Share2 size={14} /> Share
              </button>
              <button className="flex items-center justify-center gap-2 py-4 border border-gray-100 text-[10px] font-bold uppercase tracking-widest hover:border-black transition-colors rounded-sm">
                <ShieldCheck size={14} /> Warranty
              </button>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span>In stock and ready to ship</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest font-bold">
              Complimentary shipping on orders over $200. <br />
              Delivery within 2-4 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCont.displayName = 'ProductCont';
export default ProductCont;
