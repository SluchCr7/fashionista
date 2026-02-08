const { Review } = require('../models/Review');
const { Product } = require('../models/Product');
const mongoose = require('mongoose');

class ReviewService {
    async calculateProductStats(productId) {
        const stats = await Review.aggregate([
            { $match: { product: new mongoose.Types.ObjectId(productId) } },
            {
                $facet: {
                    overall: [
                        { $group: { _id: null, reviewsCount: { $sum: 1 }, avgRating: { $avg: "$rating" } } }
                    ],
                    distribution: [
                        { $group: { _id: "$rating", count: { $sum: 1 } } }
                    ]
                }
            }
        ]);

        let reviewsCount = 0;
        let averageRating = 0;
        let ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

        if (stats[0].overall.length > 0) {
            reviewsCount = stats[0].overall[0].reviewsCount;
            averageRating = parseFloat(stats[0].overall[0].avgRating.toFixed(1));
        }

        if (stats[0].distribution.length > 0) {
            stats[0].distribution.forEach(item => {
                const rating = Math.round(item._id);
                if (rating >= 1 && rating <= 5) {
                    ratingBreakdown[rating] = item.count;
                }
            });
        }

        await Product.findByIdAndUpdate(productId, {
            averageRating,
            reviewsCount,
            ratingBreakdown
        });
    }

    async addReview(userId, reviewData) {
        const { product: productId, rating, comment } = reviewData;

        // Check if user already reviewed
        const existingReview = await Review.findOne({ user: userId, product: productId });
        if (existingReview) {
            throw new Error("You have already reviewed this product");
        }

        const review = await Review.create({
            user: userId,
            product: productId,
            rating,
            comment
        });

        await this.calculateProductStats(productId);
        return review;
    }

    async deleteReview(reviewId, userId, isAdmin) {
        const review = await Review.findById(reviewId);
        if (!review) throw new Error("Review not found");

        if (review.user.toString() !== userId.toString() && !isAdmin) {
            throw new Error("Not authorized to delete this review");
        }

        const productId = review.product;
        await Review.findByIdAndDelete(reviewId);
        await this.calculateProductStats(productId);
    }
}

module.exports = new ReviewService();
