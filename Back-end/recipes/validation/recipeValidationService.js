const recipeValidate = require("./Joi/recipeValidation");
require("dotenv").config();
const VALIDATOR = process.env.VALIDATOR

const recipeValidation = (recipe) => {
    if (VALIDATOR === "JOI"){
        const {error} = recipeValidate(recipe);
        if (error) return error.details.map(detail => detail.message);

        return "";
    }
}

module.exports = recipeValidation;