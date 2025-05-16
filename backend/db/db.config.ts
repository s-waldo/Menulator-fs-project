import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  retry: {
    match: [/SQLITE_BUSY/],
    name: "query",
    max: 5,
  },
})

async function connectDb() {
  try {
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")
  } catch (error) {
    console.error("Can't connect to database:", error)
  }
}

async function sync() {
  sequelize.sync({ force: true })
}
sync()
connectDb()
