const { getAd, newAd, getAllAds, deleteAd } = require('../Controllers/AdController')
const express = require('express')
const route = express.Router()
const photoUpload = require('../middlewares/uploadPhoto')
const { verifyToken, verifyAdmin } = require('../middlewares/verifyToken')

route.route('/')
    .get(getAllAds)
    .post(verifyToken, verifyAdmin, photoUpload.fields([{ name: 'image', maxCount: 3 }]), newAd)

route.route('/:id')
    .get(getAd)
    .delete(verifyToken, verifyAdmin, deleteAd)

module.exports = route