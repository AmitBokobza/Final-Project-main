const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
  PHONE,
  EMAIL,
  URL,
} = require("../../../helpers/mongoDB/mongooseValidators");
const IMAGE = require("../../../helpers/mongoDB/Image");
const { max } = require("lodash");

const recipeSchema = new mongoose.Schema({
  title: DEFAULT_VALIDATION,
  subtitle: DEFAULT_VALIDATION,
  description: { ...DEFAULT_VALIDATION, maxLength: 1024 },
  email: { ...EMAIL, unique: false },
  web: URL,
  image: IMAGE,
  recipeNum: {
    type: Number,
    required: true,
    min: 1000000,
    max: 9999999,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
