'use client';

import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { ArrowRight, Lock, MapPin, Truck, CheckCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartContext } from '@/app/Context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, cartTotal, submitOrder, isLoading } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const shippingFee = cartTotal > 500 ? 0 : 25; // Dynamic shipping
  const grandTotal = cartTotal + shippingFee;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();

    // Basic Validation
    const emptyFields = Object.keys(formData).filter(key => !formData[key]);
    if (emptyFields.length > 0) {
      const fieldName = emptyFields[0].charAt(0).toUpperCase() + emptyFields[0].slice(1);
      toast.warning(`🛎️ Please provide your ${fieldName} to proceed with the purchase.`);
      return;
    }

    const shippingDetails = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      zip: formData.zip
    };

    const success = await submitOrder(shippingDetails, cartTotal, shippingFee, grandTotal);

    if (success) {
      router.push('/Order');
    }
  };

  if (cart.length === 0 && !isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-serif font-bold">Your bag is empty</h1>
        <button
          onClick={() => router.push('/Shop')}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left: Checkout Form */}
          <div className="flex-1 space-y-10">
            <header>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Checkout</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success rounded-full font-bold uppercase tracking-widest text-[10px] border border-success/20">
                  <ShieldCheck size={12} /> Secure Checkout
                </span>
                <span>3-Step Verification</span>
              </div>
            </header>

            <form onSubmit={handleCheckOut} className="space-y-12">
              {/* Section 1: Contact */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">01</span>
                  <h2 className="text-xl font-bold uppercase tracking-widest">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-card border border-border rounded-2xl shadow-sm">
                  <InputField id="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} />
                  <InputField id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleInputChange} />
                </div>
              </section>

              {/* Section 2: Shipping */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">02</span>
                  <h2 className="text-xl font-bold uppercase tracking-widest">Shipping Details</h2>
                </div>
                <div className="space-y-6 p-8 bg-card border border-border rounded-2xl shadow-sm">
                  <InputField id="name" label="Full Name" type="text" value={formData.name} onChange={handleInputChange} />
                  <InputField id="address" label="Street Address" type="text" value={formData.address} onChange={handleInputChange} />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <InputField id="city" label="City" type="text" value={formData.city} onChange={handleInputChange} />
                    <InputField id="zip" label="Zip Code" type="text" value={formData.zip} onChange={handleInputChange} />
                    <div className="hidden md:block">
                      <InputField id="country" label="Country" type="text" value={formData.country} onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="md:hidden">
                    <InputField id="country" label="Country" type="text" value={formData.country} onChange={handleInputChange} />
                  </div>
                </div>
              </section>

              {/* Section 3: Payment */}
              <section className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">03</span>
                  <h2 className="text-xl font-bold uppercase tracking-widest">Payment Method</h2>
                </div>
                <div className="p-1 bg-border rounded-2xl">
                  <div className="p-8 bg-background border border-border rounded-xl flex items-center gap-6 cursor-pointer border-primary shadow-inner">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Truck size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Cash on Delivery</h3>
                      <p className="text-sm text-muted-foreground">Simple & Secure. Pay when your items arrive.</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-primary text-primary-foreground font-bold uppercase tracking-[0.3em] text-sm rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isLoading ? "Processing..." : <>Complete Purchase <ArrowRight size={18} /></>}
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-[450px]">
            <div className="sticky top-32 p-8 bg-secondary/30 backdrop-blur-md rounded-3xl border border-border/50">
              <h2 className="text-2xl font-serif font-bold mb-8 uppercase tracking-wider">Order Summary</h2>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar mb-8">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="relative w-20 h-28 bg-background rounded-xl overflow-hidden border border-border flex-shrink-0 shadow-sm">
                      <Image
                        src={item.image?.[0] || item.Photo?.[0]?.url || '/placeholder.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center py-1">
                      <h3 className="font-bold text-sm leading-tight line-clamp-2">{item.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                        {item.size || 'M'} • {item.color || 'Standard'} • Qty: {item.quantity}
                      </p>
                      <p className="font-bold mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-bold text-foreground">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-bold text-foreground">
                    {shippingFee === 0 ? <span className="text-success uppercase tracking-widest text-[10px]">Free</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold font-serif pt-6 border-t border-border mt-4">
                  <span>Total</span>
                  <span className="text-primary">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Lock size={18} />
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground leading-relaxed">
                  Your personal data will be used to process your order & for other purposes described in our privacy policy.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InputField = ({ id, label, type, value, onChange }) => (
  <div className="relative pt-6">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete="off"
      className="peer w-full bg-transparent border-b-2 border-border py-2 px-0 focus:border-primary focus:outline-none transition-all placeholder-transparent text-foreground font-medium"
      placeholder={label}
    />
    <label
      htmlFor={id}
      className="absolute left-0 top-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 peer-focus:text-primary peer-placeholder-shown:text-sm peer-placeholder-shown:top-8 peer-placeholder-shown:font-medium peer-placeholder-shown:capitalize transition-all duration-300 pointer-events-none"
    >
      {label}
    </label>
  </div>
);

export default CheckoutPage;
