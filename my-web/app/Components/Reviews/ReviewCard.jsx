"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import { UserContext } from "@/app/Context/UserContext";
import { ReviewContext } from "@/app/Context/ReviewContext";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Edit2, Trash2, Check, X } from "lucide-react";

const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(new Date(dateString));
};

const ReviewCard = ({ review }) => {
    const { user } = useContext(UserContext);
    const { deleteReview, updateReview } = useContext(ReviewContext);
    const [isEditing, setIsEditing] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [editedRating, setEditedRating] = useState(review.rating);
    const [editedComment, setEditedComment] = useState(review.comment);
    const [isUpdating, setIsUpdating] = useState(false);

    const isOwner = user?._id === review.user?._id;
    const isAdmin = user?.isAdmin;

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this review?")) {
            await deleteReview(review._id, review.product);
        }
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            await updateReview(review._id, { rating: editedRating, comment: editedComment });
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-6 rounded-2xl bg-background border border-border/50 hover:border-border transition-colors group relative"
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-secondary border border-border">
                        <Image
                            src={review.user?.profilePhoto?.url || "/placeholder-avatar.png"}
                            alt={review.user?.name || "User"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold">{review.user?.name}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                            {formatDate(review.createdAt)}
                        </p>
                    </div>
                </div>

                {/* Options (Edit/Delete) */}
                {(isOwner || isAdmin) && !isEditing && (
                    <div className="relative">
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="p-2 hover:bg-secondary rounded-full transition-colors"
                        >
                            <MoreVertical size={16} />
                        </button>
                        <AnimatePresence>
                            {showOptions && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowOptions(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        className="absolute right-0 top-full mt-2 w-32 bg-background border border-border shadow-xl rounded-xl overflow-hidden z-20"
                                    >
                                        {isOwner && (
                                            <button
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setShowOptions(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-4 py-3 text-xs font-bold hover:bg-secondary transition-colors text-left"
                                            >
                                                <Edit2 size={14} /> Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                handleDelete();
                                                setShowOptions(false);
                                            }}
                                            className="flex items-center gap-2 w-full px-4 py-3 text-xs font-bold hover:bg-destructive/10 text-destructive transition-colors text-left"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <StarRating rating={editedRating} onRatingChange={setEditedRating} />
                    <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        className="w-full p-4 rounded-xl bg-secondary/30 border border-border focus:border-primary outline-none text-sm resize-none transition-all"
                        rows={3}
                    />
                    <div className="flex gap-2 justify-end">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <X size={18} />
                        </button>
                        <button
                            onClick={handleUpdate}
                            disabled={isUpdating}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-95 transition-all"
                        >
                            {isUpdating ? (
                                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            ) : (
                                <><Check size={18} /> Save</>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <StarRating rating={review.rating} readonly size={16} className="mb-3" />
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                        &quot;{review.comment}&quot;
                    </p>
                </>
            )}
        </motion.div>
    );
};

export default ReviewCard;
