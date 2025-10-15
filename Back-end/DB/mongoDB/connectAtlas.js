const mongoose = require("mongoose");
require("dotenv").config();

const MONG_ATLAS_URI = process.env.MONG_ATLAS_URI;

const connectAtlas = async () => {
    try {
        await mongoose.connect(MONG_ATLAS_URI);
        console.log("Connected to Atlas");
        
    } catch (error) {
        console.error("could not connect to Atlas", error.message)
    }
}

module.exports = connectAtlas;