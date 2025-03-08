const asyncHandler = require('express-async-handler')
const {Order , OrderValidate} = require('../models/Order')

/**
 * @method POST
 * @access public
 * @route /api/order
 * @desc Create a new Order
 */

const newOrder = asyncHandler(async (req, res) => {
    const { error } = OrderValidate(req.body)
    if (error) {
        res.status(400).json({message : error.details[0].message})
    }
    const order = new Order({
        Products: req.body.Products,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        total : req.body.total,
        user : req.user._id
    })
    await order.save()
    res.status(201).json({message : "Order Created Successfully"})
})


/**
 * @method GET
 * @access public
 * @route /api/order
 * @desc get all Orders
 */

const GetAllOrder = asyncHandler(async (req, res) => {
    const orders = await Order.find().populate("user").populate("Products")
    res.status(200).json(orders)
})

/**
 * @method GET
 * @access public
 * @route /api/order/:id
 * @desc get Order
 */

const GetOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return res.status(404).json({ message: "Order Not Found" })
    }
    res.status(200).json(order)
})

/**
 * @method DELETE
 * @access public
 * @route /api/order/:id
 * @desc delete Order
 */

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return res.status(404).json({ message: "Order Not Found" })
    }
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "Order Deleted Successfully"})
})

module.exports = {deleteOrder , GetAllOrder , GetOrder , newOrder}