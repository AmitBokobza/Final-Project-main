const { createError } = require("../../utils/errorHandler");
const Recipe = require("../models/mongoDB/Recipe")

// Create Recipe
const createRecipe = async (newRecipe) => {
    try {
        let recipe = new Recipe(newRecipe);
        recipe = await recipe.save();
        return recipe;
    } catch (error) {
        throw createError("Mongoose", error.message, error.status)
    }
};

// Get recipes
const getAllRecipes = async () => {
    try {
        const recipes = await Recipe.find();
        return recipes;
    } catch (error) {
        throw createError("Mongoose", error.message, error.status)
    }
};


//get recipe by id
const getRecipeById = async (recipeId) => {
    try {
        let recipe = await Recipe.findById(recipeId);
        return recipe;
    } catch (error) {
        throw createError("Mongoose", error.message, error.status)
    }
};

//get my recipes
const getMyRecipes = async (userId) => {
    try {
        let myRecipes = await Recipe.find({user_id: userId});
        return myRecipes;
    } catch (error) {
        throw createError("Mongoose", error.message, error.status)
    }
}


//update recipe
const updateRecipe = async (recipeId, updatedRecipe) => {
    try {
        let recipe = await Recipe.findByIdAndUpdate(recipeId, updatedRecipe);
        return recipe;
    } catch (error) {
        throw createError("Mongoose", error.message, error.status)
    }
}


//delete recipe
const deleteRecipe = async (recipeId) => {
    try {
        let recipe = await Recipe.findByIdAndDelete(recipeId);
        return recipe;
    } catch (error) {
        throw createError("Mongoose", error.message, error.status)
    }
};


//like recipe
const likeRecipe = async (recipeId, userId) => {
    try {
        let recipe = await Recipe.findById(recipeId);
        if (!recipe){
            throw createError("Mongoose", "cannot find recipe with this id")
        }

        if (recipe.likes.includes(userId)){
            let newLikes = recipe.likes.filter((id) => id != userId);
            recipe.likes = newLikes;
        } else {
            recipe.likes.push(userId)
        }

        await recipe.save();
        return recipe;
    } catch (error) {
        throw createError("Mongoose", error.message, error.status)
    }
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    getMyRecipes,
    updateRecipe,
    deleteRecipe,
    likeRecipe
};