const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  menu: [{}],
});

module.exports = mongoose.model("Menu", menuSchema);
