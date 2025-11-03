'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/app/Context/Cart'
import { UserContext } from '@/app/Context/UserContext';
import Intro from '../../Components/Intro'
import Image from 'next/image'
import axios from 'axios'

const Order = () => {
  const [myOrders, setMyOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const { orders } = useContext(CartContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id && user?.token) {
        setLoadingOrders(true)
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${user._id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          setMyOrders(res.data?.orders || [])
        } catch (err) {
          console.log(err)
        } finally {
          setLoadingOrders(false)
        }
      }
    }
    fetchUserData()
  }, [user?._id, user?.token])

  // Helper function to determine order status
  const getOrderStatus = (orderDate) => {
    const orderTime = new Date(orderDate)
    const currentTime = new Date()
    const diffDays = Math.floor((currentTime - orderTime) / (1000 * 60 * 60 * 24))
    return diffDays >= 3 ? 'Delivered' : 'Pending'
  }

  // Skeleton UI while loading
  const OrdersSkeleton = () => (
    <div className="flex flex-col gap-6 w-full">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="animate-pulse bg-gray-100 rounded-xl shadow-md p-6 space-y-5 border border-gray-200"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-300 rounded-lg" />
              <div className="h-3 w-32 bg-gray-300 rounded-lg" />
            </div>
            <div className="h-6 w-20 bg-gray-300 rounded-lg" />
          </div>

          {/* Address & Phone */}
          <div className="flex flex-wrap gap-10 mt-4">
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-300 rounded-lg" />
              <div className="h-4 w-40 bg-gray-300 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-20 bg-gray-300 rounded-lg" />
              <div className="h-4 w-32 bg-gray-300 rounded-lg" />
            </div>
          </div>

          {/* Table skeleton */}
          <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
            {[1, 2, 3].map((r) => (
              <div key={r} className="flex items-center justify-between gap-3">
                <div className="h-14 w-14 bg-gray-300 rounded-lg" />
                <div className="h-3 w-32 bg-gray-300 rounded-lg" />
                <div className="h-3 w-20 bg-gray-300 rounded-lg" />
                <div className="h-3 w-10 bg-gray-300 rounded-lg" />
                <div className="h-3 w-16 bg-gray-300 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className='flex items-center mx-auto flex-col w-full py-24 gap-4 px-5 max-w-[1200px]'>
      <Intro title="Order Details" para="Orders you have submitted and their current status" />

      {loadingOrders ? (
        <OrdersSkeleton />
      ) : myOrders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        myOrders.map((order, index) => {
          const orderStatus = getOrderStatus(order.createdAt)
          if (orderStatus === 'Delivered') return null // Hide delivered orders
          return (
            <div key={index} className='w-full bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200'>
              <div className='w-full flex items-center justify-between'>
                <div className='flex flex-col gap-2'>
                  <span className='text-gray-900 font-medium'>
                    Order ID: <span className='font-bold text-gray-900'>#{order._id}</span>
                  </span>
                  <span className='text-sm text-gray-700'>{new Date(order.createdAt).toDateString()}</span>
                </div>
                <div className='flex items-center'>
                  <span
                    className={`text-sm text-white px-3 py-1 rounded-lg font-semibold ${
                      orderStatus === 'Pending' ? 'bg-yellow-500' : 'bg-green-600'
                    }`}
                  >
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

              <table className="w-full mt-5 text-gray-700 border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-600 text-sm uppercase">
                  <tr>
                    {['Product', 'Name', 'Price', 'Quantity', 'Total'].map((heading, idx) => (
                      <th key={idx} className="py-3 px-4 text-center">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order.Products.map((product, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                      <td className="p-4 flex justify-center">
                        <Image
                          src={product.Photo[0].url}
                          alt="img_order"
                          width={40}
                          height={40}
                          className="w-16 h-16 rounded-md shadow-md object-cover"
                        />
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
          )
        })
      )}
    </div>
  )
}

export default Order
