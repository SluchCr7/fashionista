const asyncHandler = require('express-async-handler')
const { Product, ProductValidate, UpdateProductValidate } = require('../models/Product')
const {v2} = require('cloudinary')
const { cloudRemove , cloudUpload } = require('../Config/cloudUpload')
const fs = require('fs')
const path = require('path')
/**
 * @desc Create New Product
 * @route POST /api/auth/product
 * @access Public
 */
const NewProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, model, category, gender, sizes, colors, collections, material } = req.body;
        
        // Ensure an image is uploaded
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "Image file is required." });
        }

        let image = req.files.image;
        
        // Handle cases where `image` might be an array
        if (Array.isArray(image)) {
            image = image[0]; // Get the first image
        }

        const { error } = ProductValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Upload the image to Cloudinary
        const result = await v2.uploader.upload(image.path, { resource_type: "image" });

        // Create a new product
        const product = new Product({
            Photo: {
                url: result.secure_url,
                publicId: result.public_id
            },
            name,
            description,
            price,
            quantity,
            model,
            category,
            gender,
            sizes,
            colors,
            collections,
            material
        });

        await product.save();

        // Remove the uploaded file from local storage
        fs.unlinkSync(image.path);

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
/**
 * @method GET
 * @access public
 * @route /api/product
 * @desc ALL Product
 */

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate({
      path: "reviews",
      model: "Review",
      select: "user rating comment",
      populate: {
        path: "user",
        model: "User",
        select: "name email profilePhoto"
      }
    });

  res.status(200).json(products);
});


/**
 * @method GET
 * @access public
 * @route /api/product/:id
 * @desc get product by id
 */

const getProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({ message: "Product Not Found" })
    }
    res.status(200).json(product)
})

/**
 * @method DELETE
 * @access public
 * @route /api/product/:id
 * @desc delete Product
 */

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return res.status(404).json({ message: "Product Not Found" })
    }
    await Product.findByIdAndDelete(req.params.id)
    cloudRemove(product.Photo.publicId)
    res.status(200).json({message : "Product Deleted Successfully"})
})



module.exports = { NewProduct , getAllProduct, getProduct , deleteProduct}

