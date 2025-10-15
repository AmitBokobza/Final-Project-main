const express = require("express");
const auth = require("../../auth/authService");
const { createError, handleError } = require("../../utils/errorHandler");
const recipeValidation = require("../validation/recipeValidationService");
const normalizeRecipe = require("../helpers/normalizeRecipe");
const {
  createRecipe,
  getAllRecipes,
  getMyRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  likeRecipe,
} = require("./recipesDataServices");
const router = express.Router();

//create new recipe
router.post("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const recipe = req.body;
    if (!userInfo.isCook) {
      throw createError(
        "Authorization",
        "Only Cook type user can creat a recipe",
        403
      );
    }

    const validationMessage = recipeValidation(recipe);
    if (validationMessage !== "") {
      throw createError("Validation", validationMessage, 400);
    }

    let normalizedRecipe = await normalizeRecipe(
      recipe,
      userInfo._id,
      userInfo.email
    );
    console.log(normalizedRecipe);

    let createdRecipe = await createRecipe(normalizedRecipe);
    res.status(201).send(createdRecipe);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

//get all recipes
router.get("/", async (req, res) => {
  try {
    let allRecipes = await getAllRecipes();
    res.status(200).send(allRecipes);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

//get my recipes
router.get("/my-recipes", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isCook) {
      throw createError(
        "Authorization",
        "Only Cook type user can retrieve recipes",
        403
      );
    }

    let myRecipes = await getMyRecipes(userInfo._id);
    res.status(200).send(myRecipes);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

//get recipe by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipeById(id);
    res.status(200).send(recipe);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

//update recipe
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.user;
    const originalRecipe = await getRecipeById(id);
    const recipe = req.body;

    if (!userInfo.isAdmin && userInfo._id != originalRecipe.user_id) {
      throw createError(
        "Authorization",
        "Only the recipe owner and admin can update recipe",
        403
      );
    }

    const validationMessage = recipeValidation(recipe);
    if (validationMessage !== "") {
      throw createError("Validation", validationMessage, 400);
    }

    let normalizedRecipe = await normalizeRecipe(
      recipe,
      userInfo._id,
      userInfo.email
    );
    let card = await updateRecipe(id, normalizedRecipe);
    res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

//delete recipe
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.user;
    const originalRecipe = await getRecipeById(id);

    if (!userInfo.isAdmin && userInfo._id != originalRecipe.user_id) {
      return createError(
        "Authorization",
        "Only the card creator or admin can delete card",
        403
      );
    }

    let card = await deleteRecipe(id);
    res.status(200).send(card)
  } catch (error) {
    return handleError(res, error.status,error.message)
  }
});


//like recipe
router.patch("/:id", auth, async (req,res) => {
    try {
        const {id} = req.params;
        const userInfo = req.user;

        let card = await likeRecipe(id, userInfo._id);
        res.status(200).send(card)
    } catch (error) {
        return handleError(res, error.status, error.message)
    }
})
module.exports = router;
