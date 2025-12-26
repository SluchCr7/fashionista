'use client'
import { CartContext } from '@/app/Context/Cart'
import { UserContext } from '@/app/Context/UserContext'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { MdDelete, MdLogout, MdLocalShipping, MdCheckCircle, MdCancel, MdTimer } from "react-icons/md"
import { FaUserShield, FaBoxOpen } from "react-icons/fa"
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const Profile = () => {
  const [myOrders, setMyOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { deleteOrder } = useContext(CartContext)
  const { user, Logout } = useContext(UserContext)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?._id && user?.token) {
        setLoading(true)
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/${user._id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setMyOrders(res.data?.orders || []);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false)
        }
      } else {
        if (user === null) setLoading(false);
      }
    }
    fetchUserData();
  }, [user])

  // Helper counts
  const deliveredCount = useMemo(() => myOrders.filter(o => o.status === "Delivered").length, [myOrders])
  const pendingCount = useMemo(() => myOrders.filter(o => o.status === "Pending").length, [myOrders])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <MdCheckCircle className="text-green-500" />;
      case 'Canceled': return <MdCancel className="text-red-500" />;
      default: return <MdTimer className="text-yellow-500" />;
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 py-20 px-4 md:px-12 w-full">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 w-full">

        {/* LEFT COLUMN: Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-shrink-0 lg:w-96"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24 border border-gray-100">
            <div className="h-32 bg-gray-900 relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>

            <div className="px-8 pb-8 -mt-16 relative text-center">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto bg-gray-200 relative overflow-hidden">
                <Image
                  alt="profile"
                  src={user?.profilePhoto?.url || "/default-avatar.png"}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-2xl font-black text-gray-900 mt-4 tracking-tight">{user?.name}</h2>
              <p className="text-gray-500 font-medium text-sm">{user?.email}</p>

              {user?.isAdmin && (
                <span className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-3">
                  <FaUserShield /> Admin Access
                </span>
              )}

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <span className="block text-3xl font-black text-gray-900">{myOrders.length}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Orders</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-black text-gray-900">{deliveredCount}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Delivered</span>
                </div>
              </div>

              <button
                onClick={Logout}
                className="w-full mt-8 py-4 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all flex items-center justify-center gap-2"
              >
                <MdLogout /> Sign Out
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Orders */}
        <div className="flex-1">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl lg:text-5xl font-black tracking-tight mb-2">Order History.</h1>
            <p className="text-gray-500">Track your past purchases and status updates.</p>
          </motion.div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />)}
            </div>
          ) : myOrders.length > 0 ? (
            <div className="space-y-6">
              <AnimatePresence>
                {myOrders.map((order, index) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-50 rounded-xl">
                          <FaBoxOpen className="text-2xl text-gray-400" />
                        </div>

                        <div>
                          <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                            Order #{order._id.slice(-6).toUpperCase()}
                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border ${order.status === 'Delivered' ? 'border-green-200 text-green-700 bg-green-50' : 'border-yellow-200 text-yellow-700 bg-yellow-50'}`}>
                              {order.status || 'Pending'}
                            </span>
                          </h3>
                          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <span className="text-gray-400">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">
                            <span className="text-gray-400">Address:</span> {order.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                        <div className="text-left md:text-right">
                          <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Total</p>
                          <p className="text-2xl font-black text-gray-900">${order.total}</p>
                        </div>

                        <button
                          onClick={() => confirm("Delete this record?") && deleteOrder(order._id)}
                          className="p-3 rounded-full text-gray-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Record"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </div>

                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gray-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-in-out"></div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MdLocalShipping className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
              <p className="text-gray-500 mt-2">Start shopping to see your orders here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
