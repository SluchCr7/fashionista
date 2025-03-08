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
    })
    const [message , setMessage] = useState("")
    const {finalCart , submitOrder} = useContext(CartContext)
    const [ProductsArrOrder , setProductsArrayOrder] = useState([])
    const total = finalCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const handlCheckOut = ()=> {
        if(checkOutData.address != "" && checkOutData.city != "" && checkOutData.country != "" && checkOutData.email != "" && checkOutData.name != "" && checkOutData.phone != "" && checkOutData.zip != ""){
            submitOrder(ProductsArrOrder , checkOutData.address , checkOutData.phone , total)
        }
        else {
            setMessage("You Must fill all Details")
            setTimeout(() => setMessage(""), 3000)
        }
    }
    useEffect(() => {
        const ProductsIds = finalCart.map((prod) => prod.id)
        setProductsArrayOrder(ProductsIds)
    }, [finalCart])
return (
    <>
        <Notify Notify={message}/>
        <div className='flex mx-auto flex-col md:flex-row items-start gap-5 py-20 px-5 justify-center max-w-[1200px]'>
            <div className='flex items-start flex-col gap-4 w-[100%] md:w-[50%]'>
                <span className='font-bold text-xl uppercase text-DarkRed'>Checkout</span>
                <div className='flex items-start flex-col gap-4 w-full'>
                    <span className='text-sm text-gray-900'>Contact Details</span>
                    <div className='flex items-start flex-col gap-1 w-full'>
                        <label htmlFor="email">Email</label>
                        <input id='email' value={checkOutData.email} onChange={(e)=> setCheckOutData({...checkOutData, email: e.target.value})} type="email" className='border border-gray-600 bg-transparent text-black w-[100%]' />
                    </div>
                    <div className='flex items-start flex-col gap-1 w-full'>
                        <label htmlFor="number">Number</label>
                        <input id='number' value={checkOutData.phone} onChange={(e)=> setCheckOutData({...checkOutData, phone: e.target.value})} type="text" className='border border-gray-600 bg-transparent text-black w-[100%]' />
                    </div>
                </div>
                <div className='flex items-start flex-col gap-4 w-full'>
                    <span className='text-sm text-gray-900'>Delivery Details</span>
                    <div className='flex items-start flex-col gap-1 w-full'>
                        <label htmlFor="name">Name</label>
                        <input id='name' value={checkOutData.name} onChange={(e)=> setCheckOutData({...checkOutData, name: e.target.value})} type="text" className='border border-gray-600 bg-transparent text-black w-[100%]' />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-full'>    
                    <div className='flex items-start flex-col gap-1 w-full'>
                        <label htmlFor="address">Address</label>
                        <input id='address' value={checkOutData.address} onChange={(e)=> setCheckOutData({...checkOutData, address: e.target.value})} type="text" className='border border-gray-600 bg-transparent text-black w-[100%]' />
                    </div>
                    <div className='flex items-start flex-col gap-1 w-full'>
                        <label htmlFor="city">City</label>
                        <input id='city' value={checkOutData.city} onChange={(e)=> setCheckOutData({...checkOutData, city: e.target.value})} type="text" className='border border-gray-600 bg-transparent text-black w-[100%]' />
                    </div>
                    <div className='flex items-start flex-col gap-1 w-full'>
                        <label htmlFor="country">Country</label>
                        <input id='country' value={checkOutData.country} onChange={(e)=> setCheckOutData({...checkOutData, country: e.target.value})} type="text" className='border border-gray-600 bg-transparent text-black w-[100%]' />
                    </div>
                    <div className='flex items-start flex-col gap-1 w-full'>
                        <label htmlFor="zip">Zip</label>
                        <input id='zip' value={checkOutData.zip} onChange={(e)=> setCheckOutData({...checkOutData, zip: e.target.value})} type="text" className='border border-gray-600 bg-transparent text-black w-[100%]' />
                    </div>
                    </div>
                </div>
                <span className='text-sm text-gray-900 flex items-center gap-1'><div className='w-3 h-3 rounded-full bg-black'></div>Pay is on delivery</span>
                <button onClick={handlCheckOut} className='bg-black p-4 w-full rounded-md text-white uppercase '>Pay Now</button>
            </div>
            <div className='flex items-start bg-gray-100 p-4 flex-col gap-4 w-[100%] md:w-[50%]'>
                <span className='font-bold text-xl uppercase text-DarkRed'>Order Summary</span>
                {
                    finalCart.map((prod) => {
                        return (
                        <>
                            <div className='border-t-2 border-gray-300 pt-2 flex justify-between items-center w-full gap-3'>
                                <div className='flex items-start flex-row gap-3'>     
                                    <Image 
                                        src={prod?.img} alt='picture product' width={500} height={500}
                                        className='w-[80px] h-[80px] rounded-md' />
                                    <div className='flex items-start flex-col gap-1'>
                                        <h1 className='text-xl font-bold'>{prod?.name}</h1>
                                        <span className='text-gray-500 text-sm'>Size : <span className='text-black font-bold'>{prod?.size}</span></span>
                                        <span className='text-gray-500 text-sm'>Color : <span className='text-black font-bold'>{prod?.color}</span></span>
                                    </div>
                                    </div>
                                    <divc className='flex items-center gap-1 '>
                                    <span className='text-gray-900 font-bold'>${prod?.price}</span>
                                    x <span className='text-gray-900 font-bold'>{prod?.quantity}</span>
                                    = <span className='text-gray-900 font-bold'>${prod?.price * prod?.quantity}</span>
                                    </divc>
                            </div>
                        </>
                        )
                    })
                }
                <div className='flex items-center justify-between w-full'>
                    <span className='text-gray-400'>SubTotal</span>
                    <span className='text-gray-900 font-bold'>${total}</span>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-gray-400'>Shipping</span>
                    <span className='text-gray-900 font-bold'>$10</span>
                </div>
                <div className='flex items-center justify-between border-t-2 pt-2 w-full'>
                    <span className='text-gray-400'>Total</span>
                    <span className='text-gray-900 font-bold'>${total + 10}</span>
                </div>
            </div>
        </div>
    </>
  );
};


export default CheckoutPage