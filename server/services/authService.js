const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    /**
     * @desc Generate Access and Refresh Tokens
     */
    generateTokens(user) {
        const accessToken = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin },
            process.env.TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin },
            process.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key',
            { expiresIn: '7d' }
        );

        return { accessToken, refreshToken };
    }

    /**
     * @desc Register User logic
     */
    async registerUser(userData) {
        const { name, email, password } = userData;

        const userExist = await User.findOne({ email });
        if (userExist) {
            throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashPassword,
        });

        await user.save();
        return user;
    }

    /**
     * @desc Login User logic
     */
    async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Email or Password are not correct");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Email or Password are not correct");
        }

        const tokens = this.generateTokens(user);

        const { password: userPassword, ...userData } = user._doc;
        return { ...userData, ...tokens };
    }
}

module.exports = new AuthService();
