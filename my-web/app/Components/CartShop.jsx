'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ShoppingBag, Minus, Plus, ArrowRight, X, Trash2, ShoppingCart, Sparkles } from 'lucide-react';
import { CartContext } from '../Context/CartContext';

const CartShop = () => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    addToCart,
    clearCart,
    discount,
    isCartOpen,
    setIsCartOpen
  } = useContext(CartContext);

  const FREE_SHIPPING_THRESHOLD = 500;
  const progressPercentage = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleQuantityChange = (item, change) => {
    if (change === -1 && item.quantity === 1) {
      removeFromCart(item.product._id, item.size, item.color);
    } else {
      addToCart(item.product, change, item.size, item.color);
    }
  };

  const finalTotal = cartTotal + (cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25);
  const discountAmount = discount > 0 ? (cartTotal * discount) / 100 : 0;

  if (!isClient) return null;

  return (
    <>
      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCartOpen(true)}
        className="relative group p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
        aria-label="Open Cart"
      >
        <ShoppingBag className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        {cartItems.length > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[10px] font-bold text-white dark:text-black shadow-lg"
          >
            {cartItems.length}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Drawer Portal */}
      {createPortal(
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 right-0 h-[100dvh] w-full sm:w-[480px] bg-white dark:bg-[#0a0a0a] text-black dark:text-white z-[9999] flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.1)] dark:shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-black/5 dark:border-white/10 overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-5 flex justify-between items-center border-b border-black/5 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-10">
                  <div className="flex items-center gap-3">
                    <ShoppingBag strokeWidth={1.5} className="w-6 h-6" />
                    <h2 className="text-xl font-medium tracking-wide">Your Cart</h2>
                    <span className="bg-black/5 dark:bg-white/10 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>
                  <motion.button 
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={18} strokeWidth={2} />
                  </motion.button>
                </div>

                {/* Free Shipping Progress */}
                {cartItems.length > 0 && (
                  <div className="px-6 py-4 bg-black/[0.02] dark:bg-white/[0.02] border-b border-black/5 dark:border-white/10">
                    <div className="flex justify-between items-end mb-3">
                      <p className="text-sm font-medium flex items-center gap-2">
                        {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                          <motion.span 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-1 text-yellow-600 dark:text-yellow-500"
                          >
                            <Sparkles size={16} /> You've unlocked free shipping!
                          </motion.span>
                        ) : (
                          <>Spend <span className="font-bold border-b border-dashed border-black/30 dark:border-white/30">${remainingForFreeShipping.toFixed(2)}</span> more for Free Shipping</>
                        )}
                      </p>
                    </div>
                    <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className={`h-full rounded-full transition-colors duration-500 ${cartTotal >= FREE_SHIPPING_THRESHOLD ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-black dark:bg-white'}`}
                      />
                    </div>
                  </div>
                )}

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  {cartItems.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center opacity-60 space-y-4"
                    >
                      <div className="w-24 h-24 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-2">
                        <ShoppingCart size={40} strokeWidth={1} />
                      </div>
                      <h3 className="text-xl font-medium tracking-wide">Your cart is empty</h3>
                      <p className="text-sm max-w-[250px]">Looks like you haven't added any items to your bag yet.</p>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="mt-6 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:scale-105 transition-transform"
                      >
                        Start Shopping
                      </button>
                    </motion.div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {cartItems.map((item, index) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)", x: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          key={`${item.product._id}-${item.size}-${item.color}`}
                          className="flex gap-5 group"
                        >
                          {/* Product Image */}
                          <div className="relative w-24 h-32 sm:w-28 sm:h-36 bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden shrink-0">
                            <Image
                              src={item.product.Photo?.[0]?.url || '/placeholder.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-xl" />
                          </div>

                          {/* Product Details */}
                          <div className="flex flex-col flex-1 py-1">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-medium text-[15px] sm:text-base leading-snug pr-4 line-clamp-2">
                                {item.product.name}
                              </h3>
                              <button 
                                onClick={() => removeFromCart(item.product._id, item.size, item.color)}
                                className="text-black/40 hover:text-red-500 dark:text-white/40 dark:hover:text-red-500 transition-colors p-1 -mr-1"
                                aria-label="Remove item"
                              >
                                <Trash2 size={16} strokeWidth={1.5} />
                              </button>
                            </div>

                            <div className="text-xs text-black/60 dark:text-white/60 mb-auto flex flex-wrap gap-2">
                              {item.size && <span className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md font-medium">Size: {item.size}</span>}
                              {item.color && (
                                <span className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md items-center flex gap-1.5 font-medium">
                                  Color: <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/20 dark:border-white/20" style={{backgroundColor: item.color}} />
                                </span>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Control */}
                              <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 rounded-full px-3 py-1.5 border border-black/5 dark:border-white/5">
                                <button 
                                  onClick={() => handleQuantityChange(item, -1)}
                                  className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors disabled:opacity-30"
                                >
                                  <Minus size={14} strokeWidth={2} />
                                </button>
                                <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item, 1)}
                                  className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
                                >
                                  <Plus size={14} strokeWidth={2} />
                                </button>
                              </div>

                              <p className="font-semibold text-lg tracking-tight">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* Footer / Summary */}
                {cartItems.length > 0 && (
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="p-6 border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#0a0a0a] space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] relative z-20"
                  >
                    <div className="space-y-3 mb-6 text-sm">
                      <div className="flex justify-between text-black/70 dark:text-white/70">
                        <span>Subtotal</span>
                        <span className="font-medium text-black dark:text-white">${cartTotal.toFixed(2)}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-green-600 dark:text-green-400">
                          <span className="flex items-center gap-2">
                            Discount 
                            <span className="text-[10px] bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded text-green-700 dark:text-green-300 font-bold uppercase tracking-wider">
                              -{discount}%
                            </span>
                          </span>
                          <span className="font-medium">- ${discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-black/70 dark:text-white/70">
                        <span>Shipping</span>
                        <span className="font-medium text-black dark:text-white">
                          {cartTotal >= FREE_SHIPPING_THRESHOLD ? 'Free' : '$25.00'}
                        </span>
                      </div>

                      <div className="h-px w-full bg-black/10 dark:bg-white/10 my-4" />

                      <div className="flex justify-between font-bold text-xl items-end">
                        <span>Total</span>
                        <span className="tracking-tight">${(finalTotal - discountAmount).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={clearCart}
                        className="px-4 py-4 rounded-xl border border-black/10 dark:border-white/10 text-black/60 hover:text-red-500 dark:text-white/60 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-500/10 hover:border-red-200 dark:hover:border-red-500/30 transition-all w-14 flex justify-center items-center shrink-0"
                        title="Clear Cart"
                      >
                        <Trash2 size={20} strokeWidth={1.5} />
                      </button>
                      
                      <Link href="/Checkout" className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsCartOpen(false)}
                          className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 group shadow-xl shadow-black/20 dark:shadow-white/10 hover:shadow-black/30 transition-all hover:ring-2 ring-offset-2 ring-black dark:ring-white dark:ring-offset-[#0a0a0a]"
                        >
                          Checkout 
                          <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} strokeWidth={2} />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default CartShop;