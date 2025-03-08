const { RegisterNewUser, LoginUser, getAllUsers, getUserById, DeleteUser, toggleFavorite } = require('../Controllers/AuthController')
const route = require('express').Router()


route.route('/register')
    .post(RegisterNewUser) 
route.route('/login')
    .post(LoginUser)
route.route('/:id')
    .delete(DeleteUser)
    .get(getUserById)
route.route("/")
    .get(getAllUsers)
route.route('/favorite')
    .post(toggleFavorite)
module.exports = route