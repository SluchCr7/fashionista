const { deleteOrder, GetAllOrder, GetOrder, newOrder } = require('../Controllers/OrderController')
const express = require('express')
const route = express.Router()
const { verifyToken, verifyAdmain } = require("../Middelware/verifyToken")

route.route('/')
    .get(GetAllOrder)
    .post(verifyToken , newOrder)
route.route('/:id')
    .get(GetOrder)
    .delete(deleteOrder)

module.exports = route