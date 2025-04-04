const asyncHandler = require('express-async-handler')
const { Review, ReviewValidate } = require('../models/Review')

/**
 * @method POST
 * @access public
 * @route /api/review
 * @desc Create a new Review
 */

const AddNewReview = asyncHandler(async (req, res) => {
    const { error } = ReviewValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the user has already reviewed this product
    const existingReview = await Review.findOne({
        user: req.user._id,
        product: req.body.product
    });

    if (existingReview) {
        return res.status(400).json({ message: "You have already reviewed this product" });
    }

    // Create new review
    const review = new Review({
        user: req.user._id,
        product: req.body.product,
        rating: req.body.rating,
        comment: req.body.comment,
    });

    await review.save();
    res.status(201).json({ message: "Review Created Successfully" });
});


/**
 * @method GET
 * @access public
 * @route /api/review
 * @desc get all reviews
 */

const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find()
    res.status(200).json(reviews)
})

/**
 * @method GET
 * @access public
 * @route /api/review/:id
 * @desc get review by id
 */

const getReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
    if (!review) {
        return res.status(404).json({ message: "Review Not Found" })
    }
    res.status(200).json(review)
})

/**
 * @method DELETE
 * @access public
 * @route /api/review/:id
 * @desc delete review by id
 */

const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
    if (!review) {
        return res.status(404).json({ message: "Review Not Found" })
    }
    await Review.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "Review Deleted Successfully"})
})

module.exports = {AddNewReview , getAllReviews , getReview , deleteReview}