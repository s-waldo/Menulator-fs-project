import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import axios from "../../api/axios";

export default function AddRecipeForm(props) {
  const { handleAddRecipe, recipes } = props;

  // Form state management for checkboxes and input field
  const [recipeName, setRecipeName] = useState("");
  const [selectBreakfast, setSelectBreakfast] = useState(false);
  const [selectLunch, setSelectLunch] = useState(false);
  const [selectDinner, setSelectDinner] = useState(false);
  const [selectSide, setSelectSide] = useState(false);
  const [foodData, setFoodData] = useState([{ name: "yes" }]);

  function handleBreakfast() {
    setSelectBreakfast(!selectBreakfast);
  }
  function handleLunch() {
    setSelectLunch(!selectLunch);
  }
  function handleDinner() {
    setSelectDinner(!selectDinner);
  }
  function handleSide() {
    setSelectSide(!selectSide);
  }

  // Add recipe contingent upon which selection the user selected for meal type
  function addRecipeHelper() {
    let newBreakfast = [...recipes.breakfast];
    let newLunch = [...recipes.lunch];
    let newDinner = [...recipes.dinner];
    let newSide = [...recipes.side];
    // Push recipe to list copy if checkbox is selected
    if (selectBreakfast) {
      newBreakfast.push(recipeName);
    }
    if (selectLunch) {
      newLunch.push(recipeName);
    }
    if (selectDinner) {
      newDinner.push(recipeName);
    }
    if (selectSide) {
      newSide.push(recipeName);
    }

    // Save new recipe to user
    handleAddRecipe({
      breakfast: newBreakfast,
      lunch: newLunch,
      dinner: newDinner,
      side: newSide,
    });

    // Save recipe to API if new item for other users
    let isInList = false;
    for (let i = 0, n = foodData.length; i < n; i++) {
      if (foodData[i].name === recipeName) {
        isInList = true;
        break;
      }
    }

    if (!isInList) {
      postFood();
    }

    // Reset input field for confirmation
    setRecipeName("");
  }

  function recipeSelection(input) {
    setRecipeName(input);
  }
  async function postFood() {
    await axios
      .post(
        "/food",
        {
          name: recipeName,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .catch((err) => console.error(err));
  }
  async function getFood() {
    await axios
      .get("/food")
      .then((res) => setFoodData(res.data))
      .catch((err) => console.error(err));
  }
  useEffect(() => {
    getFood();
  }, [recipeName]);

  return (
    <Popup close={props.close}>
      <h1>Add Recipe</h1>
      <form action="" className="addRecipeForm flex gap">
        <h2>Recipe Name</h2>
        <div className="inputDiv">
          <input
            type="text"
            name="recipeName"
            id="recipeName"
            value={recipeName}
            onChange={(e) => {
              setRecipeName(e.target.value);
            }}
          />
          <div className="dropdown">
            {foodData
              .filter((item) => {
                const searchTerm = recipeName.toLowerCase();
                const fullName = item.name.toLowerCase();

                return (
                  searchTerm &&
                  fullName.includes(searchTerm) &&
                  fullName !== searchTerm
                );
              })
              .map((item, itemIndex) => {
                return (
                  <div
                    onClick={(e) => {
                      recipeSelection(e.currentTarget.textContent);
                    }}
                    className="dropdownRow"
                    key={itemIndex}
                  >
                    {item.name}
                  </div>
                );
              })}
          </div>
        </div>

        <br />
        <h2>Meal Type Preference</h2>
        <label htmlFor="breakfast">
          <input type="checkbox" id="breakfast" onChange={handleBreakfast} />{" "}
          Breakfast
        </label>
        <label htmlFor="lunch">
          <input type="checkbox" id="lunch" onChange={handleLunch} /> Lunch
        </label>
        <label htmlFor="dinner">
          <input type="checkbox" id="dinner" onChange={handleDinner} /> Dinner
        </label>
        <label htmlFor="side">
          <input type="checkbox" id="side" onChange={handleSide} /> Side
        </label>
      </form>
      <div className="flex row gap">
        <button className="btn select" onClick={addRecipeHelper}>
          <p>ADD RECIPE</p>
        </button>
        <button className="btn warning" onClick={props.close}>
          <p>CLOSE</p>
        </button>
      </div>
    </Popup>
  );
}
