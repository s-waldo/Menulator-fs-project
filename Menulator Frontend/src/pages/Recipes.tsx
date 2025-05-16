import { useState } from "react";
import RecipeDiv from "../componenets/RecipeDiv";
import AddRecipeForm from "../componenets/AddRecipeForm";

export default function Recipes(props) {
  const { recipeList, handleAddRecipe } = props;

  // Toggle add recipe menu
  const [showAddRecipe, setShowAddRecipe] = useState(false);

  function addRecipeBtn() {
    setShowAddRecipe(!showAddRecipe);
  }

  return (
    <div className="container recipeContainer">
      <div className="menuDiv flex align gap">
        <div className="pageTitle flex row justify-b">
          <h1>
            MY <span>RECIPES</span>
          </h1>
          <button className="btn select" onClick={addRecipeBtn}>
            <p>
              ADD <strong>RECIPE</strong>
            </p>
          </button>
        </div>
        <h2>Main Dishes</h2>
        {recipeList ? (
          <>
            <div className="recipes flex row">
              <RecipeDiv
                meal="Breakfast"
                recipes={recipeList.breakfast}
                {...props}
              />
              <RecipeDiv meal="Lunch" recipes={recipeList.lunch} {...props} />
              <RecipeDiv meal="Dinner" recipes={recipeList.dinner} {...props} />
            </div>
            <br />
            <h2>Other</h2>
            <div className="recipes flex row">
              <RecipeDiv
                meal="Side Dishes"
                recipes={recipeList.side}
                {...props}
              />
            </div>
          </>
        ) : (
          <h1>No recipes to Show</h1>
        )}
        {showAddRecipe && (
          <AddRecipeForm
            close={addRecipeBtn}
            handleAddRecipe={handleAddRecipe}
            recipes={recipeList}
          />
        )}
      </div>
    </div>
  );
}
Recipes.propTypes;
