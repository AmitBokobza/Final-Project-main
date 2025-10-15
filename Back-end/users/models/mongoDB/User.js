const mongoose = require("mongoose");
const NAME = require("../../../helpers/mongoDB/Name");
const { PHONE, EMAIL, PASSWORD } = require("../../../helpers/mongoDB/mongooseValidators");
const IMAGE = require("../../../helpers/mongoDB/Image");
const ADDRESS = require("../../../helpers/mongoDB/Address");

const userSchema = new mongoose.Schema({
    name: NAME,
    phone: PHONE,
    email: EMAIL,
    password: PASSWORD,
    image: IMAGE,
    address: ADDRESS,
    isCook: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("user", userSchema);

module.exports = User;