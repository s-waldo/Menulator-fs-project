const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  recipes: {
    type: Map,
    of: Array,
  },
});

module.exports = mongoose.model("Recipes", recipeSchema);
