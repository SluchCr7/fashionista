const mongoose = require("mongoose");
const joi = require("joi");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: "Product Description"
    },
    quantity: {
        type: Number,
        required: true
    },
    Photo: {
        type: Array,
        required: true
    },
    model: {
        type: String,
        default: "Sluch"
    },
    material: {
        type: String,
        default: "Leather"
    },
    sizes: {
        type: Array,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    collections: {
        type: String,
        // required : true
    },
    category: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    ratingBreakdown: {
        type: Map,
        of: Number,
        default: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

ProductSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
});

const Product = mongoose.model("Product", ProductSchema)

const ProductValidate = (obj) => {
    const schema = joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        description: joi.string(),
        quantity: joi.number().required(),
        material: joi.string(),
        sizes: joi.array().required(),
        colors: joi.array().required(),
        collections: joi.string(),
        gender: joi.string().required(),
        // rating : joi.number(),
        averageRating: joi.number(),
        reviewsCount: joi.number(),
        ratingBreakdown: joi.object(),
        model: joi.string(),
        category: joi.string(),
    })
    return schema.validate(obj);
}

const UpdateProductValidate = (obj) => {
    const schema = joi.object({
        name: joi.string(),
        price: joi.number(),
        description: joi.string(),
        quantity: joi.number(),
        // rating : joi.number(),
        model: joi.string(),
        category: joi.string(),
    })
    return schema.validate(obj);
}

module.exports = { Product, ProductValidate, UpdateProductValidate }