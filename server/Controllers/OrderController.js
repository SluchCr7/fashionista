const orderService = require('../services/orderService');
const asyncHandler = require('express-async-handler');
const { OrderValidate } = require('../models/Order');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * @method POST
 * @access Private
 * @route /api/order
 * @desc Create a new Order
 */
const newOrder = asyncHandler(async (req, res) => {
    const { error } = OrderValidate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }

    try {
        const order = await orderService.createOrder(req.user._id, req.body);
        return successResponse(res, "Order placed successfully", { orderId: order._id }, 201);
    } catch (err) {
        return errorResponse(res, err.message, 400);
    }
});

/**
 * @method GET
 * @access Private
 * @route /api/order
 * @desc Get orders (User gets own, Admin gets all)
 */
const GetAllOrder = asyncHandler(async (req, res) => {
    let query = {};
    if (!req.user.isAdmin) {
        query.user = req.user._id;
    }

    const orders = await orderService.getOrders(query);
    return successResponse(res, "Orders fetched", { orders });
});

/**
 * @method GET
 * @access Private
 * @route /api/order/:id
 * @desc Get a single order
 */
const GetOrder = asyncHandler(async (req, res) => {
    const orders = await orderService.getOrders({ _id: req.params.id });
    const order = orders[0];

    if (!order) {
        return errorResponse(res, "Order Not Found", 404);
    }

    // Authorization check - compare as strings
    const orderUserId = order.user._id ? order.user._id.toString() : order.user.toString();
    if (!req.user.isAdmin && orderUserId !== req.user._id.toString()) {
        return errorResponse(res, "Access denied", 403);
    }

    return successResponse(res, "Order details fetched", { order });
});

/**
 * @method PATCH
 * @access Admin
 * @route /api/order/:id/status
 * @desc Update order status
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    try {
        const order = await orderService.updateStatus(req.params.id, status);
        return successResponse(res, "Order status updated successfully", { order });
    } catch (err) {
        return errorResponse(res, err.message, 400);
    }
});

/**
 * @method DELETE
 * @access Admin
 * @route /api/order/:id
 * @desc Delete Order
 */
const deleteOrder = asyncHandler(async (req, res) => {
    const orders = await orderService.getOrders({ _id: req.params.id });
    const order = orders[0];
    
    if (!order) {
        return errorResponse(res, "Order Not Found", 404);
    }

    // Restore inventory if order was not already cancelled
    if (order.status !== 'Cancelled' && order.items) {
        await orderService.restoreInventory(order.items);
    }

    await order.deleteOne();
    return successResponse(res, "Order Deleted Successfully");
});

module.exports = { deleteOrder, GetAllOrder, GetOrder, newOrder, updateOrderStatus };
