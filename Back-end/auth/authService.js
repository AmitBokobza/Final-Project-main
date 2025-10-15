const { createError, handleError } = require("../utils/errorHandler");
const { verifyToken } = require("./providers/jwt");
require("dotenv").config();

const TOKEN_GENERATOR = process.env.TOKEN_GENERATOR;

const auth = (req,res,next) => {
    if(TOKEN_GENERATOR === "JWT"){
        try {
            const tokenFromClient = req.header("token");

            if (!tokenFromClient){
                throw createError("Authentication", "Please LogIn", 401)
            }

            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo){
                throw createError("Authentication", "Unauthorized user", 403)
            }

            req.user = userInfo;
            return next();
        } catch (error) {
            return handleError(res, error.status, error.message)
        }
    }

    return handleError(res, 500, "Server Authentication Error");   
}

module.exports = auth;