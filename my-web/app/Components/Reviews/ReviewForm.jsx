"use client";
import React, { useContext, useState } from "react";
import StarRating from "./StarRating";
import { ReviewContext } from "@/app/Context/ReviewContext";
import { AuthContext } from "@/app/Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";

const ReviewForm = ({ productId, onFinish }) => {
    const { user } = useContext(AuthContext);
    const { addReview } = useContext(ReviewContext);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) return alert("Please select a star rating");

        setIsSubmitting(true);
        try {
            await addReview({ product: productId, rating, comment });
            setShowSuccess(true);
            setRating(0);
            setComment("");
            if (onFinish) onFinish();

            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className="p-8 rounded-2xl bg-secondary/5 border border-dashed border-border flex flex-col items-center text-center">
                <AlertCircle className="text-muted-foreground mb-4" size={32} />
                <h3 className="text-lg font-bold mb-2">Want to share your thoughts?</h3>
                <p className="text-sm text-muted-foreground mb-6">You must be logged in to post a review.</p>
                <button className="px-6 py-2 bg-foreground text-background rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                    Login / Register
                </button>
            </div>
        );
    }

    return (
        <div className="bg-background rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Write a Review
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Overall Rating
                    </label>
                    <StarRating rating={rating} onRatingChange={setRating} size={28} />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        Your Review
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What did you like or dislike? How was the fit?"
                        className="w-full p-4 rounded-xl bg-secondary/30 border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none text-sm resize-none transition-all h-32"
                    />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] text-muted-foreground italic">
                        Your review will be shared publicly.
                    </p>

                    <button
                        type="submit"
                        disabled={isSubmitting || rating === 0}
                        className="relative overflow-hidden group px-8 py-3 bg-foreground text-background rounded-full font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:grayscale flex items-center gap-2 hover:shadow-xl active:scale-[0.98]"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        ) : (
                            <>
                                <Send size={16} /> Post Review
                            </>
                        )}
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl flex items-center gap-2 text-sm font-medium"
                    >
                        <CheckCircle2 size={16} /> Thank you! Your review has been posted.
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ReviewForm;
