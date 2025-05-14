import { sequelize } from "./db.config"
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize"

interface UserAttributes extends Model<InferAttributes<UserAttributes>, InferCreationAttributes<UserAttributes>> {
  id: CreationOptional<string>
  name: string
  emailAddress: string
  password: string
  avatar: CreationOptional<string>
}

export const User = sequelize.define<UserAttributes>("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "menulator_avatars/e9n1nkwqnvfbvtclybmr",
  },
})

const sync = async () => sequelize.sync()

sync()

// module.exports = mongoose.model("Users", userSchema)
