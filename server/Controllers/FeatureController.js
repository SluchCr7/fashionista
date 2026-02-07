const asyncHandler = require('express-async-handler');
const { Feature, validateFeature, validateUpdateFeature } = require('../models/Feature');

/**
 * @desc Get All Features
 * @route GET /api/features
 * @access Public
 */
const getAllFeatures = asyncHandler(async (req, res) => {
    const features = await Feature.find().sort({ createdAt: 1 });
    res.status(200).json(features);
});

/**
 * @desc Create New Feature
 * @route POST /api/features
 * @access Private (Admin) - currently public for simplicity as per requirement
 */
const createFeature = asyncHandler(async (req, res) => {
    const { error } = validateFeature(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const feature = new Feature({
        text: req.body.text,
        icon: req.body.icon,
        paragraph: req.body.paragraph,
    });

    await feature.save();
    res.status(201).json(feature);
});

/**
 * @desc Update Feature
 * @route PUT /api/features/:id
 * @access Private (Admin)
 */
const updateFeature = asyncHandler(async (req, res) => {
    const { error } = validateUpdateFeature(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const feature = await Feature.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
                text: req.body.text,
                icon: req.body.icon,
                paragraph: req.body.paragraph,
            }
        },
        { new: true }
    );

    if (!feature) {
        return res.status(404).json({ message: "Feature not found" });
    }

    res.status(200).json(feature);
});

/**
 * @desc Delete Feature
 * @route DELETE /api/features/:id
 * @access Private (Admin)
 */
const deleteFeature = asyncHandler(async (req, res) => {
    const feature = await Feature.findById(req.params.id);
    if (!feature) {
        return res.status(404).json({ message: "Feature not found" });
    }

    await Feature.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feature deleted successfully" });
});

module.exports = {
    getAllFeatures,
    createFeature,
    updateFeature,
    deleteFeature
};
