const { Discount, DiscountValidate } = require('../models/Discount')
const asyncHandler = require('express-async-handler')

/**
 * @method POST
 * @access public
 * @route /api/discount
 * @desc Create a new Discount
 */

const newDiscount = asyncHandler(async (req, res) => {
    const { error } = DiscountValidate(req.body)
    if (error) {
        res.status(400).json({message : error.details[0].message})
    }
    const discount = new Discount({
        discount: req.body.discount
    })
    await discount.save()
    res.status(201).json({message : "Discount Created Successfully"})
})


/**
 * @method GET
 * @access public
 * @route /api/discount
 * @desc get discount
 */

const getDiscount = asyncHandler(async (req, res) => {
    const discount = await Discount.find()
    res.status(200).json(discount)
})


module.exports = { newDiscount , getDiscount }