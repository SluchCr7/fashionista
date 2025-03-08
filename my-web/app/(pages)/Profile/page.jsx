'use client'
import { CartContext } from '@/app/Context/Cart'
import { UserContext } from '@/app/Context/UserContext';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { MdDelete } from "react-icons/md";

const Profile = () => {
  const [myOrders, setMyOrders] = useState([])
  const { orders, deleteOrder } = useContext(CartContext)
  const { user, Logout } = useContext(UserContext)
  useEffect(() => {
    if (user) {
      const filteredOrders = orders.filter(order => order?.user?._id === user?._id)
      setMyOrders(filteredOrders)
    }
  }, [orders, user])
  return (
    <div className='flex flex-col md:flex-row gap-6 px-6 py-20 min-h-screen w-full'>
      
      {/* Profile Card */}
      <div className='w-full md:w-[40%] flex justify-center'>
        <div className='shadow-lg bg-white w-full max-w-md p-6 rounded-lg flex flex-col gap-5'>
          <div className='flex flex-col md:flex-row gap-4 items-center'>
            <Image 
              alt='profile_image' 
              src={user?.profilePhoto?.url} 
              width={80} height={80} 
              className='w-16 h-16 rounded-full object-cover' 
            />
            <div className='text-center md:text-left'>
              <div className='flex items-center justify-center md:justify-start gap-2'>
                <span className='text-lg font-semibold text-gray-800'>{user?.name}</span>
                {user?.isAdmin && <span className='bg-yellow-300 text-xs px-2 py-1 rounded-md font-medium'>Admin</span>}
              </div>
              <span className='text-sm text-gray-600'>{user?.email}</span>
            </div>
          </div>
          <button 
            onClick={Logout} 
            className='bg-red-600 text-white w-full py-3 rounded-md font-semibold hover:bg-red-700 transition'
          >
            Logout
          </button>
        </div> 
      </div>

      {/* Orders Section */}
      <div className='w-full md:w-[60%] flex flex-col gap-5'>
        <span className='font-bold text-black text-2xl'>My Orders</span>
        <div className="overflow-x-auto">
          <table className="w-full text-gray-700 border border-gray-200 shadow-md rounded-lg">
            {/* Table Header */}
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                {["Num", "Date", "Address", "Phone", "Items", "Total", "Delete"].map((heading, index) => (
                  <th key={index} className="py-3 px-4 text-center">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                myOrders.length > 0 ? myOrders.map((order, index) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                    {/* Order Index */}
                    <td className="p-4 text-center">#{index + 1}</td>
                    {/* Order Date */}
                    <td className="p-4 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                    {/* Address */}
                    <td className="p-4 text-center">{order.address}</td>
                    {/* Phone Number */}
                    <td className="p-4 text-center">{order.phoneNumber}</td>
                    {/* Number of Items */}
                    <td className="p-4 text-center">{order.Products.length}</td>
                    {/* Total Price */}
                    <td className="p-4 text-center font-bold text-green-600">${order.total}</td>
                    {/* Delete Order */}
                    <td 
                      onClick={() => deleteOrder(order._id)} 
                      className="p-4 cursor-pointer text-center text-red-600 hover:text-red-800 transition"
                    >
                      <MdDelete size={20} />
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>  
        </div>
      </div>
      
    </div>
  )
}

export default Profile
