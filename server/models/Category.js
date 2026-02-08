const mongoose = require('mongoose');
const joi = require('joi');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Category = mongoose.model("Category", CategorySchema);

const CategoryValidate = (obj) => {
    const schema = joi.object({
        name: joi.string().required().min(2).max(50),
        description: joi.string().allow(''),
        image: joi.string().allow('')
    });
    return schema.validate(obj);
};

module.exports = { Category, CategoryValidate };
