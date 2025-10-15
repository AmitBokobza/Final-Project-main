const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("./mongooseValidators");

const ADDRESS = new mongoose.Schema({
    country: DEFAULT_VALIDATION,
    city: DEFAULT_VALIDATION,
    street:DEFAULT_VALIDATION
})

module.exports = ADDRESS;