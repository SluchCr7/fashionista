'use client';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { CartContext } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';
import { toast, ecommerceToasts } from '@/lib/toast';

const ProductCard = ({ product, showRating = false }) => {
    const { addToCart, discount } = useContext(CartContext);
    const { toggleFavorite, user } = useContext(AuthContext);
    const [isHovered, setIsHovered] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const price = parseFloat(product.price);
    const finalPrice = discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2);
    const isOutOfStock = product.quantity <= 0;
    const isNew = new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.sizes?.length > 0 || product.colors?.length > 0) {
            window.location.href = `/Product/${product._id}`;
            return;
        }
        setIsAdding(true);
        try {
            await addToCart(product, 1);
        } catch (error) {
            toast.error("Process interrupted. Please try again.");
        } finally {
            setIsAdding(false);
        }
    };

    const handleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await toggleFavorite(product._id);
    };

    return (
        <motion.div
            className="group relative w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Visual Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2F2F2] mb-6 shadow-sm">
                <Link href={`/Product/${product._id}`}>
                    <Image
                        src={product.Photo?.[0]?.url || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className={`object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isHovered ? 'scale-110' : 'scale-100'
                        }`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                </Link>

                {/* Status Badges - Top Left */}
                <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                    {isNew && (
                        <span className="typography-display !text-[8px] bg-white px-2 py-1 shadow-sm text-black">
                            New Arrival
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="typography-display !text-[8px] bg-accent px-2 py-1 shadow-sm text-white">
                            -{discount}%
                        </span>
                    )}
                </div>

                {/* Wishlist - Top Right */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 p-2 transition-transform duration-500 z-10 group-hover:scale-110 active:scale-95"
                >
                    <Heart
                        strokeWidth={1.2}
                        className={`w-5 h-5 ${user?.favorites?.includes(product._id) ? 'fill-accent text-accent' : 'text-black'}`}
                    />
                </button>

                {/* Action Bar - Bottom Reveal */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || isOutOfStock}
                        className="w-full bg-black text-white py-4 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-accent transition-colors disabled:opacity-50"
                    >
                        {isAdding ? "Syncing..." : isOutOfStock ? "Unavailable" : "Acquire Piece"}
                    </button>
                </div>
            </div>

            {/* Information Section */}
            <div className="space-y-2 px-1">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <p className="typography-display !text-[7px] !text-muted-foreground">
                            {product.category || 'Exclusive Selection'}
                        </p>
                        <Link href={`/Product/${product._id}`}>
                            <h3 className="text-xl font-serif font-bold text-foreground hover:text-accent transition-colors leading-tight">
                                {product.name}
                            </h3>
                        </Link>
                    </div>
                    <div className="flex flex-col items-end">
                        {discount > 0 && (
                          <span className="text-[10px] text-muted-foreground line-through decoration-accent/50">${price.toFixed(2)}</span>
                        )}
                        <span className="text-sm font-black tracking-tighter text-foreground">${finalPrice}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
