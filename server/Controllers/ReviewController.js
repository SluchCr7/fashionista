const asyncHandler = require('express-async-handler');
const { Review, ReviewValidate } = require('../models/Review');
const { Product } = require('../models/Product');
const mongoose = require('mongoose');

// Helper Function: Calculate Product Stats
const calculateProductStats = async (productId) => {
    try {
        const stats = await Review.aggregate([
            {
                $match: { product: new mongoose.Types.ObjectId(productId) }
            },
            {
                $facet: {
                    overall: [
                        {
                            $group: {
                                _id: null,
                                reviewsCount: { $sum: 1 },
                                avgRating: { $avg: "$rating" }
                            }
                        }
                    ],
                    distribution: [
                        {
                            $group: {
                                _id: "$rating",
                                count: { $sum: 1 }
                            }
                        }
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
        }, { new: true });

    } catch (error) {
        console.error("Error calculating product stats:", error);
    }
};

/**
 * @method POST
 * @access Private (Logged in users)
 * @route /api/review
 * @desc Create a new Review
 */
const addReview = asyncHandler(async (req, res) => {
    const { error } = ReviewValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { product, rating, comment } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
        return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed this product
    const reviewExists = await Review.findOne({ user: userId, product });
    if (reviewExists) {
        return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = await Review.create({
        user: userId,
        product,
        rating,
        comment
    });

    // Update Product Stats
    await calculateProductStats(product);

    const populatedReview = await Review.findById(review._id).populate('user', 'name profilePhoto');

    res.status(201).json({
        message: "Review added successfully",
        review: populatedReview
    });
});

/**
 * @method GET
 * @access Public
 * @route /api/review/product/:productId
 * @desc Get all reviews for a product with pagination
 */
const getProductReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ product: productId })
        .populate('user', 'name profilePhoto')
        .sort({ createdAt: -1 }) // Newest first
        .skip(skip)
        .limit(limit);

    const totalReviews = await Review.countDocuments({ product: productId });

    res.status(200).json({
        reviews,
        page,
        pages: Math.ceil(totalReviews / limit),
        totalReviews
    });
});

/**
 * @method PUT
 * @access Private (Owner only)
 * @route /api/review/:id
 * @desc Update a review
 */
const updateReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    // Check ownership
    if (review.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to update this review" });
    }

    review.rating = rating || review.rating;
    review.comment = comment !== undefined ? comment : review.comment;

    await review.save();

    // Recalculate stats
    await calculateProductStats(review.product);

    res.status(200).json({ message: "Review updated successfully", review });
});

/**
 * @method DELETE
 * @access Private (Owner or Admin)
 * @route /api/review/:id
 * @desc Delete a review
 */
const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    // Check ownership or admin status
    if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    const productId = review.product;
    await Review.findByIdAndDelete(req.params.id);

    // Recalculate stats
    await calculateProductStats(productId);

    res.status(200).json({ message: "Review deleted successfully" });
});

/**
 * @method GET
 * @access Public
 * @route /api/review
 * @desc Get all reviews (Admin/Debug)
 */
const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find().populate('user', 'name');
    res.status(200).json(reviews);
});

/**
 * @method GET
 * @access Public
 * @route /api/review/:id
 * @desc Get single review
 */
const getReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id).populate('user', 'name profilePhoto');
    if (!review) {
        return res.status(404).json({ message: "Review Not Found" });
    }
    res.status(200).json(review);
});

module.exports = {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAllReviews,
    getReview
};