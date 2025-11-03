const {User , UserLogin , UserUpdateValidate , UserValidate } = require('../models/User')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Product} = require('../models/Product')
/**
 * @desc Register New User
 * @route POST /api/auth/register
 * @access Public
 */

const RegisterNewUser = asyncHandler(async (req, res) => {
    const { error } = UserValidate(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) return res.status(400).send("User already exists");
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })
    await user.save()
    res.status(201).json({ message: "User Created Successfully" });
})

/**
 * @desc Login
 * @route GET /api/auth/login
 * @access Public
 */

const LoginUser = asyncHandler(async (req, res) => {
    const { error } = UserLogin(req.body)
    if (error) {
        res.status(400).json({message : error.details[0].message})
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).json({message : "Email or Password are not Correct"})
    }
    const validPassword = await bcrypt.compare(req.body.password , user.password)
    if (!validPassword) {
        return res.status(400).send("Invalid email or password");
    }
    const token = jwt.sign({ _id: user._id , isAdmain: user.isAdmin }, process.env.TOKEN_SECRET);
    const { password, ...others } = user._doc
    res.send({ ...others, token });
})

/**
 * @desc get All Users
 * @route GET /api/auth
 * @access Public
 */

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate({
    path: "orders",
    populate: [
      {
        path: "user",
        model: "User",
        select: "ProfileName profilePhoto name",
      },
      {
        path: "Products",
        model: "Product",
        select: "Photo name description price gender",
      },
    ],
  }).populate({
      path: "favorites",
      model: "Product",
      select: "Photo name description price category gender material",
    });

  res.status(200).json(users);
});

/**
 * @desc get user by id
 * @route GET /api/auth/:id
 * @access Public
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate({
      path: "orders",
      populate: [
        {
          path: "user",
          model: "User",
          select: "ProfileName profilePhoto name",
        },
        {
          path: "Products", // ✅ نفس الحرف الكبير كما في OrderSchema
          model: "Product",
          select: "Photo name description price gender category",
        },
      ],
    })
    .populate({
      path: "favorites",
      model: "Product",
      select: "Photo name description price category gender material",
    });

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json(user);
});




/**
 * @desc delete User
 * @route DELETE /api/auth/:id
 * @access Public
 */

const DeleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "User Deleted Successfully"})
})

const toggleFavorite = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const isFavorite = user.favorites.includes(productId);

  if (isFavorite) {
    user.favorites.pull(productId);
    await user.save();
    return res.status(200).json({
      message: "Removed from favorites",
      isFavorite: false,
      favoritesCount: user.favorites.length
    });
  } else {
    user.favorites.push(productId);
    await user.save();
    return res.status(200).json({
      message: "Added to favorites",
      isFavorite: true,
      favoritesCount: user.favorites.length
    });
  }
});


module.exports = {DeleteUser , toggleFavorite, LoginUser , RegisterNewUser , getAllUsers , getUserById}
