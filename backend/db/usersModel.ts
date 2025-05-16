import { sequelize } from "./db.config"
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize"

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>
  declare name: string
  declare emailAddress: string
  declare password: string
  declare avatar: CreationOptional<string>
}

User.init(
  {
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
      type: DataTypes.STRING(2048),
      defaultValue: "menulator_avatars/e9n1nkwqnvfbvtclybmr",
    },
  },
  { sequelize }
)

// module.exports = mongoose.model("Users", userSchema)
