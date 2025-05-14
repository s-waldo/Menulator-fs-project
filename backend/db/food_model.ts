const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  main_course: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Food", foodSchema);
