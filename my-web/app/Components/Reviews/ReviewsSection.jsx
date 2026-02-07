"use client";
import React, { useContext, useEffect, useState } from "react";
import { ReviewContext } from "@/app/Context/ReviewContext";
import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

const ReviewsSection = ({ product }) => {
    const { reviews, loading, pagination, getProductReviews } = useContext(ReviewContext);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (product?._id) {
            getProductReviews(product._id);
        }
    }, [product?._id, getProductReviews]);

    const handlePageChange = (newPage) => {
        getProductReviews(product._id, newPage);
        // Scroll to section top
        const element = document.getElementById("reviews-header");
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div id="reviews-header" className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border pb-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">Customer Feedback</h2>
                    <p className="text-muted-foreground text-sm font-medium">
                        Hear what our global community has to say about the {product.name}.
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="h-12 px-8 bg-foreground text-background rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                    {showForm ? "Close Form" : "Write a Review"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Summary & Form */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="sticky top-24 space-y-8">
                        <RatingSummary
                            averageRating={product.averageRating || 0}
                            totalReviews={product.reviewsCount || 0}
                            ratingBreakdown={product.ratingBreakdown || {}}
                        />

                        <AnimatePresence mode="wait">
                            {showForm && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    <ReviewForm productId={product._id} onFinish={() => setShowForm(false)} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right: Reviews List */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Controls */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                            <MessageSquare size={16} className="text-primary" />
                            <span>Reviews ({pagination.totalReviews})</span>
                        </div>
                        {/* Filter Toggle could go here */}
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-40 bg-secondary/20 animate-pulse rounded-2xl" />
                            ))}
                        </div>
                    ) : reviews.length > 0 ? (
                        <>
                            <div className="grid gap-6">
                                <AnimatePresence mode="popLayout">
                                    {reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination */}
                            {pagination.pages > 1 && (
                                <div className="flex items-center justify-center gap-4 pt-8">
                                    <button
                                        disabled={pagination.page === 1}
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        className="p-3 rounded-full border border-border hover:bg-secondary disabled:opacity-30 transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <span className="text-sm font-bold">
                                        Page {pagination.page} of {pagination.pages}
                                    </span>
                                    <button
                                        disabled={pagination.page === pagination.pages}
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        className="p-3 rounded-full border border-border hover:bg-secondary disabled:opacity-30 transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-20 text-center border border-dashed border-border rounded-3xl">
                            <MessageSquare className="mx-auto text-muted-foreground/30 mb-4" size={48} />
                            <h3 className="text-xl font-bold mb-2">No reviews yet</h3>
                            <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-8">
                                Be the first to share your experience with this product!
                            </p>
                            {!showForm && (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="px-8 py-3 bg-secondary text-secondary-foreground rounded-full text-xs font-bold uppercase tracking-widest hover:bg-secondary/80 transition-all"
                                >
                                    Write First Review
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewsSection;
