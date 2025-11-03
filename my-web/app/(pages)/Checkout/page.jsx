'use client'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import Notify from '../../Components/Notify';
import { CartContext } from '@/app/Context/Cart';

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
  const [message , setMessage] = useState("");
  const { finalCart , submitOrder } = useContext(CartContext);
  const [ProductsArrOrder , setProductsArrayOrder] = useState([]);
  const [loading , setLoading] = useState(false);

  const total = finalCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlCheckOut = async () => {
    if(Object.values(checkOutData).every(val => val !== "")){
      setLoading(true);
      await submitOrder(ProductsArrOrder , checkOutData.address , checkOutData.phone , total);
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
  useEffect(()=>{
    console.log(ProductsArrOrder)
  },[ProductsArrOrder])
  return (
    <>
      <Notify Notify={message}/>
      <div className='flex mx-auto flex-col md:flex-row items-start gap-6 py-20 px-5 justify-center max-w-[1200px]'>
        
        {/* Checkout Form */}
        <div className='flex items-start flex-col gap-6 w-full md:w-1/2 bg-white shadow-md rounded-lg p-6'>
          <span className='font-bold text-2xl uppercase text-DarkRed'>Checkout</span>
          
          {/* Contact Details */}
          <div className='w-full space-y-4'>
            <h2 className='text-lg font-semibold text-gray-900'>Contact Details</h2>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="email">Email</label>
              <input id='email' value={checkOutData.email} 
                onChange={(e)=> setCheckOutData({...checkOutData, email: e.target.value})}
                type="email" 
                className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-DarkRed outline-none' />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="number">Phone Number</label>
              <input id='number' value={checkOutData.phone} 
                onChange={(e)=> setCheckOutData({...checkOutData, phone: e.target.value})}
                type="text" 
                className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-DarkRed outline-none' />
            </div>
          </div>

          {/* Delivery Details */}
          <div className='w-full space-y-4'>
            <h2 className='text-lg font-semibold text-gray-900'>Delivery Details</h2>
            <div className='flex flex-col gap-2 w-full'>
              <label htmlFor="name">Full Name</label>
              <input id='name' value={checkOutData.name} 
                onChange={(e)=> setCheckOutData({...checkOutData, name: e.target.value})}
                type="text" 
                className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-DarkRed outline-none' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="address">Address</label>
                <input id='address' value={checkOutData.address} 
                  onChange={(e)=> setCheckOutData({...checkOutData, address: e.target.value})}
                  type="text" 
                  className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-DarkRed outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="city">City</label>
                <input id='city' value={checkOutData.city} 
                  onChange={(e)=> setCheckOutData({...checkOutData, city: e.target.value})}
                  type="text" 
                  className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-DarkRed outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="country">Country</label>
                <input id='country' value={checkOutData.country} 
                  onChange={(e)=> setCheckOutData({...checkOutData, country: e.target.value})}
                  type="text" 
                  className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-DarkRed outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="zip">Zip Code</label>
                <input id='zip' value={checkOutData.zip} 
                  onChange={(e)=> setCheckOutData({...checkOutData, zip: e.target.value})}
                  type="text" 
                  className='border border-gray-300 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-DarkRed outline-none' />
              </div>
            </div>
          </div>

          <span className='text-sm text-gray-700 flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-black'></div> Cash on delivery
          </span>

          <button 
            onClick={handlCheckOut} 
            disabled={loading}
            className={`p-4 w-full rounded-md text-white uppercase font-semibold transition 
            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black hover:bg-DarkRed"}`}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>

        {/* Order Summary */}
        <div className='flex flex-col gap-4 w-full md:w-1/2 bg-white shadow-md rounded-lg p-6'>
          <span className='font-bold text-2xl uppercase text-DarkRed'>Order Summary</span>
          
          {finalCart.map((prod) => (
            <div key={prod.id} className='border-t border-gray-200 pt-4 flex justify-between items-center w-full'>
              <div className='flex gap-3'>
                <Image 
                  src={prod?.Photo[0].url} alt='product image' width={500} height={500}
                  className='w-[80px] h-[80px] rounded-md object-cover' />
                <div className='flex flex-col'>
                  <h1 className='text-lg font-bold'>{prod?.name}</h1>
                  <span className='text-gray-500 text-sm'>Size: <span className='text-black font-bold'>{prod?.size}</span></span>
                  <span className='text-gray-500 text-sm'>Color: <span className='text-black font-bold'>{prod?.color}</span></span>
                </div>
              </div>
              <div className='text-sm text-right'>
                <span className='font-bold'>${prod?.price}</span> x {prod?.quantity} = 
                <span className='font-bold ml-1'>${prod?.price * prod?.quantity}</span>
              </div>
            </div>
          ))}

          <div className='flex justify-between'>
            <span className='text-gray-500'>Subtotal</span>
            <span className='font-bold'>${total}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Shipping</span>
            <span className='font-bold'>$10</span>
          </div>
          <div className='flex justify-between border-t pt-2'>
            <span className='text-gray-500'>Total</span>
            <span className='font-bold'>${total + 10}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
