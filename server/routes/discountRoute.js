const { getDiscount, newDiscount } = require("../Controllers/DiscountController")
const express = require('express')
const route = express.Router()
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken')

route.route("/")
    .get(getDiscount)
    .post(verifyToken, verifyAdmin, newDiscount)

module.exports = route