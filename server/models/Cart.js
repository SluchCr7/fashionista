const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true // One cart per user
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
            size: String,
            color: String,
            priceAtAdd: Number // Snapshot of price when added
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Middleware to calculate total price before saving
CartSchema.pre('save', async function (next) {
    if (this.items.length === 0) {
        this.totalPrice = 0;
        return next();
    }
    // Note: Actual total price calculation usually happens in service to handle current product prices
    next();
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
