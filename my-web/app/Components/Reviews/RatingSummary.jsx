"use client";
import React from "react";
import StarRating from "./StarRating";
import { motion } from "framer-motion";

const RatingSummary = ({ averageRating = 0, totalReviews = 0, ratingBreakdown = {} }) => {
    // Ensure we have all keys 1-5
    const breakdown = {
        5: ratingBreakdown?.[5] || 0,
        4: ratingBreakdown?.[4] || 0,
        3: ratingBreakdown?.[3] || 0,
        2: ratingBreakdown?.[2] || 0,
        1: ratingBreakdown?.[1] || 0,
    };

    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 p-6 rounded-2xl bg-secondary/5 border border-border">
            {/* Average Score */}
            <div className="flex flex-col items-center justify-center text-center">
                <h3 className="text-5xl font-serif font-bold mb-2">{averageRating.toFixed(1)}</h3>
                <StarRating rating={averageRating} readonly size={22} className="mb-2" />
                <p className="text-sm text-muted-foreground font-medium">
                    Based on {totalReviews} Reviews
                </p>
            </div>

            {/* Breakdown Bars */}
            <div className="flex-1 w-full space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = breakdown[star];
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                    return (
                        <div key={star} className="flex items-center gap-4 group">
                            <div className="flex items-center gap-1 w-10">
                                <span className="text-sm font-bold">{star}</span>
                                <StarRating rating={1} totalStars={1} readonly size={14} className="text-yellow-400" />
                            </div>

                            <div className="flex-1 h-3 bg-secondary/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-primary relative"
                                >
                                    <div className="absolute inset-0 bg-white/10" />
                                </motion.div>
                            </div>

                            <div className="w-12 text-xs text-muted-foreground font-medium text-right">
                                {count}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingSummary;
