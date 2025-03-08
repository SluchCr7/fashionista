const mongoose = require('mongoose');
const joi = require('joi')

const OrderSchema = new mongoose.Schema({
    Products : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    address: {
        type: String,
        required : true
    },
    phoneNumber: {
        type: String,
        required : true
    },
    status: {
        type: String,
        default: "Pending"
    },
    total: {
        type: Number,
        required : true
    },
    user : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", OrderSchema)

const OrderValidate = (obj) => {
    const schema = joi.object({
        Products: joi.array().required(),
        address: joi.string().required(),
        phoneNumber: joi.string().required(),
        total: joi.number().required(),
    })
    return schema.validate(obj);
}

module.exports = {Order , OrderValidate}