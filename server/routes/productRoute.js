const { getAllProduct, getProduct, deleteProduct, NewProduct } = require('../Controllers/ProductController')
const express = require('express')
const route = express.Router()
const photoUpload = require('../middlewares/uploadPhoto')
route.route('/')
    .get(getAllProduct)
    .post(photoUpload.fields([{ name: 'image', maxCount: 1 }]), NewProduct)

route.route('/:id')
    .get(getProduct)
    .delete(deleteProduct)

module.exports = route