const mongoose = require('mongoose')
const joi = require('joi')

const AdSchema = new mongoose.Schema({
    Photos: [
        {
            url: { type: String, required: true },
            publicId: { type: String, required: true }
        }
    ],
    text: { type: String},
    category: { type: String, required: true },
}, { timestamps: true });

const Ads = mongoose.model('Ads', AdSchema)


const AdValidate = (obj) => {
    const schema = joi.object({
        text: joi.string(),
        category: joi.string().required()
    })
    return schema.validate(obj);
}   

module.exports = {Ads, AdValidate}