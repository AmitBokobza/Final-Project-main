const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_LOCAL_URI =  process.env.MONGO_LOCAL_URI

const connectLocal = async () => {
    try {
        await mongoose.connect(MONGO_LOCAL_URI);
        console.log("Connected to MongoDB locally");
        
    } catch (error) {
        console.error("Could not connect toe MongoDB locally", error.message)
    }
}

module.exports = connectLocal;