const express = require("express");
const router = express.Router();
const Menu = require("../models/user_menu");

// Get ALL user recipes
router.get("/", async (req, res) => {
  try {
    const menuList = await Menu.find();
    res.json(menuList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get one user recipe
router.get("/:id", getMenu, (req, res) => {
  res.send(res.menu);
});

// Create one
router.post("/:id", async (req, res) => {
  const recipe = new Menu({
    user_id: req.params.id,
    menu: req.body.menu,
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
  let upMenu = req.body.menu;
  console.log(upMenu)
  await Menu.findOneAndUpdate(
    { user_id: upid },
    { menu: upMenu },
    { new: true }
  );
});

// Delete one
router.delete("/:id", async (req, res) => {
  try {
    await Menu.findOneAndDelete({ user_id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getMenu(req, res, next) {
  let userMenu;
  try {
    userMenu = await Menu.findOne({
      user_id: req.params.id,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  res.menu = userMenu;
  next();
}

module.exports = router;
