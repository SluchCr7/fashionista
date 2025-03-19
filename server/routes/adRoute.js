const { getAd, newAd, getAllAds, deleteAd } = require('../Controllers/AdController')
const route = require('express').Router()
const  photoUpload  = require('../Middelware/uploadPhoto')

route.route('/')
    .get(getAllAds)
    .post(photoUpload.fields([{ name: 'image', maxCount: 3 }]), newAd)

route.route('/:id')
    .get(getAd)
    .delete(deleteAd)

module.exports = route