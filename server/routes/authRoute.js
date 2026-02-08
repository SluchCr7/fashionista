const { RegisterNewUser, LoginUser, getAllUsers, getUserById, DeleteUser, toggleFavorite, refreshToken } = require('../Controllers/AuthController')
const express = require('express')
const route = express.Router()
const { verifyToken, verifyAdmain } = require("../middlewares/verifyToken")

route.route('/register').post(RegisterNewUser)
route.route('/login').post(LoginUser)
route.route('/refresh').post(refreshToken)
route.route('/:id')
    .delete(DeleteUser)
    .get(getUserById)
route.route("/").get(getAllUsers)
route.route('/favorite/:id')
    .post(verifyToken, toggleFavorite)

module.exports = route
