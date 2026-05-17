const { Ads, AdValidate } = require('../models/Ads')
const Asynchandler = require('express-async-handler')
const fs = require('fs');
const { v2 } = require('cloudinary');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const newAd = Asynchandler(async (req, res) => {
    try {
        const { text, category } = req.body;

        // Ensure at least one image is uploaded
        if (!req.files || !req.files.image) {
            return errorResponse(res, "At least one image file is required.", 400);
        }

        let images = req.files.image;

        // Normalize single image to array format
        if (!Array.isArray(images)) {
            images = [images]; // Convert to array
        }

        const { error } = AdValidate(req.body);
        if (error) {
            return errorResponse(res, error.details[0].message, 400);
        }

        // Upload images to Cloudinary and store their details
        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                const result = await v2.uploader.upload(image.path, { resource_type: "image" });

                // Remove uploaded file from local storage
                fs.unlinkSync(image.path);

                return {
                    url: result.secure_url,
                    publicId: result.public_id
                };
            })
        );

        // Create a new Ad with multiple images
        const ad = new Ads({
            Photos: uploadedImages, // Storing array of image objects
            text,
            category
        });

        await ad.save();

        return successResponse(res, "Ad created successfully", { ad }, 201);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
});

const getAllAds = Asynchandler(async(req, res) => {
    const ads = await Ads.find().sort({ createdAt: -1 });
    return successResponse(res, "Ads fetched successfully", { ads });
})

const getAd = Asynchandler(async(req, res) => {
    const ad = await Ads.findById(req.params.id)
    if (!ad) {
        return errorResponse(res, "Ad Not Found", 404);
    }
    return successResponse(res, "Ad fetched successfully", { ad });
})

const deleteAd = Asynchandler(async(req, res) => {
    const ad = await Ads.findById(req.params.id)
    if (!ad) {
        return errorResponse(res, "Ad Not Found", 404);
    }
    
    // Delete images from Cloudinary
    if (ad.Photos && ad.Photos.length > 0) {
        await Promise.all(ad.Photos.map(photo => 
            v2.uploader.destroy(photo.publicId).catch(() => {})
        ));
    }
    
    await Ads.findByIdAndDelete(req.params.id)
    return successResponse(res, "Ad Deleted Successfully");
})

module.exports = {newAd , getAllAds , getAd , deleteAd}