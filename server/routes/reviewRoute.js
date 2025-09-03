const { AddNewReview, getAllReviews, getReview, deleteReview } = require('../Controllers/ReviewController')
const express = require('express')
const route = express.Router()
const {verifyToken , verifyAdmain} = require("../Middelware/verifyToken")

route.route('/')
    .get(getAllReviews)
    .post(verifyToken , AddNewReview)

route.route('/:id') 
    .get(getReview)
    .delete(deleteReview)

module.exports = route