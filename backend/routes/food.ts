const express = require("express");
const router = express.Router();
const Food = require("../models/food_model");

// Get list of all foods
router.get("/", async (req, res) => {
  try {
    let foodList = await Food.find();
    res.json(foodList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a food
router.post("/", async (req, res) => {
    const food = new Food({
        name: req.body.name,
        main_course: req.body.main_course
    })

    try {
        const newFood = await food.save()
        res.status(201).json(newFood)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

module.exports = router;
