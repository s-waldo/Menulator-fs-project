import express, { NextFunction, Request, Response } from "express"
import {
  Ingredient,
  Recipe,
  RecipeIngredients,
  setTestData,
} from "../db/recipesModel"
import { sequelize } from "../db/db.config"
const router = express.Router()
// const Recipe = require("../models/user_recipes");

router.post("/test-reset", async (req: Request, res: Response, next: NextFunction) => {
  await setTestData()
  res.sendStatus(201)
})
// // Get ALL user recipes
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeList = await Recipe.findAll({
      include: { model: Ingredient, attributes: ["name"] },
    })
    res.json(recipeList)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})

// // Get one user recipe
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const recipe = await Recipe.findByPk(req.params.id, {include: Ingredient})
  if (!recipe) {
    res.sendStatus(404)
    return
  }
  res.json(recipe)
});

// // Create one
router.post("/add", async (req: Request, res: Response) => {
  const [recipe] = await Recipe.findOrCreate({
    where: { name: req.body.name },
    defaults: {
      name: req.body.name,
      steps: req.body.steps.join("|"),
      image: req.body.image || "",
      video: req.body.image || "",
    },
  })
  for (const ingredient of req.body.ingredients) {
    const [ing] = await Ingredient.findOrCreate({
      where: {name: ingredient.name}
    })
    await recipe.addIngredient(ing, {
      through: {quantity: ingredient.quantity}
    })
  }

  res.sendStatus(201)
})

// // Update one
// router.put("/:id", async (req, res) => {
//   let upid = req.params.id;
//   let upRecipes = req.body.recipes;
//   await Recipe.findOneAndUpdate(
//     { user_id: upid },
//     { $set: { recipes: upRecipes } },
//     { new: true }
//   );
// });

// // Delete one
// router.delete("/:id", async (req, res) => {
//   try {
//     await Recipe.findOneAndDelete({ user_id: req.params.id });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// async function getRecipe(req, res, next) {
//   let userRecipes;
//   try {
//     userRecipes = await Recipe.find({
//       user_id: req.params.id,
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
//   res.recipes = userRecipes;
//   next();
// }

export default router
