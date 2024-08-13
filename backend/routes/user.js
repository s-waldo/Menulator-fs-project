const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { cloudinary } = require("../utils/cloudinary");

// Get all
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// Get one
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

// Create one
router.post("/", async (req, res) => {
  let existingUser;
  console.log(req.body);
  await User.findOne({ emailAddress: req.body.emailAddress })
    .then((data) => (existingUser = data))
    .catch((err) => res.status(500).json({ message: err.message }));
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    name: req.body.name,
    emailAddress: req.body.emailAddress,
    password: hashedPassword,
    recipes: req.body.recipes,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  let user;
  await User.find({ emailAddress: req.body.emailAddress })
    .then((data) => (user = data))
    .catch((error) => console.log(error));
  if (user == null) {
    return res.status(400).json({ message: "User does not exist" });
  }
  try {
    const pwResult = await bcrypt.compare(req.body.password, user[0].password);
    if (pwResult) {
      let { emailAddress, avatar, name, _id } = user[0];
      res.json({ _id, emailAddress, name, avatar });
    } else {
      res.status(401).send("not allowed");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update one
router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.emailAddress != null) {
    res.user.emailAddress = req.body.emailAddress;
  }
  try {
    const updatedUser = await res.user.save();
    let { emailAddress, avatar, name, _id } = updatedUser;
    res.json({ _id, emailAddress, name, avatar });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Change Password
router.patch("/password/:id", getUser, async (req, res) => {
  try {
    const pwResult = await bcrypt.compare(req.body.password, res.user.password);
    if (!pwResult) {
      res.status(401).json({ message: "Incorrect Password" });
      return
    }
    const newPassword = await bcrypt.hash(req.body.newPassword, 10);
    res.user.password = newPassword;
    await res.user.save();
    res.status(201).json({ message: "Password successfully changed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update one avatar
router.patch("/avatar/:id", getUser, async (req, res) => {
  try {
    const fileStr = req.body.avatar;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "menulator v2",
    });
    res.user.avatar = uploadedResponse.public_id;
  } catch (error) {
    console.error(error);
  }

  try {
    const updatedUser = await res.user.save();
    let { emailAddress, avatar, name, _id } = updatedUser;
    res.json({ _id, emailAddress, name, avatar });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted User" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}

module.exports = router;
exports.getUser = getUser;
