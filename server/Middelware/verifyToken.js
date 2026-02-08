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
            return res.status(401).json({ message: "Invalid token" })
        }
    } else {
        return res.status(401).json({ message: "No token provided" })
    }
}

const verifyAdmain = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Access denied. Administrative privileges required." });
        }
    });
}

const verifyTokenAndAdmin = verifyAdmain; // Alias for convenience as used in orderRoute

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Access denied. You can only manage your own account." });
        }
    });
}

const verifyAdmainUser = verifyUser; // Alias or similar logic

module.exports = {
    verifyToken,
    verifyAdmain,
    verifyTokenAndAdmin,
    verifyUser,
    verifyAdmainUser
}