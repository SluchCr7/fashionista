'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { ArrowRight, Lock, ShieldCheck, ShoppingBag, CheckCircle, Truck, X } from 'lucide-react';
import { CartContext } from '@/app/Context/CartContext';
import { OrderContext } from '@/app/Context/OrderContext';
import { AuthContext } from '@/app/Context/AuthContext';
import { easeOut, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, cartTotal, clearCart, loading: cartLoading, appliedCoupon, applyCoupon, removeCoupon, isApplyingCoupon, discount } = useContext(CartContext);
    const { placeOrder, loading: orderLoading } = useContext(OrderContext);
    const { isAuthenticated } = useContext(AuthContext);

    const isLoading = cartLoading || orderLoading;

    const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", city: "", country: "", zip: "" });
    const [couponCode, setCouponCode] = useState("");

    const shippingFee = cartTotal > 500 ? 0 : 25;
    const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    const grandTotal = Math.max(0, cartTotal + shippingFee - discountAmount);

    const handleApplyCoupon = async () => { if (couponCode) { if (await applyCoupon(couponCode)) setCouponCode(""); } };
    const handleInputChange = (e) => setFormData(p => ({ ...p, [e.target.id]: e.target.value }));

    const handleCheckOut = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error("Please log in to your account to finalize the purchase.");
            router.push('/Login');
            return;
        }

        const emptyFields = Object.keys(formData).filter(key => !formData[key]);
        if (emptyFields.length > 0) return toast.warning(`Please provide your ${emptyFields[0]} to proceed.`);

        const orderData = {
            items: cartItems.map(item => ({
                product: item.product._id,
                name: item.product.name,
                price: item.product.price - (item.product.price * discount) / 100,
                quantity: item.quantity,
                size: item.size,
                color: item.color,
                image: item.product.Photo?.[0]?.url || item.product.Photo?.url || ''
            })),
            shippingDetails: {
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phone,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                zip: formData.zip
            },
            subtotal: cartTotal, shippingFee, discountAmount, total: grandTotal, paymentMethod: 'COD',
            coupon: appliedCoupon ? { code: appliedCoupon.code, discountValue: appliedCoupon.discountValue, discountType: appliedCoupon.discountType } : null
        };

        if (await placeOrder(orderData)) { await clearCart(); router.push('/Order'); }
    };

    if (cartItems.length === 0 && !isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white flex flex-col items-center justify-center p-6 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-8 opacity-20" strokeWidth={1} />
                    <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter mb-4 uppercase">Bag is <span className="italic text-black/40 dark:text-white/40">Empty.</span></h1>
                    <button onClick={() => router.push('/Shop')} className="mt-8 border-b-2 border-black dark:border-white pb-1 text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">
                        Return to Atelier
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500 pt-24 md:pt-32 pb-24 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24">
                
                {/* LEFT: CHECKOUT FORM */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} className="flex-1 max-w-3xl">
                    <header className="mb-16">
                        <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mb-6">
                            <ShieldCheck size={14} /> Secure Encrypted Checkout
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter uppercase leading-none">
                            Finalize <br/> <span className="italic text-black/40 dark:text-white/40">Order.</span>
                        </h1>
                    </header>

                    <form onSubmit={handleCheckOut} className="space-y-16">
                        
                        {/* 01. Contact */}
                        <section>
                            <div className="flex items-baseline gap-4 mb-8 border-b border-black/10 dark:border-white/10 pb-4">
                                <span className="text-sm font-serif italic text-black/40 dark:text-white/40">01</span>
                                <h2 className="text-lg font-bold tracking-widest uppercase">Contact Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                                <InputField id="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} />
                                <InputField id="phone" label="Phone Number" type="tel" value={formData.phone} onChange={handleInputChange} />
                            </div>
                        </section>

                        {/* 02. Shipping */}
                        <section>
                            <div className="flex items-baseline gap-4 mb-8 border-b border-black/10 dark:border-white/10 pb-4">
                                <span className="text-sm font-serif italic text-black/40 dark:text-white/40">02</span>
                                <h2 className="text-lg font-bold tracking-widest uppercase">Shipping Destination</h2>
                            </div>
                            <div className="space-y-8 lg:space-y-12">
                                <InputField id="name" label="Full Name" type="text" value={formData.name} onChange={handleInputChange} />
                                <InputField id="address" label="Street Address" type="text" value={formData.address} onChange={handleInputChange} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                                    <InputField id="city" label="City" type="text" value={formData.city} onChange={handleInputChange} />
                                    <InputField id="zip" label="Postal Code" type="text" value={formData.zip} onChange={handleInputChange} />
                                    <InputField id="country" label="Country" type="text" value={formData.country} onChange={handleInputChange} />
                                </div>
                            </div>
                        </section>

                        {/* 03. Payment */}
                        <section>
                            <div className="flex items-baseline gap-4 mb-8 border-b border-black/10 dark:border-white/10 pb-4">
                                <span className="text-sm font-serif italic text-black/40 dark:text-white/40">03</span>
                                <h2 className="text-lg font-bold tracking-widest uppercase">Payment Method</h2>
                            </div>
                            <div className="p-8 border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-white transition-colors cursor-pointer flex items-center justify-between group">
                                <div className="flex items-center gap-6">
                                    <div className="text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors"><Truck strokeWidth={1.5} size={32} /></div>
                                    <div>
                                        <h3 className="font-serif font-bold text-xl tracking-tight mb-1">Cash on Delivery</h3>
                                        <p className="text-xs tracking-widest font-bold uppercase text-black/40 dark:text-white/40">Pay upon arrival</p>
                                    </div>
                                </div>
                                <div className="w-6 h-6 rounded-full border border-black dark:border-white flex items-center justify-center">
                                    <div className="w-3 h-3 bg-black dark:bg-white rounded-full" />
                                </div>
                            </div>
                        </section>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full py-8 bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-[0.3em] hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-4 group"
                        >
                            {isLoading ? "Processing..." : <>Confirm Purchase <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" /></>}
                        </button>
                    </form>
                </motion.div>

                {/* RIGHT: ORDER SUMMARY EXPERIMENTAL */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }} className="lg:w-[500px] shrink-0">
                    <div className="sticky top-32 bg-black/5 dark:bg-white/5 p-8 md:p-12">
                        <h2 className="text-2xl font-serif font-black uppercase tracking-widest mb-10 text-center">Summary</h2>
                        
                        <div className="space-y-6 mb-12 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                            {cartItems.map(item => (
                                <div key={`${item.product._id}-${item.size}-${item.color}`} className="flex gap-6 group">
                                    <div className="relative w-24 h-32 bg-black/10 dark:bg-white/10 overflow-hidden shrink-0">
                                        <Image src={item.product.Photo?.[0]?.url || item.product.Photo?.url || '/logo.png'} alt={item.product.name} fill className="object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="font-serif font-bold text-lg leading-tight mb-2 tracking-tight">{item.product.name}</h3>
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/50 dark:text-white/50 mb-4">
                                            {item.size || 'M'} / {item.color || 'ST'} / Qty: {item.quantity}
                                        </p>
                                        <p className="font-bold">${((item.product.price - (item.product.price * discount) / 100) * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-8 border-t border-black/10 dark:border-white/10 font-medium text-sm tracking-wide">
                            <div className="flex justify-between"><span className="text-black/60 dark:text-white/60">Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span className="text-black/60 dark:text-white/60">Shipping</span><span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}</span></div>
                            {appliedCoupon && (
                                <div className="flex justify-between text-black dark:text-white font-bold">
                                    <span className="flex items-center gap-2">Promo Style <button onClick={removeCoupon}><X size={12} className="opacity-50 hover:opacity-100"/></button></span>
                                    <span>-${discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-end pt-8 mt-8 border-t border-black/10 dark:border-white/10">
                                <span className="font-serif italic text-black/50 dark:text-white/50">Total</span>
                                <span className="text-4xl font-serif font-black tracking-tighter">${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {!appliedCoupon && (
                            <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10 flex gap-4">
                                <input type="text" placeholder="Promo Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 bg-transparent border-b border-black/20 dark:border-white/20 pb-2 text-sm uppercase tracking-widest font-bold focus:outline-none focus:border-black dark:focus:border-white placeholder:text-black/30 dark:placeholder:text-white/30" />
                                <button onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="text-[10px] font-black tracking-[0.2em] uppercase border-b border-black dark:border-white pb-2 hover:opacity-50 transition-opacity">Apply</button>
                            </div>
                        )}

                        <div className="mt-12 pt-6 flex gap-4 opacity-50 text-[10px] font-bold tracking-[0.1em] uppercase leading-relaxed text-center">
                            <Lock size={14} className="shrink-0 mx-auto" />
                            <p>Information is encrypted securely and handled according to our uncompromising privacy standards.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const InputField = ({ id, label, type, value, onChange }) => (
    <div className="relative group">
        <input
            id={id} type={type} value={value} onChange={onChange} autoComplete="off" required
            className="peer w-full bg-transparent border-b border-black/20 dark:border-white/20 py-3 text-lg focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent text-black dark:text-white font-medium"
            placeholder={label}
        />
        <label htmlFor={id} className="absolute left-0 top-3 text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-black dark:peer-focus:text-white peer-valid:-top-4 peer-valid:text-[10px] transition-all duration-300 pointer-events-none">
            {label}
        </label>
    </div>
);
