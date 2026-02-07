const asyncHandler = require('express-async-handler');
const { Order, OrderValidate } = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

/**
 * @method POST
 * @access Private
 * @route /api/order
 * @desc Create a new Order
 */
const newOrder = asyncHandler(async (req, res) => {
    const { error } = OrderValidate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { items, shippingDetails, paymentMethod, subtotal, shippingFee, total } = req.body;

    // 1. Check stock and reduce it
    for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
            return res.status(404).json({ message: `Product ${item.name} not found.` });
        }
    }

    // 2. Create the order
    const order = new Order({
        user: req.user._id,
        items,
        shippingDetails,
        paymentMethod,
        subtotal,
        shippingFee,
        total
    });

    await order.save();

    // 3. Reduce stock and add order to user's history
    for (const item of items) {
        await Product.findByIdAndUpdate(item.product, {
            $inc: { quantity: -item.quantity }
        });
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push: { orders: order._id }
    });

    res.status(201).json({
        message: "Order placed successfully",
        orderId: order._id
    });
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

    const orders = await Order.find(query)
        .populate("user", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json(orders);
});

/**
 * @method GET
 * @access Private
 * @route /api/order/:id
 * @desc Get a single order
 */
const GetOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
    }

    // Authorization check
    if (!req.user.isAdmin && order.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(order);
});

/**
 * @method PATCH
 * @access Admin
 * @route /api/order/:id/status
 * @desc Update order status
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated successfully", order });
});

/**
 * @method DELETE
 * @access Admin
 * @route /api/order/:id
 * @desc Delete Order
 */
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return res.status(404).json({ message: "Order Not Found" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order Deleted Successfully" });
});

module.exports = { deleteOrder, GetAllOrder, GetOrder, newOrder, updateOrderStatus };