'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
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
    } else {
      addToCart(item.product, change, item.size, item.color);
    }
  };


  if (!isClient) return null;

  return (
    <>
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative p-2 text-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110"
        aria-label="Open Cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white shadow-md animate-in zoom-in">
            {cartItems.length}
          </span>
        )}

      </button>

      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background border-l border-border shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-card/50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="text-xl font-serif font-bold uppercase tracking-wider">
                    Your Bag <span className="text-muted-foreground text-sm normal-case">({cartItems.length} items)</span>
                  </h2>

                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-medium font-serif">Your bag is empty</p>
                      <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">
                        Looks like you have not added any items yet.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:shadow-lg"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Free Shipping Progress */}
                    <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                          {remainingForFreeShipping > 0
                            ? `Spend $${remainingForFreeShipping.toFixed(2)} more for free shipping`
                            : "You've unlocked free shipping! 🚚"}
                        </span>
                        <span className="text-[10px] font-bold text-primary">{Math.round(shippingProgress)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${shippingProgress}%` }}
                          className="h-full bg-primary transition-all duration-1000 ease-out"
                        />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <motion.div
                          layout
                          key={`${item.product._id}-${item.size}-${item.color}`}
                          className="flex gap-4 group"
                        >
                          {/* Image */}
                          <div className="relative w-24 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0 border border-border">
                            <Image
                              src={item.product.Photo?.[0]?.url || item.product.Photo?.url || '/placeholder.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="space-y-1">
                              <div className="flex justify-between items-start gap-4">
                                <Link
                                  href={`/Product/${item.product._id}`}
                                  onClick={() => setIsOpen(false)}
                                  className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="font-bold font-serif whitespace-nowrap">
                                  ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                {item.product.category} • {item.size || 'M'} • {item.color || 'Standard'}
                              </p>
                            </div>


                            <div className="flex items-center justify-between gap-4">
                              {/* Quantity Control */}
                              <div className="flex items-center border border-border rounded-full h-9 bg-background">
                                <button
                                  onClick={() => handleQuantityChange(item, -1)}
                                  className="w-8 h-full flex items-center justify-center hover:bg-muted rounded-l-full transition-colors text-muted-foreground hover:text-foreground"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-8 text-center text-sm font-medium tabular-nums">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item, 1)}
                                  className="w-8 h-full flex items-center justify-center hover:bg-muted rounded-r-full transition-colors text-muted-foreground hover:text-foreground"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeFromCart(item.product._id, item.size, item.color)}
                                className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-full hover:bg-destructive/10"
                                title="Remove Item"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-8 border-t border-border bg-card/80 backdrop-blur-xl space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span className="tracking-wide">Subtotal</span>
                      <span className="font-medium text-foreground">${cartTotal?.toFixed(2) || '0.00'}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center text-sm text-success">
                        <span className="tracking-wide">Discount Applied</span>
                        <span className="font-medium">-{discount}%</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span className="tracking-wide">Shipping</span>
                      <span className="font-medium text-foreground">
                        {cartTotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : '$25.00'}
                      </span>
                    </div>
                    <div className="pt-4 flex justify-between items-center">
                      <div className="space-y-1">
                        <span className="text-sm font-bold uppercase tracking-widest block">Total Amount</span>
                        <span className="text-[10px] text-muted-foreground">Taxes included</span>
                      </div>
                      <span className="text-3xl font-serif font-bold text-primary">
                        ${(cartTotal + (cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 25)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 pt-2">
                    <Link
                      href="/Checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="group relative w-full bg-primary text-primary-foreground py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-primary/20 hover:-translate-y-1 overflow-hidden"
                    >
                      <span className="relative z-10">Proceed to Checkout</span>
                      <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      <motion.div
                        className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      />
                    </Link>
                    <button
                      onClick={clearCart}
                      className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors flex items-center justify-center gap-2 opacity-60 hover:opacity-100"
                    >
                      <Trash2 size={12} /> Clear Shopping Bag
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartShop;
