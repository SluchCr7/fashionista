const mongoose = require('mongoose');
const joi = require('joi');

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    minOrderAmount: {
        type: Number,
        default: 0
    },
    maxDiscountAmount: {
        type: Number
    },
    expiryDate: {
        type: Date,
        required: true
    },
    usageLimit: {
        type: Number,
        default: null // null means unlimited
    },
    usageCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", CouponSchema);

const CouponValidate = (obj) => {
    const schema = joi.object({
        code: joi.string().required().min(3).max(20),
        discountType: joi.string().valid('percentage', 'fixed').required(),
        discountValue: joi.number().required().min(0),
        minOrderAmount: joi.number().min(0),
        maxDiscountAmount: joi.number().min(0),
        expiryDate: joi.date().greater('now').required(),
        usageLimit: joi.number().min(1).allow(null),
        isActive: joi.boolean()
    });
    return schema.validate(obj);
};

module.exports = { Coupon, CouponValidate };
