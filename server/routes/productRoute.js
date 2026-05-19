const { getAllProduct, getProduct, deleteProduct, NewProduct, updateProduct } = require('../Controllers/ProductController')
const express = require('express')
const route = express.Router()
const photoUpload = require('../middlewares/uploadPhoto')
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken')

route.route('/')
    .get(getAllProduct)
    .post(verifyTokenAndAdmin, photoUpload.fields([{ name: 'image', maxCount: 5 }]), NewProduct)

route.route('/:id')
    .get(getProduct)
    .put(verifyTokenAndAdmin, photoUpload.fields([{ name: 'image', maxCount: 5 }]), updateProduct)
    .delete(verifyTokenAndAdmin, deleteProduct)

module.exports = route