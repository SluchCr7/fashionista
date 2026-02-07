'use client';
import React, { useContext, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, PackageX } from 'lucide-react';
import { UserContext } from '../../Context/UserContext';
import { ProductContext } from '../../Context/ProductContext';
import ProductCard from '../../Components/ProductCard';

const WishlistPage = () => {
    const { user, isAuthenticated, loading } = useContext(UserContext);
    const { products } = useContext(ProductContext);

    const wishlistProducts = useMemo(() => {
        if (!user || !user.favorites || user.favorites.length === 0) return [];
        return products.filter((product) => user.favorites.includes(product._id));
    }, [user, products]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-[70vh] flex flex-col justify-center items-center gap-6 px-4 text-center">
                <Heart className="w-20 h-20 text-muted-foreground/20" />
                <h1 className="text-3xl font-serif font-bold">Please Login</h1>
                <p className="text-muted-foreground max-w-md">
                    You need to be logged in to view your wishlist. Save your favorite items and track their availability.
                </p>
                <Link
                    href="/Login"
                    className="px-8 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest rounded-full hover:bg-primary/90 transition-all"
                >
                    Login / Register
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Your Wishlist</h1>
                <p className="text-muted-foreground">
                    {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
                </p>
            </div>

            {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {wishlistProducts.map((product, idx) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center py-24 gap-6 text-center bg-secondary/10 rounded-lg border border-dashed border-border">
                    <PackageX className="w-16 h-16 text-muted-foreground/30" />
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold font-serif">Your wishlist is empty</h2>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            Start browsing our collections and save the items you love!
                        </p>
                    </div>
                    <Link
                        href="/Shop"
                        className="mt-4 px-8 py-3 bg-foreground text-background font-bold uppercase tracking-widest rounded-full hover:bg-black/80 transition-all"
                    >
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
