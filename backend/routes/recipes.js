const express = require("express");
const router = express.Router();
const Recipe = require("../models/user_recipes");

// Get ALL user recipes
router.get("/", async (req, res) => {
  try {
    const recipeList = await Recipe.find();
    res.json(recipeList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one user recipe
router.get("/:id", getRecipe, (req, res) => {
  res.send(res.recipes);
});

// Create one
router.post("/:id", async (req, res) => {
  const recipe = new Recipe({
    user_id: req.params.id,
    recipes: req.body.recipes,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one
router.put("/:id", async (req, res) => {
  let upid = req.params.id;
  let upRecipes = req.body.recipes;
  await Recipe.findOneAndUpdate(
    { user_id: upid },
    { $set: { recipes: upRecipes } },
    { new: true }
  );
});

// Delete one
router.delete("/:id", async (req, res) => {
  try {
    await Recipe.findOneAndDelete({ user_id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getRecipe(req, res, next) {
  let userRecipes;
  try {
    userRecipes = await Recipe.find({
      user_id: req.params.id,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  res.recipes = userRecipes;
  next();
}

module.exports = router;
