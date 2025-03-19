const mongoose = require("mongoose");
const joi = require("joi");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required : true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        // required: true,
    },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);


const ReviewValidate = (obj) => {
    const schema = joi.object({
        product: joi.string().required(),  // Allow product ID
        rating: joi.number().min(1).max(5).required(),
        comment: joi.string().allow(''),  // Allow empty comment
    });
    return schema.validate(obj);
};  

module.exports = { Review, ReviewValidate };