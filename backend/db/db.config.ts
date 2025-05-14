import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
})

async function connectDb() {
  try {
    await sequelize.authenticate()
    console.log("Database connection has been established successfully.")
  } catch (error) {
    console.error("Can't connect to database:", error)
  }
}

connectDb()
