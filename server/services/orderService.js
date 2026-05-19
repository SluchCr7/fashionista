const { Order } = require('../models/Order');
const { Product } = require('../models/Product');
const productService = require('./productService');
const { User } = require('../models/User');
const { Coupon } = require('../models/Coupon');
const mongoose = require('mongoose');

class OrderService {
    async createOrder(userId, orderData) {
        let session = null;
        try {
            session = await mongoose.startSession();
        } catch (e) {
            console.log("Mongoose session creation failed (standalone DB). Using transactionless fallback.");
        }

        if (session) {
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

                // 4. Link to User
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
        } else {
            // Standalone Fallback
            const { items, shippingDetails, paymentMethod, subtotal, shippingFee, total, coupon, discountAmount } = orderData;

            // 1. Verify and Reduce Stock
            for (const item of items) {
                await productService.updateStock(item.product, -item.quantity, null);
            }

            // 2. Handle Coupon Usage
            if (coupon && coupon.code) {
                const dbCoupon = await Coupon.findOne({ code: coupon.code.toUpperCase() });
                if (dbCoupon) {
                    dbCoupon.usageCount += 1;
                    await dbCoupon.save();
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

            await order.save();

            // 4. Link to User
            await User.findByIdAndUpdate(userId, {
                $push: { orders: order._id }
            });

            return order;
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

        // If cancelling order, restore inventory
        if (status === 'Cancelled' && order.status !== 'Cancelled') {
            await this.restoreInventory(order.items);
        }

        order.status = status;
        await order.save();
        return order;
    }

    async restoreInventory(items) {
        if (!items || !Array.isArray(items)) return;
        
        for (const item of items) {
            if (item.product && item.quantity) {
                await Product.findByIdAndUpdate(item.product, {
                    $inc: { quantity: item.quantity }
                });
            }
        }
    }
}

module.exports = new OrderService();
