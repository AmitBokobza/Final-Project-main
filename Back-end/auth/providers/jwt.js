const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY

const generateToken = (user) => {
    const payload = {
        _id: user._id,
        isCook: user.isCook,
        isAdmin: user.isAdmin,
        email: user.email
    };

    const token = jwt.sign(payload, SECRET_KEY);
    return token;
}

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
}

module.exports = {generateToken,verifyToken};