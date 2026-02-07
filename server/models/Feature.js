const mongoose = require("mongoose");
const joi = require("joi");

const FeatureSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
        // e.g., "CiPlane", "CiMoneyCheck1"
    },
    paragraph: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const Feature = mongoose.model("Feature", FeatureSchema);

const validateFeature = (obj) => {
    const schema = joi.object({
        text: joi.string().required().label("Title"),
        icon: joi.string().required().label("Icon Name"),
        paragraph: joi.string().required().label("Description"),
    });
    return schema.validate(obj);
};

const validateUpdateFeature = (obj) => {
    const schema = joi.object({
        text: joi.string(),
        icon: joi.string(),
        paragraph: joi.string(),
    });
    return schema.validate(obj);
};

module.exports = { Feature, validateFeature, validateUpdateFeature };
