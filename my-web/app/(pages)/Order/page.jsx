'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchOrders } from '@/lib/redux/slices/orderSlice';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Printer, CheckCircle } from 'lucide-react';

export default function OrderPage() {
    const dispatch = useAppDispatch();
    const { orders: myOrders, loading } = useAppSelector(state => state.order);
    const user = useAppSelector(state => state.auth.user);
    
    // Fix: Add missing expandedOrder state
    const [expandedOrder, setExpandedOrder] = useState(null);

    useEffect(() => { 
        if (user) dispatch(fetchOrders()); 
    }, [user, dispatch]);

    const handlePrintInvoice = (order) => {
        const invoiceWindow = window.open('', '_blank', 'width=800,height=900');
        if (!invoiceWindow) return;

        const itemsHTML = order.items.map(item => `
            <tr style="border-bottom: 1px solid #eaeaea;">
                <td style="padding: 16px 0; font-family: 'Playfair Display', serif; font-size: 14px; font-weight: bold;">
                    ${item.name}
                    <div style="font-size: 10px; color: #888; font-family: 'Inter', sans-serif; letter-spacing: 1px; margin-top: 4px; text-transform: uppercase;">
                        Size: ${item.size || 'M'} | Color: ${item.color || 'Default'}
                    </div>
                </td>
                <td style="padding: 16px 0; text-align: center; font-size: 14px;">${item.quantity}</td>
                <td style="padding: 16px 0; text-align: right; font-size: 14px;">$${item.price.toFixed(2)}</td>
                <td style="padding: 16px 0; text-align: right; font-size: 14px; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('');

        invoiceWindow.document.write(`
            <html>
                <head>
                    <title>Invoice - ${order._id}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
                    <style>
                        body {
                            font-family: 'Inter', sans-serif;
                            color: #000;
                            background: #fff;
                            margin: 0;
                            padding: 40px;
                            line-height: 1.6;
                        }
                        .header {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-start;
                            border-bottom: 2px solid #000;
                            padding-bottom: 30px;
                            margin-bottom: 40px;
                        }
                        .brand {
                            font-family: 'Playfair Display', serif;
                            font-weight: 900;
                            font-size: 32px;
                            text-transform: uppercase;
                            letter-spacing: -1px;
                        }
                        .brand span {
                            font-style: italic;
                            color: #888;
                            font-weight: 300;
                        }
                        .meta-title {
                            font-size: 10px;
                            font-weight: 800;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            color: #888;
                            margin-bottom: 5px;
                        }
                        .meta-value {
                            font-size: 14px;
                            font-weight: 600;
                        }
                        .section-title {
                            font-size: 11px;
                            font-weight: 800;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            color: #888;
                            border-bottom: 1px solid #000;
                            padding-bottom: 10px;
                            margin-bottom: 20px;
                            margin-top: 40px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 30px;
                        }
                        th {
                            font-size: 10px;
                            font-weight: 800;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            color: #888;
                            text-align: left;
                            border-bottom: 1px solid #000;
                            padding-bottom: 10px;
                        }
                        .summary-table td {
                            padding: 8px 0;
                        }
                        .total-row {
                            font-family: 'Playfair Display', serif;
                            font-size: 24px;
                            font-weight: bold;
                            border-top: 1px solid #eaeaea;
                            padding-top: 15px;
                            margin-top: 15px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <div class="brand">Fashionista<span>Atelier</span></div>
                            <div style="font-size: 12px; color: #666; margin-top: 5px;">High Fashion E-commerce Platform</div>
                        </div>
                        <div style="text-align: right;">
                            <div class="meta-title">Official Invoice</div>
                            <div class="meta-value" style="font-size: 18px; font-family: 'Playfair Display', serif;">№ INVC-${order._id.slice(-8).toUpperCase()}</div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; gap: 40px; margin-bottom: 40px;">
                        <div>
                            <div class="meta-title">Billed To</div>
                            <div class="meta-value">${order.shippingDetails.name}</div>
                            <div style="font-size: 13px; color: #555; margin-top: 5px;">
                                ${order.shippingDetails.address}<br>
                                ${order.shippingDetails.city}, ${order.shippingDetails.zip}<br>
                                ${order.shippingDetails.country}<br>
                                Tel: ${order.shippingDetails.phoneNumber}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div class="meta-title">Date of Purchase</div>
                            <div class="meta-value">${new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                            
                            <div class="meta-title" style="margin-top: 20px;">Payment Method</div>
                            <div class="meta-value">${order.paymentMethod === 'Card' ? 'Stripe Secure Card' : 'Cash on Delivery'}</div>
                        </div>
                    </div>

                    <div class="section-title">Acquired Specimen</div>
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 50%;">Article</th>
                                <th style="width: 10%; text-align: center;">Qty</th>
                                <th style="width: 20%; text-align: right;">Rate</th>
                                <th style="width: 20%; text-align: right;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHTML}
                        </tbody>
                    </table>

                    <div style="display: flex; justify-content: flex-end; margin-top: 40px;">
                        <div style="width: 300px;">
                            <table class="summary-table">
                                <tr>
                                    <td style="color: #666;">Subtotal</td>
                                    <td style="text-align: right; font-weight: 600;">$${order.subtotal.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td style="color: #666;">Shipping & Handling</td>
                                    <td style="text-align: right; font-weight: 600;">$${order.shippingFee.toFixed(2)}</td>
                                </tr>
                                ${order.discountAmount > 0 ? `
                                <tr>
                                    <td style="color: #666;">Discount Applied</td>
                                    <td style="text-align: right; font-weight: 600; color: #e11d48;">-$${order.discountAmount.toFixed(2)}</td>
                                </tr>
                                ` : ''}
                                <tr class="total-row">
                                    <td style="font-family: 'Playfair Display', serif; font-style: italic; font-weight: normal;">Grand Total</td>
                                    <td style="text-align: right; font-weight: 900;">$${order.total.toFixed(2)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div style="margin-top: 100px; border-top: 1px solid #eaeaea; padding-top: 20px; text-align: center; font-size: 11px; color: #888; letter-spacing: 1px; text-transform: uppercase;">
                        Thank you for acquiring our creations. Enjoy your purchase.
                    </div>

                    <script>
                        window.onload = function() {
                            window.print();
                        };
                    </script>
                </body>
            </html>
        `);
        invoiceWindow.document.close();
    };

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
                                    className="flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer group gap-6 animate-fadeIn"
                                    onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                >
                                    <div className="flex-[2]">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">Order Nº {order._id.slice(-8).toUpperCase()}</p>
                                        <h3 className="text-3xl font-serif font-bold tracking-tight mb-2 group-hover:italic transition-all">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </h3>
                                        <p className="text-sm text-black/60 dark:text-white/60">{order.items.length} Articles</p>
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">Status</p>
                                        <div className="flex items-center gap-2">
                                            {order.status === 'Delivered' && <CheckCircle size={14} className="text-emerald-500" />}
                                            <p className="text-lg font-bold tracking-wide uppercase">{order.status}</p>
                                        </div>
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
                                            initial={{ height: 0, opacity: 0 }} 
                                            animate={{ height: 'auto', opacity: 1 }} 
                                            exit={{ height: 0, opacity: 0 }}
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
                                                                    <Image src={item.image || '/logo.png'} alt={item.name} fill className="object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-700" />
                                                                </div>
                                                                <div className="flex-1 flex flex-col justify-center">
                                                                    <h5 className="font-serif font-bold text-lg leading-tight mb-2">{item.name}</h5>
                                                                    <p className="text-[10px] font-bold tracking-widest uppercase text-black/50 dark:text-white/50 mb-4">
                                                                        {item.size || 'M'} / {item.color || 'ST'} / Qty {item.quantity}
                                                                    </p>
                                                                    <p className="font-bold">${item.price.toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* INVOICE DETAILS */}
                                                <div className="bg-black/5 dark:bg-white/5 p-8 md:p-12 space-y-12 flex flex-col justify-between">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <div>
                                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-4">Shipping Destination</h4>
                                                            <p className="text-sm leading-relaxed font-semibold">
                                                                {order.shippingDetails.name}<br/>
                                                                {order.shippingDetails.address}<br/>
                                                                {order.shippingDetails.city}, {order.shippingDetails.zip}<br/>
                                                                {order.shippingDetails.country}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-4">Payment Method</h4>
                                                            <p className="text-sm font-semibold">
                                                                {order.paymentMethod === 'Card' ? 'Stripe Secured' : 'Cash on Delivery'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-6">Financial Summary</h4>
                                                        <div className="space-y-3 text-sm font-medium tracking-wide">
                                                            <div className="flex justify-between"><span className="text-black/60 dark:text-white/60">Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                                                            <div className="flex justify-between"><span className="text-black/60 dark:text-white/60">Shipping</span><span>${order.shippingFee.toFixed(2)}</span></div>
                                                            {order.discountAmount > 0 && (
                                                                <div className="flex justify-between text-rose-500"><span className="text-rose-500/80">Discount</span><span>-${order.discountAmount.toFixed(2)}</span></div>
                                                            )}
                                                            <div className="flex justify-between font-serif font-black text-2xl pt-6 border-t border-black/10 dark:border-white/10 mt-6">
                                                                <span className="italic text-black/50 dark:text-white/50">Total</span><span>${order.total.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button 
                                                        onClick={() => handlePrintInvoice(order)}
                                                        className="w-full py-4 border border-black dark:border-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                                                    >
                                                        <Printer size={14} /> Download Luxury Invoice
                                                    </button>
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
