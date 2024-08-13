const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: [true, "Email required!"],
  },
  password: {
    type: String,
    required: [true, "Password required!"],
  },
  avatar: {
    type: String,
    required: false,
    default: "menulator_avatars/e9n1nkwqnvfbvtclybmr",
  },
  recipes: {
    type: Map,
    of: Array,
    required: false,
  },
  joinDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", userSchema);
