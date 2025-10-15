const connectAtlas = require("./mongoDB/connectAtlas");
const connectLocal = require("./mongoDB/connectLocal");
require("dotenv").config();
const ENVIRONMENT = process.env.ENVIRONMENT
const DB = process.env.DB

const connectToDB = async () => {
    if (DB === "MONGODB"){
        if (ENVIRONMENT === "development"){
            await connectLocal();
        }

        if (ENVIRONMENT === "production"){
            await connectAtlas();
        }
    }
}

module.exports = connectToDB;