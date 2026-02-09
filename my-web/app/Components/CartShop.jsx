'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, Package, Sparkles, Gift } from 'lucide-react';
import { CartContext } from '../Context/CartContext';
import { toast } from '@/lib/toast';

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
  const shippingProgress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);

  const [isClient, setIsClient] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (item, change) => {
    if (change === -1 && item.quantity === 1) {
      removeFromCart(item.product._id, item.size, item.color);
      toast.success('Item removed from cart');
    } else {
      addToCart(item.product, change, item.size, item.color);
    }
  };

  const handleRemoveItem = (productId, size, color) => {
    removeFromCart(productId, size, color);
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared successfully');
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
        className="relative p-2 text-foreground hover:text-primary transition-colors duration-300 rounded-full hover:bg-muted/50"
        aria-label="Open Cart"
      >
        <ShoppingBag className="w-5 h-5" />
        <AnimatePresence>
          {cartItems.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-[10px] font-bold text-white shadow-lg shadow-primary/30"
            >
              {cartItems.length}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-gradient-to-b from-background via-background to-background/95 border-l border-border/50 shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-card/80 to-card/40 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">Shopping Bag</h2>
                    <p className="text-xs text-muted-foreground">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2.5 hover:bg-muted/80 rounded-xl transition-all duration-200 group"
                >
                  <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </motion.button>
              </div>

              {/* Items Container */}
              <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-muted/50 scrollbar-track-transparent hover:scrollbar-thumb-muted">
                {cartItems.length === 0 ? (
                  /* Empty State */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-6 px-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      className="relative"
                    >
                      <div className="w-28 h-28 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-primary/60" strokeWidth={1.5} />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute -top-2 -right-2 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="w-4 h-4 text-primary" />
                      </motion.div>
                    </motion.div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold font-serif">Your bag is empty</h3>
                      <p className="text-sm text-muted-foreground max-w-[240px] leading-relaxed">
                        Start adding items to your cart and they'll appear here
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCartOpen(false)}
                      className="px-8 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    >
                      Discover Products
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {/* Free Shipping Progress */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-5 border border-primary/20 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                      <div className="relative space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-primary" />
                            <span className="text-xs font-bold text-primary">
                              {remainingForFreeShipping > 0
                                ? `$${remainingForFreeShipping.toFixed(2)} away from free shipping`
                                : "Free shipping unlocked! 🎉"}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-primary tabular-nums">
                            {Math.round(shippingProgress)}%
                          </span>
                        </div>
                        <div className="relative h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${shippingProgress}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg shadow-primary/30"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Cart Items */}
                    <div className="space-y-4">
                      <AnimatePresence mode="popLayout">
                        {cartItems.map((item, index) => (
                          <motion.div
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, height: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={`${item.product._id}-${item.size}-${item.color}`}
                            className="group relative bg-card/30 hover:bg-card/50 border border-border/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg"
                          >
                            <div className="flex gap-4">
                              {/* Product Image */}
                              <Link
                                href={`/Product/${item.product._id}`}
                                onClick={() => setIsCartOpen(false)}
                                className="relative w-24 h-28 bg-muted/50 rounded-xl overflow-hidden flex-shrink-0 border border-border/50"
                              >
                                <Image
                                  src={item.product.Photo?.[0]?.url || item.product.Photo?.url || '/placeholder.jpg'}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </Link>

                              {/* Product Details */}
                              <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div className="space-y-2">
                                  <div className="flex justify-between items-start gap-3">
                                    <Link
                                      href={`/Product/${item.product._id}`}
                                      onClick={() => setIsCartOpen(false)}
                                      className="font-semibold text-sm text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
                                    >
                                      {item.product.name}
                                    </Link>
                                    <p className="font-bold text-sm tabular-nums whitespace-nowrap">
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
                                    <span className="px-2 py-0.5 bg-muted/50 rounded-md">{item.size || 'M'}</span>
                                    <span className="px-2 py-0.5 bg-muted/50 rounded-md">{item.color || 'Standard'}</span>
                                  </div>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between gap-3 mt-2">
                                  <div className="flex items-center border border-border/50 rounded-xl h-9 bg-background/50 backdrop-blur-sm">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleQuantityChange(item, -1)}
                                      className="w-9 h-full flex items-center justify-center hover:bg-muted/80 rounded-l-xl transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                      <Minus size={14} strokeWidth={2.5} />
                                    </motion.button>
                                    <span className="w-10 text-center text-sm font-bold tabular-nums">
                                      {item.quantity}
                                    </span>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleQuantityChange(item, 1)}
                                      className="w-9 h-full flex items-center justify-center hover:bg-muted/80 rounded-r-xl transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                      <Plus size={14} strokeWidth={2.5} />
                                    </motion.button>
                                  </div>

                                  {/* Remove Button */}
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleRemoveItem(item.product._id, item.size, item.color)}
                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-xl hover:bg-destructive/10"
                                    title="Remove Item"
                                  >
                                    <Trash2 size={16} strokeWidth={2} />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - Checkout Section */}
              {cartItems.length > 0 && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative p-6 border-t border-border/50 bg-gradient-to-t from-card/90 via-card/70 to-card/50 backdrop-blur-xl space-y-5"
                >
                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold tabular-nums">${cartTotal?.toFixed(2) || '0.00'}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-emerald-600 dark:text-emerald-400">Discount ({discount}%)</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                          -${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold tabular-nums">
                        {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                          <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                        ) : (
                          '$25.00'
                        )}
                      </span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <div className="flex justify-between items-center pt-1">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider">Total</p>
                        <p className="text-[10px] text-muted-foreground">Taxes included</p>
                      </div>
                      <p className="text-2xl font-bold font-serif text-primary tabular-nums">
                        ${(finalTotal - discountAmount).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link
                      href="/Checkout"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative w-full bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                        <span className="relative z-10">Proceed to Checkout</span>
                        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleClearCart}
                      className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors flex items-center justify-center gap-2 rounded-lg hover:bg-destructive/5"
                    >
                      <Trash2 size={12} />
                      Clear Cart
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartShop;
