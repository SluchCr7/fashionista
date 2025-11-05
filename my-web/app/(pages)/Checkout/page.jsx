'use client'

import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Notify from '../../Components/Notify'
import { CartContext } from '@/app/Context/Cart'

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

  const handlCheckOut = async () => {
    if (Object.values(checkOutData).every(val => val !== "")) {
      setLoading(true);
      await submitOrder(ProductsArrOrder, checkOutData.address, checkOutData.phone, total);
      setLoading(false);
      setMessage("✅ Order placed successfully!");
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("⚠️ You must fill all details");
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
      <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-8 flex justify-center items-start">
        <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">

          {/* Checkout Form */}
          <div className="flex flex-col gap-8 w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
              Checkout
            </h1>

            {/* Contact Details */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Contact Details
              </h2>
              <div className="flex flex-col gap-4">
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  value={checkOutData.email}
                  onChange={(e) => setCheckOutData({ ...checkOutData, email: e.target.value })}
                />
                <InputField
                  id="phone"
                  label="Phone Number"
                  type="text"
                  value={checkOutData.phone}
                  onChange={(e) => setCheckOutData({ ...checkOutData, phone: e.target.value })}
                />
              </div>
            </section>

            {/* Delivery Details */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                Delivery Details
              </h2>
              <div className="flex flex-col gap-4">
                <InputField
                  id="name"
                  label="Full Name"
                  type="text"
                  value={checkOutData.name}
                  onChange={(e) => setCheckOutData({ ...checkOutData, name: e.target.value })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    id="address"
                    label="Address"
                    type="text"
                    value={checkOutData.address}
                    onChange={(e) => setCheckOutData({ ...checkOutData, address: e.target.value })}
                  />
                  <InputField
                    id="city"
                    label="City"
                    type="text"
                    value={checkOutData.city}
                    onChange={(e) => setCheckOutData({ ...checkOutData, city: e.target.value })}
                  />
                  <InputField
                    id="country"
                    label="Country"
                    type="text"
                    value={checkOutData.country}
                    onChange={(e) => setCheckOutData({ ...checkOutData, country: e.target.value })}
                  />
                  <InputField
                    id="zip"
                    label="Zip Code"
                    type="text"
                    value={checkOutData.zip}
                    onChange={(e) => setCheckOutData({ ...checkOutData, zip: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-4 h-4 rounded-full bg-green-600 shadow-inner"></div>
              <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
            </div>

            <button
              onClick={handlCheckOut}
              disabled={loading}
              className={`mt-4 w-full py-3 rounded-lg text-white font-semibold tracking-wide transition-all duration-300 
                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-red-700 shadow-md hover:shadow-lg"}`}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>

          {/* Order Summary */}
          <div className="flex flex-col gap-6 w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide">
              Order Summary
            </h2>

            {finalCart.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No items in your cart.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {finalCart.map((prod) => (
                    <div key={prod._id} className="flex justify-between items-center border-t border-gray-200 pt-4">
                      <div className="flex gap-4 items-center">
                        <Image
                          src={prod?.Photo[0]?.url}
                          alt={prod?.name}
                          width={80}
                          height={80}
                          className="rounded-md object-cover w-[80px] h-[80px] hover:scale-105 transition-transform duration-300"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{prod?.name}</h3>
                          <p className="text-sm text-gray-600">
                            Size: <span className="font-semibold text-gray-800">{prod?.size}</span> | 
                            Color: <span className="font-semibold text-gray-800">{prod?.color}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-700">
                        <span className="font-semibold">${prod?.price}</span> × {prod?.quantity}
                        <p className="font-bold text-gray-900">${prod?.price * prod?.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold">$10.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold border-t pt-3">
                    <span>Total</span>
                    <span>${(total + 10).toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/* === حقل إدخال مع تصميم احترافي === */
const InputField = ({ id, label, type, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-red-600 outline-none transition-all duration-200 focus:border-red-600"
    />
  </div>
)

export default CheckoutPage
