'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight, Lock, MapPin, Truck, CreditCard, ShoppingBag } from 'lucide-react';
import Notify from '../../Components/Notify';
import { CartContext } from '@/app/Context/Cart';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutPage = () => {
  const [checkOutData, setCheckOutData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const { finalCart, submitOrder } = useContext(CartContext);
  const [ProductsArrOrder, setProductsArrayOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const total = finalCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10;
  const grandTotal = total + shipping;

  const handleCheckOut = async () => {
    if (Object.values(checkOutData).every(val => val !== "")) {
      setLoading(true);
      await submitOrder(ProductsArrOrder, checkOutData.address, checkOutData.phone, total);
      setLoading(false);
      setMessage("✅ Order placed successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("⚠️ Please fill in all shipping details");
      setTimeout(() => setMessage(""), 3000);
    }
  }

  useEffect(() => {
    const ProductsIds = finalCart.map((prod) => prod._id);
    setProductsArrayOrder(ProductsIds);
  }, [finalCart]);

  return (
    <>
      <Notify Notify={message} />
      <div className="min-h-screen bg-background py-10 md:py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Checkout</h1>
            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              <Lock className="w-4 h-4" /> Secure Checkout
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

            {/* Form Section */}
            <div className="lg:col-span-7 space-y-10">
              {/* Contact */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField id="email" label="Email Address" type="email" value={checkOutData.email} onChange={(e) => setCheckOutData({ ...checkOutData, email: e.target.value })} />
                  <InputField id="phone" label="Phone Number" type="tel" value={checkOutData.phone} onChange={(e) => setCheckOutData({ ...checkOutData, phone: e.target.value })} />
                </div>
              </section>

              {/* Shipping */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider">Shipping Address</h2>
                </div>
                <div className="space-y-6">
                  <InputField id="name" label="Full Name" type="text" value={checkOutData.name} onChange={(e) => setCheckOutData({ ...checkOutData, name: e.target.value })} />
                  <InputField id="address" label="Address" type="text" value={checkOutData.address} onChange={(e) => setCheckOutData({ ...checkOutData, address: e.target.value })} />
                  <div className="grid grid-cols-2 gap-6">
                    <InputField id="city" label="City" type="text" value={checkOutData.city} onChange={(e) => setCheckOutData({ ...checkOutData, city: e.target.value })} />
                    <InputField id="zip" label="Zip Code" type="text" value={checkOutData.zip} onChange={(e) => setCheckOutData({ ...checkOutData, zip: e.target.value })} />
                  </div>
                  <InputField id="country" label="Country" type="text" value={checkOutData.country} onChange={(e) => setCheckOutData({ ...checkOutData, country: e.target.value })} />
                </div>
              </section>

              {/* Payment Method (Visual Only for now) */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <h2 className="text-xl font-bold font-serif uppercase tracking-wider">Payment Method</h2>
                </div>
                <div className="p-4 border border-border rounded-xl flex items-center gap-4 bg-secondary/20">
                  <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Cash on Delivery</h3>
                    <p className="text-sm text-muted-foreground">Pay upon receiving your order.</p>
                  </div>
                  <div className="ml-auto w-4 h-4 rounded-full border-2 border-primary bg-primary" />
                </div>
              </section>

              <button
                onClick={handleCheckOut}
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Processing..." : <>Complete Order <ArrowRight size={20} /></>}
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <div className="bg-secondary/20 rounded-2xl p-6 md:p-10 sticky top-24 border border-border">
                <h2 className="text-2xl font-serif font-bold mb-8">Order Summary</h2>

                {finalCart.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Your cart seems empty.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {finalCart.map((prod) => (
                        <div key={prod._id} className="flex gap-4">
                          <div className="relative w-16 h-20 bg-background rounded-md overflow-hidden flex-shrink-0 border border-border">
                            <Image src={prod?.Photo?.[0]?.url || '/placeholder.jpg'} alt={prod.name} fill className="object-cover" />
                            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-bl">x{prod.quantity}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-sm line-clamp-2">{prod.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{prod.size} / {prod.color}</p>
                          </div>
                          <div className="font-bold text-sm">
                            ${(prod.price * prod.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border pt-6 space-y-3">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold text-foreground border-t border-border pt-4">
                        <span>Total</span>
                        <span>${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const InputField = ({ id, label, type, value, onChange }) => (
  <div className="flex flex-col gap-2 relative group">
    <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-focus-within:text-primary transition-colors">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="bg-background border border-border rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted-foreground/30"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

export default CheckoutPage;
