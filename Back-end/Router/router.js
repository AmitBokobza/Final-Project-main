const express = require("express");
const userRouter = require("../users/Routes/userRestController");
const recipeRouter = require("../recipes/Routes/recipesRestController");
const router = express.Router();

router.use("/users", userRouter);
router.use("/recipes", recipeRouter);

router.use((req,res) => {
    return res.status(404).send("Path not Found!")
})

module.exports = router