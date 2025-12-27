'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { ArrowRight, Lock, MapPin, Truck, CreditCard, ShoppingBag, CheckCircle } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 md:py-20 px-4 md:px-0">

        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white md:p-12 md:shadow-2xl md:rounded-[2rem] overflow-hidden">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-10 p-4 md:p-0"
          >
            <div>
              <h1 className="text-4xl font-serif font-medium text-gray-900 mb-2">Checkout</h1>
              <p className="text-gray-500 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" /> Secure SSL Connection
              </p>
            </div>

            {/* Contact */}
            <section>
              <div className="flex items-center justify-between mb-6 border-b pb-2 border-gray-100">
                <h2 className="text-lg font-bold tracking-widest uppercase text-gray-800">01. Contact</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField id="email" label="Email Address" type="email" value={checkOutData.email} onChange={(e) => setCheckOutData({ ...checkOutData, email: e.target.value })} />
                <InputField id="phone" label="Phone Number" type="tel" value={checkOutData.phone} onChange={(e) => setCheckOutData({ ...checkOutData, phone: e.target.value })} />
              </div>
            </section>

            {/* Shipping */}
            <section>
              <div className="flex items-center justify-between mb-6 border-b pb-2 border-gray-100">
                <h2 className="text-lg font-bold tracking-widest uppercase text-gray-800">02. Shipping</h2>
              </div>
              <div className="space-y-6">
                <InputField id="name" label="Full Name" type="text" value={checkOutData.name} onChange={(e) => setCheckOutData({ ...checkOutData, name: e.target.value })} />
                <InputField id="address" label="Street Address" type="text" value={checkOutData.address} onChange={(e) => setCheckOutData({ ...checkOutData, address: e.target.value })} />
                <div className="grid grid-cols-3 gap-4">
                  <InputField id="city" label="City" type="text" value={checkOutData.city} onChange={(e) => setCheckOutData({ ...checkOutData, city: e.target.value })} />
                  <InputField id="zip" label="Zip" type="text" value={checkOutData.zip} onChange={(e) => setCheckOutData({ ...checkOutData, zip: e.target.value })} />
                  <InputField id="country" label="Country" type="text" value={checkOutData.country} onChange={(e) => setCheckOutData({ ...checkOutData, country: e.target.value })} />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <div className="flex items-center justify-between mb-6 border-b pb-2 border-gray-100">
                <h2 className="text-lg font-bold tracking-widest uppercase text-gray-800">03. Payment</h2>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex items-center gap-4 cursor-pointer hover:border-black transition-colors">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                  <p className="text-sm text-gray-500">Pay when your order arrives.</p>
                </div>
                <CheckCircle className="text-black" />
              </div>
            </section>

            <button
              onClick={handleCheckOut}
              disabled={loading}
              className="w-full py-5 bg-black text-white font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all rounded-sm flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
            >
              {loading ? "Processing..." : <>Confirm Order <ArrowRight size={18} /></>}
            </button>

          </motion.div>

          {/* Right: Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-gray-50 rounded-xl p-8 lg:p-12 border border-gray-100 h-fit"
          >
            <h2 className="text-2xl font-serif mb-8 text-gray-900">Order Summary</h2>

            {finalCart.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {finalCart.map((prod) => (
                    <div key={prod._id} className="flex gap-4 items-start">
                      <div className="relative w-20 aspect-[3/4] bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
                        <Image src={prod?.Photo?.[0]?.url || '/placeholder.jpg'} alt={prod.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium text-gray-900 text-sm leading-tight">{prod.name}</h3>
                        <p className="text-xs text-gray-500">{prod.size} / {prod.color}</p>
                        <p className="text-xs text-gray-500">Qty: {prod.quantity}</p>
                      </div>
                      <div className="font-semibold text-sm text-gray-900">
                        ${(prod.price * prod.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200 mt-2">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </>
  );
};

const InputField = ({ id, label, type, value, onChange }) => (
  <div className="relative group pt-4">
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="peer w-full bg-transparent border-b border-gray-300 py-2 focus:border-black focus:outline-none transition-colors placeholder-transparent text-gray-900 font-medium"
      placeholder={label}
    />
    <label
      htmlFor={id}
      className="absolute left-0 top-2 text-xs font-bold uppercase tracking-wider text-gray-400 peer-focus:text-black peer-focus:-translate-y-4 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:capitalize peer-placeholder-shown:text-gray-500 transition-all duration-300 pointer-events-none"
    >
      {label}
    </label>
  </div>
);

export default CheckoutPage;
