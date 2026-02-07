"use client";
import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const StarRating = ({
    rating = 0,
    totalStars = 5,
    onRatingChange,
    readonly = false,
    size = 18,
    className = ""
}) => {
    const [hoverRating, setHoverRating] = React.useState(0);

    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                const isActive = hoverRating ? starValue <= hoverRating : starValue <= rating;

                return (
                    <motion.button
                        key={index}
                        type="button"
                        whileHover={!readonly ? { scale: 1.2 } : {}}
                        whileTap={!readonly ? { scale: 0.9 } : {}}
                        disabled={readonly}
                        className={`${readonly ? "cursor-default" : "cursor-pointer"} focus:outline-none transition-colors duration-200`}
                        onClick={() => onRatingChange && onRatingChange(starValue)}
                        onMouseEnter={() => !readonly && setHoverRating(starValue)}
                        onMouseLeave={() => !readonly && setHoverRating(0)}
                    >
                        <Star
                            size={size}
                            className={`
                ${isActive
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-muted-foreground/30 fill-transparent"
                                }
                transition-all duration-200
              `}
                        />
                    </motion.button>
                );
            })}
        </div>
    );
};

export default StarRating;
