import React from "react";

export default function RecipeDiv(props) {
  const { meal, recipes, handleAddRecipe, recipeList } = props;

  // Delete item from meal list if user doesn't want it anymore.
  function handleDeleteRecipe(index) {
    // Check if meal is in breakfast.
    if (meal == "Breakfast") {
      
      // Filter new list if key does not match index of delete button
      const newMealList = recipes.filter((recipe, recipeIndex) => {
        return recipeIndex !== index
      })
      
      // Update recipe list
      handleAddRecipe({
        ...recipeList,
        breakfast: newMealList
      })
    }
    // Check if meal is in lunch.
    else if (meal == "Lunch") {
      const newMealList = recipes.filter((recipe, recipeIndex) => {
        return recipeIndex !== index
      })
      handleAddRecipe({
        ...recipeList,
        lunch: newMealList
      })
    } 
    
    else if (meal == "Dinner") {
      const newMealList = recipes.filter((recipe, recipeIndex) => {
        return recipeIndex !== index
      })
      handleAddRecipe({
        ...recipeList,
        dinner: newMealList
      })
    }
    else {
      const newMealList = recipes.filter((recipe, recipeIndex) => {
        return recipeIndex !== index
      })
      handleAddRecipe({
        ...recipeList,
        side: newMealList
      })
    }
  }
  return (
    <div className="recipeSub">
      <h1>{meal}</h1>
      <div className="recipeScroll">
        {recipes != undefined ? recipes.map((food, foodIndex) => {
          return (
            <div className="recipe flex row align" key={foodIndex}>
              <p>{food}</p>
              <span>
                <button 
                  onClick={() => {
                    handleDeleteRecipe(foodIndex)
                }}>
                  <i className="delete fa-solid fa-trash-can"></i>
                </button>
              </span>
            </div>)
        })
      : <div></div>}
      </div>
    </div>
  );
}
