'use client'
import { CartContext } from '@/app/Context/Cart'
import { UserContext } from '@/app/Context/UserContext'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { MdDelete, MdLogout } from "react-icons/md"
import { FaUserShield } from "react-icons/fa"
import { motion, AnimatePresence } from 'framer-motion'

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
  // Helper function to determine order status
  const deliveredCount = useMemo(() => myOrders.filter(o => o.status === "Delivered").length, [myOrders])
  const pendingCount = useMemo(() => myOrders.filter(o => o.status === "Pending").length, [myOrders])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-14 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10"
      >

        {/* 🌈 Profile Section */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="flex-1 lg:max-w-sm bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl border border-gray-100 overflow-hidden"
        >
          {/* Header Gradient */}
          <div className="relative bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 h-36">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          </div>

          {/* Profile Info */}
          <div className="relative -mt-14 px-6 pb-6 text-center">
            <Image
              alt="profile"
              src={user?.profilePhoto?.url || "/default-avatar.png"}
              width={100}
              height={100}
              className="w-28 h-28 rounded-full mx-auto border-4 border-white shadow-md object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-3">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>

            {user?.isAdmin && (
              <span className="inline-flex items-center gap-2 text-yellow-700 bg-yellow-100 mt-2 px-3 py-1 rounded-full text-xs font-semibold">
                <FaUserShield /> Admin
              </span>
            )}

            <button
              onClick={Logout}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 transition"
            >
              <MdLogout className="text-lg" /> Logout
            </button>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white rounded-xl shadow p-4">
                <p className="text-xs text-gray-500">Total Orders</p>
                <p className="text-lg font-bold text-gray-800">{myOrders.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow p-4">
                <p className="text-xs text-gray-500">Delivered</p>
                <p className="text-lg font-bold text-green-600">{deliveredCount}</p>
              </div>
              <div className="bg-white rounded-xl shadow p-4">
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-lg font-bold text-yellow-500">{pendingCount}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 📦 Orders Section */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">My Orders</h2>
            <p className="text-gray-500 text-sm">Track and manage your recent purchases</p>
          </div>

          <AnimatePresence>
            {myOrders.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6"
              >
                {myOrders.map((order, index) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition-all"
                  >
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="font-semibold text-gray-800">Order #{index + 1}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {order.Products.length} items | {order.address}
                      </p>
                    </div>

                    <div className="text-center mt-4 md:mt-0">
                      <p className="text-lg font-bold text-green-600">${order.total}</p>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full mt-1 inline-block
                        ${order.status === "Pending" && "bg-yellow-100 text-yellow-700"}
                        ${order.status === "Shipped" && "bg-blue-100 text-blue-700"}
                        ${order.status === "Delivered" && "bg-green-100 text-green-700"}
                        ${order.status === "Canceled" && "bg-red-100 text-red-700"}
                      `}>
                        {order.status || "Pending"}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        confirm("Are you sure you want to delete this order?") &&
                        deleteOrder(order._id)
                      }
                      className="text-red-600 hover:text-red-800 p-3 rounded-full transition mt-3 md:mt-0"
                      title="Delete Order"
                    >
                      <MdDelete size={22} />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center text-center py-16 text-gray-500"
              >
                <Image src="/empty.svg" width={220} height={220} alt="no orders" />
                <h3 className="mt-4 text-xl font-semibold text-gray-700">No Orders Found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Once you make a purchase, your orders will appear here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile
