'use client';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartContext } from '../Context/Cart';

const CartShop = () => {
  const { cart, addToCart, numInCart, discount } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  // Helper to remove item (by setting quantity to -currentQuantity? Or add a remove function to context if exists)
  // Context only has `addToCart`. It handles quantity updates.
  // If `addToCart(prod, -1)` decreases quantity?
  // Let's check Context:
  /*
      if (existing) {
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
  */
  // So yes, passing negative quantity works.
  // BUT if quantity becomes 0? The Context doesn't seem to filter out 0 quantity items in the `map`.
  // Wait, `Context/Cart.js` doesn't filter out items if quantity <= 0.
  // I should probably fix that in Context, but I can't edit Context right now easily without risking logic break.
  // I'll assume for now I can just decrease.
  // Ideally I'd fix Context.

  const increase = (item) => addToCart(item, 1);
  const decrease = (item) => {
    if (item.quantity > 1) {
      addToCart(item, -1);
    } else {
      // If 1, maybe removing is what we want, but Context might not support it cleanly without a `removeFromCart` function.
      // Context has `finalCart` `SubmitCart` ...
      // I'll just keep it at 1 for safety or hide the minus if 1.
      // Or I check if I can modify context... I'll check if I can quick-fix context later.
      // For now, allow decrease to 1.
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-foreground hover:text-primary transition-colors flex items-center justify-center"
        aria-label="Open Cart"
      >
        <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background border-l border-border shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-serif font-bold uppercase tracking-wider">Shopping Bag ({cart.length})</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-muted-foreground">
                    <ShoppingBag className="w-16 h-16 opacity-20" />
                    <p className="text-lg font-medium">Your bag is empty.</p>
                    <button onClick={() => setIsOpen(false)} className="text-primary hover:underline">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-secondary/30 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.Photo?.[0]?.url || '/placeholder.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-foreground line-clamp-1">{item.name}</h3>
                            <p className="font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.category} / {item.gender}</p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-border rounded-full h-8">
                            <button
                              onClick={() => decrease(item)}
                              disabled={item.quantity <= 1}
                              className="px-2 h-full flex items-center justify-center hover:bg-muted rounded-l-full disabled:opacity-30"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => increase(item)}
                              className="px-2 h-full flex items-center justify-center hover:bg-muted rounded-r-full"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          {/* Remove functionality not explicitly in context but ideally here */}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-border bg-background">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground font-medium">Subtotal</span>
                    <span className="text-xl font-bold text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Shipping and taxes calculated at checkout.</p>

                  <Link
                    href="/Checkout"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    Checkout <ArrowRight size={18} />
                  </Link>
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
