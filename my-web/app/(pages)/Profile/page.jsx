'use client'
import { CartContext } from '@/app/Context/Cart'
import { UserContext } from '@/app/Context/UserContext'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { MdDelete } from "react-icons/md"
import { FiMail } from "react-icons/fi"
import { FaUserShield } from "react-icons/fa"

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
    <div className="flex flex-col md:flex-row gap-6 px-6 py-8 min-h-screen w-full bg-gray-50">
      
      {/* Profile Card */}
      <div className="w-full md:w-[35%] flex justify-center">
        <div className="shadow-lg bg-white w-full max-w-md p-6 rounded-2xl flex flex-col gap-5 relative overflow-hidden">
          
          {/* Header gradient */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl"></div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center relative mt-10">
            <Image 
              alt="profile_image" 
              src={user?.profilePhoto?.url || "/default-avatar.png"} 
              width={90} height={90} 
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" 
            />
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-lg font-bold text-gray-800">{user?.name}</span>
                {user?.isAdmin && (
                  <span className="bg-yellow-400 text-xs px-2 py-1 rounded-md font-medium flex items-center gap-1">
                    <FaUserShield /> Admin
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
                <FiMail /> {user?.email}
              </div>
            </div>
          </div>

          <button 
            onClick={Logout} 
            className="bg-red-600 text-white w-full py-3 rounded-md font-semibold hover:bg-red-700 transition mt-4"
          >
            Logout
          </button>
        </div> 
      </div>

      {/* Orders Section */}
      <div className="w-full md:w-[65%] flex flex-col gap-5">
        <span className="font-bold text-black text-2xl">My Orders</span>

        <div className="overflow-x-auto">
          <table className="w-full text-gray-700 border border-gray-200 shadow-md rounded-lg overflow-hidden">
            
            {/* Table Header */}
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
              <tr>
                {["Num", "Date", "Address", "Phone", "Items", "Total", "Status", "Delete"].map((heading, index) => (
                  <th key={index} className="py-3 px-4 text-center">{heading}</th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {myOrders.length > 0 ? (
                myOrders.map((order, index) => (
                  <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50 transition-all">
                    <td className="p-4 text-center">#{index + 1}</td>
                    <td className="p-4 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-center">{order.address}</td>
                    <td className="p-4 text-center">{order.phoneNumber}</td>
                    <td className="p-4 text-center">{order.Products.length}</td>
                    <td className="p-4 text-center font-bold text-green-600">${order.total}</td>
                    {/* Status */}
                    <td className="p-4 text-center">
                      <span className={`
                        px-2 py-1 rounded-md text-xs font-semibold
                        ${order.status === "Pending" && "bg-yellow-100 text-yellow-700"}
                        ${order.status === "Shipped" && "bg-blue-100 text-blue-700"}
                        ${order.status === "Delivered" && "bg-green-100 text-green-700"}
                        ${order.status === "Canceled" && "bg-red-100 text-red-700"}
                      `}>
                        {order.status || "Pending"}
                      </span>
                    </td>
                    {/* Delete */}
                    <td 
                      onClick={() => confirm("Are you sure you want to delete this order?") && deleteOrder(order._id)} 
                      className="p-4 cursor-pointer text-center text-red-600 hover:text-red-800 transition"
                    >
                      <MdDelete size={20} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>  
        </div>
      </div>
    </div>
  )
}

export default Profile
