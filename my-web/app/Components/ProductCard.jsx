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

    // Calculate final price
    const price = parseFloat(product.price);
    const finalPrice = discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2);
    const isOutOfStock = product.quantity <= 0;
    const isNew = new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // If product has options, redirect to product page
        if (product.sizes?.length > 0 || product.colors?.length > 0) {
            window.location.href = `/Product/${product._id}`;
            return;
        }

        setIsAdding(true);
        try {
            await addToCart(product, 1);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update your selection.");
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20 rounded-sm mb-4">
                <Link href={`/Product/${product._id}`}>
                    {/* Main Image */}
                    <Image
                        src={product.Photo?.[0]?.url || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className={`object-cover transition-all duration-700 ease-in-out ${isHovered && product.Photo?.[1] ? 'opacity-0' : 'opacity-100 scale-100 group-hover:scale-105'
                            }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Hover Image */}
                    {product.Photo?.[1] && (
                        <Image
                            src={product.Photo[1].url}
                            alt={product.name}
                            fill
                            className={`absolute inset-0 object-cover transition-all duration-700 ease-in-out ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                                }`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none">
                    {isNew && (
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                            New
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="bg-destructive text-destructive-foreground text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                            -{discount}%
                        </span>
                    )}
                    {isOutOfStock && (
                        <span className="bg-gray-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
                            Sold Out
                        </span>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-md rounded-full text-foreground hover:text-destructive transition-all hover:bg-background shadow-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 duration-300 z-10 border border-border/20"
                >
                    <Heart
                        className={`w-4 h-4 ${user?.favorites?.includes(product._id) ? 'fill-destructive text-destructive' : ''}`}
                    />
                </button>

                {/* Quick Action Overlay */}
                <div className="absolute bottom-4 left-0 w-full px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || isOutOfStock}
                        className={`w-full bg-background/90 backdrop-blur-xl text-foreground py-3 text-[10px] font-bold uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 rounded-lg border border-border/40 ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-primary-foreground'}`}
                    >
                        {isAdding ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : isOutOfStock ? (
                            "Sold Out"
                        ) : (
                            <>
                                <ShoppingBag size={14} /> {product.sizes?.length > 0 || product.colors?.length > 0 ? 'Select Options' : 'Quick Add'}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-1">
                <div className="flex justify-between items-start">
                    <Link href={`/Product/${product._id}`} className="group-hover:text-primary transition-colors line-clamp-1 font-medium text-foreground">
                        {product.name}
                    </Link>
                    {showRating && (
                        <div className="flex items-center gap-1 text-xs text-yellow-500">
                            <Star className="w-3 h-3 fill-current" />
                            <span>4.5</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <span className="font-bold text-foreground">${finalPrice}</span>
                    {discount > 0 && (
                        <span className="text-muted-foreground line-through text-xs">${price.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
