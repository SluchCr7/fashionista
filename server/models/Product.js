const mongoose = require("mongoose");
const joi = require("joi");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    price: {
        type: Number,
        required : true
    },
    description : {
        type: String,
        default : "Product Description"
    },
    quantity: {
        type: Number,
        required : true
    },
    Photo : {
        type : Array,
        required : true
    },
    model: {
        type: String,
        default : "Sluch"
    },
    material: {
        type: String,
        required : true
    },
    sizes: {
        type: Array,
        required : true
    },
    colors : {
        type: Array,
        required : true
    },
    gender: {
        type: String,
        required : true
    },
    collections: {
        type: String,
        required : true
    },
    category: {
        type: String,   
        required : true
    },
    rating: {
        type: String, 
        default : 0
    }
}, { timestamps : true })

const Product = mongoose.model("Product", ProductSchema)

const ProductValidate = (obj) => {
    const schema = joi.object({
        name: joi.string().required(),
        price: joi.number().required(),
        description: joi.string(),
        quantity: joi.number().required(),
        material: joi.string().required(),
        sizes : joi.array().required(),
        colors: joi.array().required(),
        collections: joi.string().required(),
        gender : joi.string().required(),
        // rating : joi.number(),
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
        quantity : joi.number(),
        // rating : joi.number(),
        model: joi.string(),
        category: joi.string(),
    })
    return schema.validate(obj);
}

module.exports = {Product, ProductValidate, UpdateProductValidate}