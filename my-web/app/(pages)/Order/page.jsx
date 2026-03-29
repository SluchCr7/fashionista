'use client'
import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '@/app/Context/OrderContext'
import { AuthContext } from '@/app/Context/AuthContext';
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function OrderPage() {
    const { orders: myOrders, loading, fetchOrders } = useContext(OrderContext);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => { if (user) fetchOrders(); }, [user, fetchOrders]);

    if (loading) return <OrdersSkeleton />;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pt-32 pb-24 transition-colors duration-500">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                
                <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 dark:border-white/10 pb-12 gap-8">
                    <div>
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/50 dark:text-white/50 mb-6 block">Order History</span>
                        <h1 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tighter leading-none">
                            Archives<span className="text-black/20 dark:text-white/20">.</span>
                        </h1>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Total Records: {myOrders.length}</p>
                    </div>
                </header>

                {myOrders.length === 0 ? (
                    <div className="py-32 text-center max-w-xl mx-auto">
                        <h2 className="text-4xl font-serif font-black mb-6">No Records Found</h2>
                        <p className="text-black/50 dark:text-white/50 text-lg font-light mb-12">Your purchase history is beautifully empty. Begin your collection today.</p>
                        <a href="/Shop" className="border-b-2 border-black dark:border-white pb-1 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
                            Enter Atelier
                        </a>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {myOrders.map(order => (
                            <div key={order._id} className="border-b border-black/20 dark:border-white/20 pb-12">
                                
                                <div 
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer group gap-6"
                                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                >
                                    <div className="flex-[2]">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">Order Nº {order._id.slice(-8)}</p>
                                        <h3 className="text-3xl font-serif font-bold tracking-tight mb-2 group-hover:italic transition-all">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </h3>
                                        <p className="text-sm text-black/60 dark:text-white/60">{order.items.length} Articles</p>
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">Status</p>
                                        <p className="text-lg font-bold tracking-wide uppercase">{order.status}</p>
                                    </div>

                                    <div className="flex-1 text-left md:text-right flex flex-col items-start md:items-end w-full">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">Total</p>
                                        <p className="text-2xl font-serif font-black mb-4">${order.total.toFixed(2)}</p>
                                        <span className="text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-1 group-hover:opacity-50">
                                            {expandedOrder === order._id ? 'Close Details' : 'View Details'}
                                        </span>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedOrder === order._id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-12 mt-12 border-t border-black/10 dark:border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                                                
                                                {/* INVOICE ITEMS */}
                                                <div>
                                                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-8">Acquired Articles</h4>
                                                    <div className="space-y-6">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="flex gap-6 group">
                                                                <div className="relative w-24 h-32 bg-black/5 dark:bg-white/5 overflow-hidden">
                                                                    <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700" />
                                                                </div>
                                                                <div className="flex-1 flex flex-col justify-center">
                                                                    <h5 className="font-serif font-bold text-lg leading-tight mb-2">{item.name}</h5>
                                                                    <p className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50 mb-4">{item.size} / Qty {item.quantity}</p>
                                                                    <p className="font-bold">${item.price.toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* INVOICE DETAILS */}
                                                <div className="bg-black/5 dark:bg-white/5 p-8 md:p-12 space-y-12">
                                                    <div>
                                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-4">Shipping Destination</h4>
                                                        <p className="text-lg leading-relaxed font-light">
                                                            {order.shippingDetails.name}<br/>
                                                            {order.shippingDetails.address}<br/>
                                                            {order.shippingDetails.city}, {order.shippingDetails.zip}<br/>
                                                            {order.shippingDetails.country}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-6">Financial Summary</h4>
                                                        <div className="space-y-3 text-sm font-medium tracking-wide">
                                                            <div className="flex justify-between"><span className="text-black/60 dark:text-white/60">Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                                                            <div className="flex justify-between"><span className="text-black/60 dark:text-white/60">Shipping</span><span>${order.shippingFee.toFixed(2)}</span></div>
                                                            <div className="flex justify-between font-serif font-black text-2xl pt-6 border-t border-black/10 dark:border-white/10 mt-6">
                                                                <span className="italic text-black/50 dark:text-white/50">Total</span><span>${order.total.toFixed(2)}</span>
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
}

const OrdersSkeleton = () => (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-32 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto space-y-16">
            <div className="h-20 w-80 bg-black/5 dark:bg-white/5 animate-pulse" />
            {[1, 2, 3].map(i => <div key={i} className="h-32 w-full bg-black/5 dark:bg-white/5 animate-pulse" />)}
        </div>
    </div>
);
