const { getAd, newAd, getAllAds, deleteAd } = require('../Controllers/AdController')
const express = require('express')
const route = express.Router()
const photoUpload = require('../middlewares/uploadPhoto')

route.route('/')
    .get(getAllAds)
    .post(photoUpload.fields([{ name: 'image', maxCount: 3 }]), newAd)

route.route('/:id')
    .get(getAd)
    .delete(deleteAd)

module.exports = route