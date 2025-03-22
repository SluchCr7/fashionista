const { getDiscount, newDiscount } = require("../Controllers/DiscountController")
const route = require("express").Router()

route.route("/")
    .get(getDiscount)
    .post(newDiscount)

module.exports = route