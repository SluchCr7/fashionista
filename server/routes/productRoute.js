const { getAllProduct, getProduct, deleteProduct, NewProduct } = require('../Controllers/ProductController')
const route = require('express').Router()
const  photoUpload  = require('../Middelware/uploadPhoto')
route.route('/')
    .get(getAllProduct)
    .post(photoUpload.fields([{ name: 'image', maxCount: 1 }]), NewProduct)

route.route('/:id')
    .get(getProduct)
    .delete(deleteProduct)

module.exports = route