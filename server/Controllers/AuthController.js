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
    const users = await User.find()
    res.status(200).json(users)
})

/**
 * @desc get user by id
 * @route GET /api/auth/:id
 * @access Public
 */

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    res.status(200).json(user)
})


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
    // try {
    //     const userId = req.user._id
    //     const productId = req.params.id
    //     // Find user
    //     const user = await User.findById(userId);
    //     if (!user) return res.status(404).json({ message: 'User not found' });

    //     // Check if product exists
    //     const product = await Product.findById(productId);
    //     if (!product) return res.status(404).json({ message: 'Product not found' });

    //     // Check if product is already in favorites
    //     const index = user.favorites.indexOf(productId);

    //     if (index === -1) {
    //         // Add to favorites
    //         user.favorites.push(productId);
    //         await user.save();
    //         return res.status(200).json({ message: 'Added to favorites'});
    //     } else {
    //         // Remove from favorites
    //         user.favorites.splice(index, 1);
    //         await user.save();
    //         return res.status(200).json({ message: 'Removed from favorites'});
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ message: 'Server error' });
    // }
    let product = await Product.findById(req.params.id)
    if(!product){
        return res.status(404).json({message : "Product Not Found"})
    }
    let user =  await User.findById(req.user._id)
    if(user.favorites.includes(product._id)){
        user.favorites.pull(product._id)
        await user.save()
        res.status(200).json({message : "Removed from favorites"})
    }else{
        user.favorites.push(product._id)
        await user.save()
        res.status(200).json({message : "Added to favorites"})
    }
});

module.exports = {DeleteUser , toggleFavorite, LoginUser , RegisterNewUser , getAllUsers , getUserById}

    // const isPostLikedByUser = post.likes.find(
    //     (user) => user.toString() === req.user._id
    // )
    // if (isPostLikedByUser) {
    //     post = await Post.findByIdAndUpdate(req.params.id, {
    //         $pull: { likes: req.user._id },
    //     } , {new : true}) 
    // }
    // else {
    //     post = await Post.findByIdAndUpdate(req.params.id, {
    //         $push: { likes: req.user._id },
    //     }, { new : true })
    // }
    // res.status(200).json(post)