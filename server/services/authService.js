const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

    /**
     * @desc Forgot password logic
     */
    async forgotPassword(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("No account registered with this email address");
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        return resetToken;
    }

    /**
     * @desc Reset password logic
     */
    async resetPassword(token, newPassword) {
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            throw new Error("Recovery link is invalid or has expired");
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.passwordResetToken = null;
        user.passwordResetExpires = null;
        await user.save();

        return user;
    }

    /**
     * @desc Update user profile details
     */
    async updateUserProfile(userId, updateData) {
        const { name, ProfileName, email } = updateData;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        if (email && email !== user.email) {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                throw new Error("Email address is already in use by another account");
            }
            user.email = email;
        }

        if (name) user.name = name;
        if (ProfileName) user.ProfileName = ProfileName;

        await user.save();
        const { password, ...updatedUser } = user._doc;
        return updatedUser;
    }
}

module.exports = new AuthService();
