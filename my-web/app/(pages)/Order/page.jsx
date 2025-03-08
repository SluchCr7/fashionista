'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/app/Context/Cart'
import { UserContext } from '@/app/Context/UserContext';
import Intro from '../../Components/Intro'
import Image from 'next/image'

const Order = () => {
  const [myOrders, setMyOrders] = useState([])
  const { orders } = useContext(CartContext)
  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user) {
      const filteredOrders = orders.filter(order => order?.user?._id === user?._id)
      setMyOrders(filteredOrders)
    }
  }, [orders, user])
  // Helper function to determine order status
  const getOrderStatus = (orderDate) => {
    const orderTime = new Date(orderDate);
    const currentTime = new Date();
    const diffDays = Math.floor((currentTime - orderTime) / (1000 * 60 * 60 * 24));
    return diffDays >= 3 ? "Delivered" : "Pending";
  }

  return (
    <div className='flex items-center mx-auto flex-col w-full py-24 gap-4 px-5 max-w-[1200px]'>
      <Intro title="Order Details" para="Orders you have submitted and their current status" />

      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        myOrders.map((order, index) => {
          const orderStatus = getOrderStatus(order.createdAt);
          if (orderStatus === "Delivered") return null; // Hide delivered orders
          return (
            <div key={index} className='w-full bg-gray-100 p-6 rounded-lg shadow-md'>
              <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='text-gray-900 font-medium'>Order ID: <span className='font-bold text-gray-900'>#{order._id}</span></span>
                  <span className='text-sm text-gray-700'>{new Date(order.createdAt).toDateString()}</span>
                </div>
                <div className='flex items-center'>
                  <span className={`text-sm text-DarkRed px-3 py-1 rounded ${orderStatus === "Pending" ? "bg-yellow-500" : "bg-green-700"}`}>
                    {orderStatus}
                  </span>
                </div>
              </div>

              <div className='flex items-center flex-wrap gap-6 mt-5'>
                <div className='flex flex-col'>
                  <span className='text-gray-700 font-medium'>Address:</span>
                  <span className='text-black font-bold'>{order.address}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-gray-700 font-medium'>Phone:</span>
                  <span className='text-black font-bold'>{order.phoneNumber}</span>
                </div>
              </div>

              <table className="w-full mt-5 text-gray-700 border border-gray-200 shadow-sm rounded-lg">
                <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <tr>
                    {["Product", "Name", "Price", "Quantity", "Total"].map((heading, idx) => (
                      <th key={idx} className="py-3 px-4 text-center">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order.Products.map((product, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                      <td className="p-4 flex justify-center">
                        <Image src={product.Photo[0].url} alt="img_order" width={40} height={40} className="w-16 h-16 rounded-md shadow-md" />
                      </td>
                      <td className="p-4 text-center font-bold text-gray-900">{product.name}</td>
                      <td className="p-4 text-center font-bold text-green-600">${product.price}</td>
                      <td className="p-4 text-center">{product.quantity}</td>
                      <td className="p-4 text-center font-bold">${product.price * product.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  )
}

export default Order;
