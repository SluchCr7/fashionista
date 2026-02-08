const { Coupon, CouponValidate } = require('../models/Coupon');
const asyncHandler = require('express-async-handler');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * @desc Create a new coupon
 * @route POST /api/coupon
 * @access Admin
 */
const createCoupon = asyncHandler(async (req, res) => {
    const { error } = CouponValidate(req.body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const existing = await Coupon.findOne({ code: req.body.code.toUpperCase() });
    if (existing) return errorResponse(res, "Coupon code already exists", 400);

    const coupon = await Coupon.create(req.body);
    return successResponse(res, "Coupon created successfully", { coupon }, 201);
});

/**
 * @desc Validate a coupon code
 * @route POST /api/coupon/validate
 * @access Private
 */
const validateCoupon = asyncHandler(async (req, res) => {
    const { code, amount } = req.body;
    if (!code) return errorResponse(res, "Coupon code is required", 400);

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) return errorResponse(res, "Invalid or inactive coupon code", 404);

    if (new Date() > coupon.expiryDate) {
        return errorResponse(res, "Coupon has expired", 400);
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        return errorResponse(res, "Coupon usage limit reached", 400);
    }

    if (amount < coupon.minOrderAmount) {
        return errorResponse(res, `Minimum order amount for this coupon is $${coupon.minOrderAmount}`, 400);
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
        discountAmount = (amount * coupon.discountValue) / 100;
        if (coupon.maxDiscountAmount && discountAmount > coupon.maxDiscountAmount) {
            discountAmount = coupon.maxDiscountAmount;
        }
    } else {
        discountAmount = coupon.discountValue;
    }

    return successResponse(res, "Coupon is valid", {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount: parseFloat(discountAmount.toFixed(2))
    });
});

/**
 * @desc Get all coupons
 * @route GET /api/coupon
 * @access Admin
 */
const getAllCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return successResponse(res, "Coupons fetched", { coupons });
});

/**
 * @desc Delete a coupon
 * @route DELETE /api/coupon/:id
 * @access Admin
 */
const deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return errorResponse(res, "Coupon not found", 404);
    return successResponse(res, "Coupon deleted successfully");
});

module.exports = {
    createCoupon,
    validateCoupon,
    getAllCoupons,
    deleteCoupon
};
