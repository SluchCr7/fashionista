'use client'

import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/app/Context/Cart'
import { UserContext } from '@/app/Context/UserContext';
import Image from 'next/image'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Truck, CheckCircle2, Clock, ChevronDown, ChevronUp, MapPin, Phone, Hash, ShoppingBag } from 'lucide-react'

const OrderPage = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.token) return;
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/order`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setMyOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const statusConfig = {
    'Pending': { icon: <Clock size={16} />, color: 'bg-amber-500', step: 1 },
    'Processing': { icon: <Package size={16} />, color: 'bg-blue-500', step: 2 },
    'Shipped': { icon: <Truck size={16} />, color: 'bg-indigo-500', step: 3 },
    'Delivered': { icon: <CheckCircle2 size={16} />, color: 'bg-success', step: 4 },
    'Cancelled': { icon: <Package size={16} />, color: 'bg-destructive', step: 0 }
  };

  if (loading) return <OrdersSkeleton />;

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Your Orders</h1>
          <p className="text-muted-foreground text-lg">Manage and track your recent purchases</p>
        </header>

        {myOrders.length === 0 ? (
          <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
            <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
            <h2 className="text-2xl font-serif font-bold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-8 text-sm">You haven&apos;t placed any orders yet.</p>
            <button
              onClick={() => window.location.href = '/Shop'}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all text-sm"
            >
              Explore Our Collection
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {myOrders.map((order) => (
              <div
                key={order._id}
                className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                {/* Order Summary Header */}
                <div
                  className="p-6 md:p-8 cursor-pointer group"
                  onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-inner">
                        <Package size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-2 py-0.5 bg-muted rounded">#{order._id.slice(-6)}</span>
                          <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded text-white ${statusConfig[order.status]?.color}`}>
                            {statusConfig[order.status]?.icon} {order.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-serif">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                        <p className="text-sm text-muted-foreground">{order.items.length} items • Total: <span className="text-primary font-bold">${order.total.toFixed(2)}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="hidden md:block text-right">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</p>
                        <StatusStepper currentStep={statusConfig[order.status]?.step} isCancelled={order.status === 'Cancelled'} />
                      </div>
                      <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {expandedOrder === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedOrder === order._id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border bg-secondary/10"
                    >
                      <div className="p-6 md:p-10 space-y-10">
                        {/* Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 p-4 bg-background rounded-2xl border border-border/50">
                              <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-border flex-shrink-0">
                                <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover" />
                              </div>
                              <div className="flex-1 flex flex-col justify-center">
                                <h4 className="font-bold text-sm leading-tight mb-1">{item.name}</h4>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Size: {item.size} • Qty: {item.quantity}</p>
                                <p className="font-bold text-sm mt-2">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Details Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-border/30">
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                              <MapPin size={12} /> Shipping Address
                            </h5>
                            <div className="text-sm leading-relaxed">
                              <p className="font-bold mb-1">{order.shippingDetails.name}</p>
                              <p className="text-muted-foreground">{order.shippingDetails.address}</p>
                              <p className="text-muted-foreground">{order.shippingDetails.city}, {order.shippingDetails.zip}</p>
                              <p className="text-muted-foreground">{order.shippingDetails.country}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                              <Phone size={12} /> Contact Details
                            </h5>
                            <div className="text-sm">
                              <p className="mb-1">{order.shippingDetails.email}</p>
                              <p className="text-muted-foreground">{order.shippingDetails.phoneNumber}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                              <Hash size={12} /> Payment Summary
                            </h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium">${order.shippingFee.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-border/30 font-bold text-primary">
                                <span>Total Amount</span>
                                <span>${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const StatusStepper = ({ currentStep, isCancelled }) => {
  if (isCancelled) return <span className="text-[10px] font-bold text-destructive uppercase tracking-widest">Order Cancelled</span>;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={`h-1.5 w-6 rounded-full transition-colors ${step <= currentStep ? 'bg-primary' : 'bg-muted'}`}
        />
      ))}
    </div>
  );
};

const OrdersSkeleton = () => (
  <div className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-6">
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="h-12 w-64 bg-muted animate-pulse rounded-xl" />
      {[1, 2, 3].map(i => (
        <div key={i} className="h-40 w-full bg-muted animate-pulse rounded-3xl" />
      ))}
    </div>
  </div>
);

export default OrderPage;
