import "dotenv/config"
import express from "express"
import cors from "cors"
// import stripeRouter from "./routes/stripe"
// import menuRouter from "./routes/menu"
// import recipeRouter from "./routes/recipes"
import userRouter from "./routes/user"
// import foodRouter from "./routes/food"

const app = express()

app.use(express.json({ limit: "20mb" }))
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
)

// app.use("/create-checkout-session", stripeRouter);
// app.use("/recipes", recipeRouter);
// app.use("/menu", menuRouter);
app.use("/users", userRouter)
// app.use("/food", foodRouter);

app.listen(3000, () => console.log("Server started!"))
