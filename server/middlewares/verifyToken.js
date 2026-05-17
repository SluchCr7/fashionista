const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid token" })
        }
    } else {
        return res.status(401).json({ success: false, message: "No token provided" })
    }
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ success: false, message: "Access denied. Administrative privileges required." });
        }
    });
}

const verifyTokenAndAdmin = verifyAdmin; // Alias for convenience as used in orderRoute

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        // Fix: Convert ObjectId to string for proper comparison
        if (req.user._id.toString() === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ success: false, message: "Access denied. You can only manage your own account." });
        }
    });
}

const verifyAdmainUser = verifyUser; // Alias or similar logic

module.exports = {
    verifyToken,
    verifyAdmin,
    verifyTokenAndAdmin: verifyAdmin,
    verifyUser,
    verifyAdmainUser: verifyUser
}