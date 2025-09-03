const { getDiscount, newDiscount } = require("../Controllers/DiscountController")
const express = require('express')
const route = express.Router()
route.route("/")
    .get(getDiscount)
    .post(newDiscount)

module.exports = route