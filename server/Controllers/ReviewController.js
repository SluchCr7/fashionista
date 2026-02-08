const reviewService = require('../services/reviewService');
const asyncHandler = require('express-async-handler');
const { Review, ReviewValidate } = require('../models/Review');
const { Product } = require('../models/Product');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * @method POST
 * @access Private
 * @route /api/review
 * @desc Create a new Review
 */
const addReview = asyncHandler(async (req, res) => {
    const { error } = ReviewValidate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }

    // Check if product exists
    const productExists = await Product.findById(req.body.product);
    if (!productExists) {
        return errorResponse(res, "Product not found", 404);
    }

    try {
        const review = await reviewService.addReview(req.user._id, req.body);
        const populatedReview = await Review.findById(review._id).populate('user', 'name profilePhoto');
        return successResponse(res, "Review added successfully", { review: populatedReview }, 201);
    } catch (err) {
        return errorResponse(res, err.message, 400);
    }
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
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    const totalReviews = await Review.countDocuments({ product: productId });

    return successResponse(res, "Reviews fetched", {
        reviews,
        pagination: {
            page,
            pages: Math.ceil(totalReviews / limit),
            totalReviews
        }
    });
});

/**
 * @method PUT
 * @access Private (Owner)
 * @route /api/review/:id
 * @desc Update a review
 */
const updateReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
        return errorResponse(res, "Review not found", 404);
    }

    if (review.user.toString() !== req.user._id.toString()) {
        return errorResponse(res, "Not authorized to update this review", 403);
    }

    review.rating = rating || review.rating;
    review.comment = comment !== undefined ? comment : review.comment;

    await review.save();
    await reviewService.calculateProductStats(review.product);

    return successResponse(res, "Review updated successfully", { review });
});

/**
 * @method DELETE
 * @access Private (Owner or Admin)
 * @route /api/review/:id
 * @desc Delete a review
 */
const deleteReview = asyncHandler(async (req, res) => {
    try {
        await reviewService.deleteReview(req.params.id, req.user._id, req.user.isAdmin);
        return successResponse(res, "Review deleted successfully");
    } catch (err) {
        return errorResponse(res, err.message, 403);
    }
});

/**
 * @method GET
 * @access Private (Admin)
 * @route /api/review
 * @desc Get all reviews
 */
const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find().populate('user', 'name');
    return successResponse(res, "All reviews fetched", { reviews });
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
        return errorResponse(res, "Review Not Found", 404);
    }
    return successResponse(res, "Review fetched", { review });
});

module.exports = {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAllReviews,
    getReview
};
