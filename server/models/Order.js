const mongoose = require('mongoose');
const joi = require('joi');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            size: { type: String },
            color: { type: String },
            image: { type: String }
        }
    ],
    shippingDetails: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Card'],
        default: 'COD'
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: "Pending"
    },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    coupon: {
        code: String,
        discountValue: Number,
        discountType: String
    },
    discountAmount: { type: Number, default: 0 },
    total: { type: Number, required: true }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", OrderSchema);

const OrderValidate = (obj) => {
    const schema = joi.object({
        items: joi.array().items(
            joi.object({
                product: joi.string().required(),
                name: joi.string().required(),
                price: joi.number().required(),
                quantity: joi.number().min(1).required(),
                size: joi.string().allow(''),
                color: joi.string().allow(''),
                image: joi.string().allow('')
            })
        ).required(),
        shippingDetails: joi.object({
            name: joi.string().required(),
            address: joi.string().required(),
            city: joi.string().required(),
            country: joi.string().required(),
            zip: joi.string().required(),
            phoneNumber: joi.string().required(),
            email: joi.string().email().required()
        }).required(),
        paymentMethod: joi.string().valid('COD', 'Card'),
        subtotal: joi.number().required(),
        shippingFee: joi.number(),
        coupon: joi.object({
            code: joi.string(),
            discountValue: joi.number(),
            discountType: joi.string()
        }),
        discountAmount: joi.number(),
        total: joi.number().required()
    });
    return schema.validate(obj);
};

module.exports = { Order, OrderValidate };