const generateRecipeNumber = require("./generateRecipeNum")

const normalizeRecipe = async (rawRecipe, userId, userEmail) => {
    return {
        ...rawRecipe,
        email: userEmail,
        image: {
            url: rawRecipe.image.url || "https://worldfoodtour.co.uk/wp-content/uploads/2013/06/neptune-placeholder-48.jpg",
            alt: rawRecipe.image.alt || `${rawRecipe.title} image`
        },
        recipeNum: rawRecipe.recipeNum || (await generateRecipeNumber()),
        user_id: rawRecipe.user_id || userId
    }
}

module.exports = normalizeRecipe;