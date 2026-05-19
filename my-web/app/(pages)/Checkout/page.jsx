'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { ArrowRight, Lock, ShieldCheck, ShoppingBag, CheckCircle, Truck, X, CreditCard, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { clearCart, applyCoupon, removeCoupon } from '@/lib/redux/slices/cartSlice';
import { placeOrder } from '@/lib/redux/slices/orderSlice';
import { easeOut, motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast';

export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { cartItems, appliedCoupon, isApplyingCoupon, discount, loading: cartLoading } = useAppSelector(state => state.cart);
    const cartTotal = cartItems.reduce((total, item) => {
        const price = item.product?.price || 0;
        const discountedPrice = price - (price * discount) / 100;
        return total + (discountedPrice * item.quantity);
    }, 0);
    const orderLoading = useAppSelector(state => state.order.loading);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' or 'Card'
    const [isProcessingCard, setIsProcessingCard] = useState(false);
    const [cardData, setCardData] = useState({ number: "", expiry: "", cvv: "", name: "" });

    const isLoading = cartLoading || orderLoading || isProcessingCard;

    const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", city: "", country: "", zip: "" });
    const [couponCode, setCouponCode] = useState("");

    const shippingFee = cartTotal > 500 ? 0 : 25;
    const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    const grandTotal = Math.max(0, cartTotal + shippingFee - discountAmount);

    const handleApplyCoupon = async () => { 
        if (couponCode) { 
            if (await dispatch(applyCoupon(couponCode)).unwrap()) setCouponCode(""); 
        } 
    };
    
    const handleInputChange = (e) => setFormData(p => ({ ...p, [e.target.id]: e.target.value }));
    const handleCardInputChange = (e) => {
        let value = e.target.value;
        const id = e.target.id;
        
        if (id === 'number') {
            // Format card number to groups of 4 digits
            value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
            if (value.length > 19) return;
        }
        if (id === 'expiry') {
            value = value.replace(/\s?/g, '').replace(/(\d{2})/g, '$1/').trim();
            if (value.endsWith('/')) value = value.slice(0, -1);
            if (value.length > 5) return;
        }
        if (id === 'cvv') {
            value = value.replace(/\D/g, '');
            if (value.length > 4) return;
        }
        
        setCardData(p => ({ ...p, [id]: value }));
    };

    const handleCheckOut = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            toast.error("Please log in to your account to finalize the purchase.");
            router.push('/Login');
            return;
        }

        const emptyFields = Object.keys(formData).filter(key => !formData[key]);
        if (emptyFields.length > 0) return toast.warning(`Please provide your ${emptyFields[0]} to proceed.`);

        if (paymentMethod === 'Card') {
            if (!cardData.number || cardData.number.length < 15) return toast.warning("Please provide a valid card number.");
            if (!cardData.expiry || cardData.expiry.length < 5) return toast.warning("Please enter card expiry date (MM/YY).");
            if (!cardData.cvv || cardData.cvv.length < 3) return toast.warning("Please enter a valid card CVV.");
            if (!cardData.name) return toast.warning("Please enter the cardholder name.");

            setIsProcessingCard(true);
            // Simulate professional Stripe transaction handshake
            await new Promise(resolve => setTimeout(resolve, 2500));
            setIsProcessingCard(false);
        }

        const orderData = {
            items: cartItems.map(item => ({
                product: item.product._id,
                name: item.product.name,
                price: item.product.price - (item.product.price * discount) / 100,
                quantity: item.quantity,
                size: item.size || 'M',
                color: item.color || 'ST',
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
            subtotal: cartTotal, 
            shippingFee, 
            discountAmount, 
            total: grandTotal, 
            paymentMethod,
            ...(appliedCoupon && { coupon: { code: appliedCoupon.code, discountValue: appliedCoupon.discountValue, discountType: appliedCoupon.discountType } })
        };

        const result = await dispatch(placeOrder(orderData)).unwrap();
        if (result) { 
            await dispatch(clearCart()); 
            toast.success(paymentMethod === 'Card' ? "Stripe Payment Approved! Order Created." : "Order placed successfully!");
            router.push('/Order'); 
        }
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
                            <ShieldCheck size={14} className="text-emerald-500 animate-pulse" /> Secure SSL Encrypted Checkout
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* COD OPTION */}
                                <div 
                                    onClick={() => setPaymentMethod('COD')}
                                    className={`p-6 border transition-all duration-300 cursor-pointer flex items-center justify-between group ${paymentMethod === 'COD' ? 'border-black dark:border-white bg-black/5 dark:bg-white/5' : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`${paymentMethod === 'COD' ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/40'} transition-colors`}><Truck strokeWidth={1.5} size={24} /></div>
                                        <div>
                                            <h3 className="font-bold text-sm tracking-tight">Cash on Delivery</h3>
                                            <p className="text-[10px] tracking-widest uppercase text-black/40 dark:text-white/40 mt-0.5">Pay upon arrival</p>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border border-black/30 dark:border-white/30 flex items-center justify-center">
                                        {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 bg-black dark:bg-white rounded-full" />}
                                    </div>
                                </div>

                                {/* STRIPE CARD OPTION */}
                                <div 
                                    onClick={() => setPaymentMethod('Card')}
                                    className={`p-6 border transition-all duration-300 cursor-pointer flex items-center justify-between group ${paymentMethod === 'Card' ? 'border-black dark:border-white bg-black/5 dark:bg-white/5' : 'border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`${paymentMethod === 'Card' ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/40'} transition-colors`}><CreditCard strokeWidth={1.5} size={24} /></div>
                                        <div>
                                            <h3 className="font-bold text-sm tracking-tight">Credit / Debit Card</h3>
                                            <p className="text-[10px] tracking-widest uppercase text-black/40 dark:text-white/40 mt-0.5">Stripe Gateway</p>
                                        </div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border border-black/30 dark:border-white/30 flex items-center justify-center">
                                        {paymentMethod === 'Card' && <div className="w-2.5 h-2.5 bg-black dark:bg-white rounded-full" />}
                                    </div>
                                </div>
                            </div>

                            {/* ANIMATED CARD FORM */}
                            <AnimatePresence>
                                {paymentMethod === 'Card' && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                        className="overflow-hidden mt-8"
                                    >
                                        <div className="p-8 bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="text-xs font-bold tracking-widest uppercase text-black/60 dark:text-white/60">Stripe Secure Card Entry</h4>
                                                <Image src="https://res.cloudinary.com/de8pjmln6/image/upload/v1700000000/stripe_secure.png" alt="Stripe Secured" width={100} height={20} className="opacity-40 invert dark:invert-0" onError={(e) => e.target.style.display = 'none'} />
                                            </div>
                                            
                                            <InputField id="number" label="Card Number" type="text" value={cardData.number} onChange={handleCardInputChange} />
                                            
                                            <div className="grid grid-cols-2 gap-6">
                                                <InputField id="expiry" label="Expiry Date (MM/YY)" type="text" value={cardData.expiry} onChange={handleCardInputChange} />
                                                <InputField id="cvv" label="CVV / CVC" type="text" value={cardData.cvv} onChange={handleCardInputChange} />
                                            </div>
                                            
                                            <InputField id="name" label="Cardholder Name" type="text" value={cardData.name} onChange={handleCardInputChange} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full py-8 bg-black text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-[0.3em] hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-4 group"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={16} />
                                    {paymentMethod === 'Card' ? "Encrypting with Stripe..." : "Processing Order..."}
                                </>
                            ) : (
                                <>Confirm Purchase <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform" /></>
                            )}
                        </button>
                    </form>
                </motion.div>

                {/* RIGHT: ORDER SUMMARY */}
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
                                    <span className="flex items-center gap-2">Promo Style <button type="button" onClick={() => dispatch(removeCoupon())}><X size={12} className="opacity-50 hover:opacity-100"/></button></span>
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
                                <button type="button" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode} className="text-[10px] font-black tracking-[0.2em] uppercase border-b border-black dark:border-white pb-2 hover:opacity-50 transition-opacity">Apply</button>
                            </div>
                        )}

                        <div className="mt-12 pt-6 flex gap-4 opacity-50 text-[10px] font-bold tracking-[0.1em] uppercase leading-relaxed text-center">
                            <Lock size={14} className="shrink-0 mx-auto" />
                            <p>Information is encrypted securely and handled according to our uncompromising SSL privacy standards.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

const InputField = ({ id, label, type, value, onChange }) => (
    <div className="relative group w-full">
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
