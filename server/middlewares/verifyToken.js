const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseFormatter");

/**
 * @desc Verify JWT Token
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return errorResponse(res, "Invalid token. Please log in again.", 401);
        }
    } else {
        return errorResponse(res, "No token provided. Authorization denied.", 401);
    }
};

/**
 * @desc Verify Admin privileges
 */
const verifyAdmain = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            return errorResponse(res, "Access denied. Administrative privileges required.", 403);
        }
    });
};

const verifyTokenAndAdmin = verifyAdmain;

/**
 * @desc Verify User is owner or Admin
 */
const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && (req.user._id === req.params.id || req.user.isAdmin)) {
            next();
        } else {
            return errorResponse(res, "Access denied. You can only manage your own account.", 403);
        }
    });
};

const verifyAdmainUser = verifyUser;

module.exports = {
    verifyToken,
    verifyAdmain,
    verifyTokenAndAdmin,
    verifyUser,
    verifyAdmainUser
}