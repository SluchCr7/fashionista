const authService = require('../services/authService');
const { User, UserLogin, UserValidate } = require('../models/User');
const { Product } = require('../models/Product');
const asyncHandler = require('express-async-handler');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

/**
 * @desc Register New User
 * @route POST /api/auth/register
 * @access Public
 */
const RegisterNewUser = asyncHandler(async (req, res) => {
  const { error } = UserValidate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }

  const user = await authService.registerUser(req.body);
  return successResponse(res, "User Created Successfully", { userId: user._id }, 201);
});

/**
 * @desc Login
 * @route POST /api/auth/login
 * @access Public
 */
const LoginUser = asyncHandler(async (req, res) => {
  const { error } = UserLogin(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }

  try {
    const userData = await authService.loginUser(req.body.email, req.body.password);
    return successResponse(res, "Login successful", userData);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
});

/**
 * @desc get All Users
 * @route GET /api/auth
 * @access Private (Admin)
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("-password")
    .populate({
      path: "favorites",
      select: "name price Photo category"
    });

  return successResponse(res, "Users fetched successfully", { users });
});

/**
 * @desc get user by id
 * @route GET /api/auth/:id
 * @access Private (Self/Admin)
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("favorites");

  if (!user) {
    return errorResponse(res, "User Not Found", 404);
  }

  return successResponse(res, "User details fetched", { user });
});

/**
 * @desc delete User
 * @route DELETE /api/auth/:id
 * @access Private (Self/Admin)
 */
const DeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return errorResponse(res, "User Not Found", 404);
  }

  await User.findByIdAndDelete(req.params.id);
  return successResponse(res, "User Deleted Successfully");
});

/**
 * @desc Toggle Favorite Product
 * @route POST /api/auth/favorite/:id
 * @access Private
 */
const toggleFavorite = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const user = await User.findById(req.user._id);

  if (!user) {
    return errorResponse(res, "User not found", 404);
  }

  const product = await Product.findById(productId);
  if (!product) {
    return errorResponse(res, "Product not found", 404);
  }

  const isFavorite = user.favorites.includes(productId);

  if (isFavorite) {
    user.favorites.pull(productId);
    await user.save();
    return successResponse(res, "Removed from favorites", { isFavorite: false });
  } else {
    user.favorites.push(productId);
    await user.save();
    return successResponse(res, "Added to favorites", { isFavorite: true, product });
  }
});

const refreshToken = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) return errorResponse(res, "Refresh token required", 401);

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key');
    const user = await User.findById(decoded._id);
    if (!user) return errorResponse(res, "User not found", 401);

    const tokens = authService.generateTokens(user);
    return successResponse(res, "Token refreshed", tokens);
  } catch (err) {
    return errorResponse(res, "Invalid refresh token", 401);
  }
});

module.exports = {
  DeleteUser,
  toggleFavorite,
  LoginUser,
  RegisterNewUser,
  getAllUsers,
  getUserById,
  refreshToken
};
