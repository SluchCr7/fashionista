const { getAllProduct, getProduct, deleteProduct, NewProduct, updateProduct } = require('../Controllers/ProductController')
const express = require('express')
const route = express.Router()
const photoUpload = require('../middlewares/uploadPhoto')
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken')

route.route('/')
    .get(getAllProduct)
    .post(verifyToken, verifyAdmin, photoUpload.fields([{ name: 'image', maxCount: 1 }]), NewProduct)

route.route('/:id')
    .get(getProduct)
    .delete(verifyToken, verifyAdmin, deleteProduct)
    .put(verifyToken, verifyAdmin, updateProduct)

module.exports = route