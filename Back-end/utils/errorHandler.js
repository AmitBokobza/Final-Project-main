const chalk = require("chalk");

const createError = (validator, message, status) => {
    const error = new Error(`${validator} Error: ${message}`)
    error.status = status || 400;
    throw error;
}

const handleError = (res, status, message = "") => {
    console.log(chalk.redBright(message));
    return res.status(status).send(message)
}

module.exports = {createError, handleError}