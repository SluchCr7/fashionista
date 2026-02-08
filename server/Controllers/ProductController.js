const productService = require('../services/productService');
const asyncHandler = require('express-async-handler');
const { Product, ProductValidate, UpdateProductValidate } = require('../models/Product');
const { v2 } = require('cloudinary');
const fs = require('fs');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * @desc Create New Product
 * @route POST /api/product
 * @access Private (Admin)
 */
const NewProduct = asyncHandler(async (req, res) => {
    // Ensure an image is uploaded
    if (!req.files || !req.files.image) {
        return errorResponse(res, "Image file is required.", 400);
    }

    let image = req.files.image;
    if (Array.isArray(image)) {
        image = image[0];
    }

    const { error } = ProductValidate(req.body);
    if (error) {
        return errorResponse(res, error.details[0].message, 400);
    }

    // Upload the image to Cloudinary
    const result = await v2.uploader.upload(image.path, { resource_type: "image" });

    const product = new Product({
        Photo: {
            url: result.secure_url,
            publicId: result.public_id
        },
        ...req.body
    });

    await product.save();
    fs.unlinkSync(image.path);

    return successResponse(res, "Product created successfully", { product }, 201);
});

/**
 * @desc Get All Products with filtering, sorting and pagination
 * @route GET /api/product
 * @access Public
 */
const getAllProduct = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 12,
        sort = '-createdAt',
        category,
        gender,
        minPrice,
        maxPrice,
        material,
        colors,
        sizes,
        search
    } = req.query;

    const filters = {};
    if (category) filters.category = category;
    if (gender) filters.gender = { $regex: new RegExp(`^${gender}$`, 'i') }; // Case-insensitive gender
    if (material) filters.material = material;
    if (colors) filters.colors = { $in: colors.split(',') };
    if (sizes) filters.sizes = { $in: sizes.split(',') };

    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = Number(minPrice);
        if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (search) {
        filters.name = { $regex: search, $options: 'i' };
    }

    const result = await productService.getAllProducts(filters, {
        page: Number(page),
        limit: Number(limit),
        sort
    });

    return successResponse(res, "Products fetched", result);
});

/**
 * @desc Get Single Product
 * @route GET /api/product/:id
 * @access Public
 */
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: { path: 'user', select: 'name profilePhoto' }
        });

    if (!product) {
        return errorResponse(res, "Product Not Found", 404);
    }
    return successResponse(res, "Product details fetched", { product });
});

/**
 * @desc Delete Product
 * @route DELETE /api/product/:id
 * @access Private (Admin)
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return errorResponse(res, "Product Not Found", 404);
    }

    await Product.findByIdAndDelete(req.params.id);
    if (product.Photo && product.Photo.publicId) {
        await v2.uploader.destroy(product.Photo.publicId);
    }

    return successResponse(res, "Product Deleted Successfully");
});

module.exports = { NewProduct, getAllProduct, getProduct, deleteProduct };


