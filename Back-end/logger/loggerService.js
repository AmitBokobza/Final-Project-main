const morganLogger = require("./morgan/morganLogger");
require("dotenv").config();
const LOGGER = process.env.LOGGER

const loggerService = () => {
    if (LOGGER === "MORGAN"){
        return morganLogger;
    }
}

module.exports = loggerService;