const { RegisterNewUser, LoginUser, getAllUsers, getUserById, DeleteUser, toggleFavorite, refreshToken, forgotPassword, resetPassword, updateUser } = require('../Controllers/AuthController')
const express = require('express')
const route = express.Router()
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken")

route.route('/register').post(RegisterNewUser)
route.route('/login').post(LoginUser)
route.route('/refresh').post(refreshToken)
route.route('/forgot-password').post(forgotPassword)
route.route('/reset-password').post(resetPassword)
route.route('/profile/update').put(verifyToken, updateUser)

route.route('/:id')
    .delete(verifyToken, DeleteUser)
    .get(verifyToken, getUserById)
route.route("/").get(verifyToken, verifyAdmin, getAllUsers)
route.route('/favorite/:id')
    .post(verifyToken, toggleFavorite)

module.exports = route
