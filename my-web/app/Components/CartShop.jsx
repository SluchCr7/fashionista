'use client';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { CartContext } from '../Context/Cart';
import { toast } from '@/lib/toast';

const CartShop = () => {
  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      removeFromCart(item._id, item.name);
    } else {
      updateQuantity(item._id, newQuantity, item.name);
    }
  };

  if (!isClient) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-foreground hover:text-primary transition-colors duration-300 transform hover:scale-110"
        aria-label="Open Cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white shadow-md animate-in zoom-in">
            {cart.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
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
                    Your Bag <span className="text-muted-foreground text-sm normal-case">({cart.length} items)</span>
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center">
                      <Package className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-medium font-serif">Your bag is empty</p>
                      <p className="text-muted-foreground text-sm max-w-[200px] mx-auto">
                        Looks like you haven't added any items yet.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all hover:shadow-lg"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <motion.div
                        layout
                        key={item._id}
                        className="flex gap-4 group"
                      >
                        {/* Image */}
                        <div className="relative w-24 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0 border border-border">
                          <Image
                            src={item.image?.[0] || item.Photo?.[0]?.url || '/placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div className="space-y-1">
                            <div className="flex justify-between items-start gap-4">
                              <Link
                                href={`/Product/${item._id}`}
                                onClick={() => setIsOpen(false)}
                                className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                              >
                                {item.name}
                              </Link>
                              <p className="font-bold font-serif whitespace-nowrap">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                              {item.category} • {item.size || 'M'} • {item.color || 'Standard'}
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
                              onClick={() => removeFromCart(item._id, item.name)}
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
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-border bg-card/50 backdrop-blur-md space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="font-medium text-foreground">${cartTotal?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold font-serif">
                      <span>Total</span>
                      <span>${cartTotal?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Link
                      href="/Checkout"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      Checkout <ArrowRight size={18} />
                    </Link>
                    <button
                      onClick={clearCart}
                      className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors underline decoration-dotted"
                    >
                      Clear Shopping Bag
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
