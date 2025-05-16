import { sequelize } from "./db.config"
import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize"
import {
  dummyIngredientsArr,
  dummyRecipeIngredientsArr,
  dummyRecipesArr,
} from "./db.dummyData"

// Recipe Class for user Recipes
class Recipe extends Model<
  InferAttributes<Recipe>,
  InferCreationAttributes<Recipe>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare steps: CreationOptional<string>
  declare image: CreationOptional<string>
  declare video: CreationOptional<string>
  declare getIngredients: BelongsToManyGetAssociationsMixin<Ingredient> // Note the null assertions!
  declare addIngredient: BelongsToManyAddAssociationMixin<Ingredient, number>
  declare addIngredients: BelongsToManyAddAssociationsMixin<Ingredient, number>
  declare setIngredients: BelongsToManySetAssociationsMixin<Ingredient, number>
  declare removeIngredient: BelongsToManyRemoveAssociationMixin<
    Ingredient,
    number
  >
  declare removeIngredients: BelongsToManyRemoveAssociationsMixin<
    Ingredient,
    number
  >
  declare hasIngredient: BelongsToManyHasAssociationMixin<Ingredient, number>
  declare hasIngredients: BelongsToManyHasAssociationsMixin<Ingredient, number>
  declare countIngredients: BelongsToManyCountAssociationsMixin
  declare createIngredient: BelongsToManyCreateAssociationMixin<Ingredient>
}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steps: DataTypes.TEXT,
    image: DataTypes.STRING(2048),
    video: DataTypes.STRING(2048),
  },
  { sequelize }
)

// Ingredient Class for Recipe Ingredients
class Ingredient extends Model<
  InferAttributes<Ingredient>,
  InferCreationAttributes<Ingredient>
> {
  declare id: CreationOptional<number>
  declare name: string
}

Ingredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
)

// Join table for Ingredients and Quantities for Recipes
class RecipeIngredients extends Model<
  InferAttributes<RecipeIngredients>,
  InferCreationAttributes<RecipeIngredients>
> {
  declare id: CreationOptional<number>
  declare quantity: string
  declare RecipeId: ForeignKey<number>
  declare IngredientId: ForeignKey<number>
}

RecipeIngredients.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, timestamps: false }
)
Recipe.belongsToMany(Ingredient, { through: RecipeIngredients })
Ingredient.belongsToMany(Recipe, { through: RecipeIngredients })

async function setTestData() {
  await Recipe.bulkCreate(dummyRecipesArr)
  await Ingredient.bulkCreate(dummyIngredientsArr)
  await RecipeIngredients.bulkCreate(dummyRecipeIngredientsArr)
}

export { Recipe, Ingredient, RecipeIngredients, setTestData }
