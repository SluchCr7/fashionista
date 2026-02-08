const cartService = require('../services/cartService');
const asyncHandler = require('express-async-handler');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * @desc Get user cart
 * @route GET /api/cart
 * @access Private
 */
const getUserCart = asyncHandler(async (req, res) => {
    const cart = await cartService.getCartByUserId(req.user._id);
    return successResponse(res, "Cart fetched", cart || { items: [], totalPrice: 0 });
});

/**
 * @desc Add item to cart
 * @route POST /api/cart
 * @access Private
 */
const addItemToCart = asyncHandler(async (req, res) => {
    try {
        const cart = await cartService.addToCart(req.user._id, req.body);
        return successResponse(res, "Item added to cart", cart);
    } catch (err) {
        return errorResponse(res, err.message, 400);
    }
});

/**
 * @desc Remove item from cart
 * @route DELETE /api/cart
 * @access Private
 */
const removeItemFromCart = asyncHandler(async (req, res) => {
    const { productId, size, color } = req.query;
    const cart = await cartService.removeFromCart(req.user._id, productId, size, color);
    return successResponse(res, "Item removed from cart", cart);
});

/**
 * @desc Clear cart
 * @route DELETE /api/cart/clear
 * @access Private
 */
const clearCart = asyncHandler(async (req, res) => {
    await cartService.clearCart(req.user._id);
    return successResponse(res, "Cart cleared");
});

module.exports = {
    getUserCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
};
