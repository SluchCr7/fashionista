const { Product } = require('../models/Product');

class ProductService {
    async getAllProducts(filters = {}, options = {}) {
        const { page = 1, limit = 10, sort = '-createdAt' } = options;
        const skip = (page - 1) * limit;

        const query = Product.find(filters)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        const products = await query;
        const total = await Product.countDocuments(filters);

        return {
            products,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async getProductById(id) {
        return await Product.findById(id).populate('reviews');
    }

    async updateStock(productId, quantityChange) {
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");

        if (product.quantity + quantityChange < 0) {
            throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        product.quantity += quantityChange;
        await product.save();
        return product;
    }

    async updateAverageRating(productId, newRating, reviewsCount) {
        return await Product.findByIdAndUpdate(productId, {
            averageRating: newRating,
            reviewsCount: reviewsCount
        }, { new: true });
    }
}

module.exports = new ProductService();
