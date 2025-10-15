const _ = require("lodash");
const Recipe = require("../models/mongoDB/Recipe");
const { createError } = require("../../utils/errorHandler");

const generateRecipeNumber = async () => {
  let recipeCount = Recipe.countDocuments();
  if (recipeCount === 8_999_999) {
    throw createError(
      "Mongoose",
      "The app reached the maximum recipes amount",
      409
    );
  }

  let random;
 
  do {
    random = _.random(1_000_000, 9_000_000);
  } while (await isRecipeNumExist(random))

    return random;
};

const isRecipeNumExist = async (recipeNum) => {
    try {
        const recipeWithThisNum = await Recipe.findOne({recipeNum})
        return Boolean(recipeWithThisNum);
    } catch (error) {
        throw createError("Mongoose", error.message, error.status)
    }
};

module.exports = generateRecipeNumber;