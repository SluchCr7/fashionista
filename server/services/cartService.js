const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product');

class CartService {
    async getCartByUserId(userId) {
        return await Cart.findOne({ user: userId }).populate('items.product');
    }

    async addToCart(userId, itemData) {
        const { product: productId, quantity, size, color } = itemData;

        let cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(productId);

        if (!product) throw new Error("Product not found");
        if (product.quantity < quantity) throw new Error("Not enough stock");

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.product.toString() === productId && item.size === size && item.color === color
        );

        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                size,
                color,
                priceAtAdd: product.price
            });
        }

        await cart.save();
        return cart;
    }

    async removeFromCart(userId, productId, size, color) {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return null;

        cart.items = cart.items.filter(
            item => !(item.product.toString() === productId && item.size === size && item.color === color)
        );

        await cart.save();
        return cart;
    }

    async clearCart(userId) {
        return await Cart.findOneAndDelete({ user: userId });
    }
}

module.exports = new CartService();
