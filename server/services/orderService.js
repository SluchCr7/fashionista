const { Order } = require('../models/Order');
const productService = require('./productService');
const { User } = require('../models/User');
const { Coupon } = require('../models/Coupon');
const mongoose = require('mongoose');

class OrderService {
    async createOrder(userId, orderData) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { items, shippingDetails, paymentMethod, subtotal, shippingFee, total, coupon, discountAmount } = orderData;

            // 1. Verify and Reduce Stock
            for (const item of items) {
                await productService.updateStock(item.product, -item.quantity, session);
            }

            // 2. Handle Coupon Usage
            if (coupon && coupon.code) {
                const dbCoupon = await Coupon.findOne({ code: coupon.code.toUpperCase() }).session(session);
                if (dbCoupon) {
                    dbCoupon.usageCount += 1;
                    await dbCoupon.save({ session });
                }
            }

            // 3. Create Order
            const order = new Order({
                user: userId,
                items,
                shippingDetails,
                paymentMethod,
                subtotal,
                shippingFee,
                coupon,
                discountAmount,
                total,
                status: 'Pending'
            });

            await order.save({ session });

            // 3. Link to User
            await User.findByIdAndUpdate(userId, {
                $push: { orders: order._id }
            }, { session });

            await session.commitTransaction();
            return order;
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getOrders(query) {
        return await Order.find(query)
            .populate("user", "name email")
            .sort({ createdAt: -1 });
    }

    async updateStatus(orderId, status) {
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Order not found");

        order.status = status;
        await order.save();
        return order;
    }
}

module.exports = new OrderService();
