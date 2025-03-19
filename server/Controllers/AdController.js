const { Ads, AdValidate } = require('../models/Ads')
const Asynchandler = require('express-async-handler')
const fs = require('fs');
const { v2 } = require('cloudinary');

const newAd = async (req, res) => {
    try {
        const { text, category } = req.body;

        // Ensure at least one image is uploaded
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "At least one image file is required." });
        }

        let images = req.files.image;

        // Normalize single image to array format
        if (!Array.isArray(images)) {
            images = [images]; // Convert to array
        }

        const { error } = AdValidate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
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

        res.status(201).json(ad);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllAds = Asynchandler(async(req, res) => {
    const ads = await Ads.find()
    res.status(200).json(ads)
})

const getAd = Asynchandler(async(req, res) => {
    const ad = await Ads.findById(req.params.id)
    if (!ad) {
        return res.status(404).json({ message: "Ad Not Found" })
    }
    res.status(200).json(ad)
})

const deleteAd = Asynchandler(async(req, res) => {
    const ad = await Ads.findById(req.params.id)
    if (!ad) {
        return res.status(404).json({ message: "Ad Not Found" })
    }
    await Ads.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "Ad Deleted Successfully"})
})

module.exports = {newAd , getAllAds , getAd , deleteAd}