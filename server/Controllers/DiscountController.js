const { Discount, DiscountValidate } = require('../models/Discount')
const asyncHandler = require('express-async-handler')
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * @method POST
 * @access public
 * @route /api/discount
 * @desc Create a new Discount
 */

const newDiscount = asyncHandler(async (req, res) => {
    const { error } = DiscountValidate(req.body)
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }
    const discount = new Discount({
        discount: req.body.discount
    })
    await discount.save()
    return successResponse(res, "Discount Created Successfully", { discount }, 201);
})


/**
 * @method GET
 * @access public
 * @route /api/discount
 * @desc get discount
 */

const getDiscount = asyncHandler(async (req, res) => {
    const discounts = await Discount.find()
    return successResponse(res, "Discounts fetched", discounts);
})


module.exports = { newDiscount, getDiscount }