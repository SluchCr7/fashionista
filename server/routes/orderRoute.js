const { deleteOrder, GetAllOrder, GetOrder, newOrder, updateOrderStatus } = require('../controllers/OrderController')
const express = require('express')
const route = express.Router()
const { verifyToken, verifyAdmain, verifyTokenAndAdmin } = require("../Middelware/verifyToken")

route.route('/')
    .get(verifyToken, GetAllOrder)
    .post(verifyToken, newOrder)

route.route('/:id')
    .get(verifyToken, GetOrder)
    .delete(verifyTokenAndAdmin, deleteOrder)

route.route('/:id/status')
    .patch(verifyTokenAndAdmin, updateOrderStatus)

module.exports = route