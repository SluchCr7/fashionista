const mongoose = require('mongoose')
const joi = require('joi')

const DiscountSchema = new mongoose.Schema({
    discount: {
        type: Number,
        required : true
    },
}, { timestamps: true });

const Discount = mongoose.model('Discount', DiscountSchema)

const DiscountValidate = (obj) => {
    const schema = joi.object({
        discount: joi.number().required(),
    })
    return schema.validate(obj);
}

module.exports = { Discount, DiscountValidate }