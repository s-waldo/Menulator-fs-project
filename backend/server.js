require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const stripeRouter = require("./routes/stripe");
const menuRouter = require("./routes/menu");
const recipeRouter = require("./routes/recipes");
const userRouter = require("./routes/user");
const foodRouter = require("./routes/food");

app.use(express.json({ limit: "20mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/create-checkout-session", stripeRouter);
app.use("/recipes", recipeRouter);
app.use("/menu", menuRouter);
app.use("/users", userRouter);
app.use("/food", foodRouter);

app.listen(3000, console.log("Server started!"));
