const express = require('express');
const router = express.Router();
const {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
    getAllReviews,
    getReview
} = require('../Controllers/ReviewController');
const { verifyToken, verifyAdmain } = require("../Middelware/verifyToken");

// Public Routes
router.get('/product/:productId', getProductReviews); // Get reviews for a specific product
router.get('/:id', getReview); // Get single review
router.get('/', getAllReviews); // Get all reviews (mostly for admin/debug)

// Protected Routes
router.post('/', verifyToken, addReview); // Add review
router.put('/:id', verifyToken, updateReview); // Update review (owner only)
router.delete('/:id', verifyToken, deleteReview); // Delete review (owner or admin)

module.exports = router;