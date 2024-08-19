import { useEffect, useState } from "react";
import Popup from "./Popup";
import { makeMenu } from "../assets/randommeals";

export default function NewMenu(props) {
  const { close, generateMenu, daysOfWeek, recipeList } = props;

  // Set up default menu, left blank for useEffect Hook.
  const [tempMeals, setTempMeals] = useState([]);

  // Generate random menu from user recipes
  function handleGenerateMenu() {
    const mealArr = makeMenu(recipeList);
    setTempMeals(mealArr);
  }

  // Save generation to user profile when they confirm
  function handleKeepMenu() {
    generateMenu(tempMeals);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  // Set tempMeals on load with random generation
  useEffect(() => {
    handleGenerateMenu();
  }, []);

  return (
    <>
      <Popup close={close}>
        <h1>How&apos;s this sound?</h1>
        <div className="w-80 flex align gap">
          {tempMeals.map((meal, dayIndex) => {
            return (
              <div className="dayCreate w-80 flex" key={dayIndex}>
                <h3>{daysOfWeek[meal.id]}</h3>
                <div className="dayMeals flex row">
                  <h5>{meal.breakfast}</h5>
                  <h5>{meal.lunch}</h5>
                  <h5>{meal.dinner}</h5>
                </div>
              </div>
            );
          })}
        </div>

        <div className="popupOptionBtns flex row gap">
          <button
            className="btn select"
            onClick={() => {
              handleKeepMenu();
              props.close();
            }}
          >
            <p>CONFIRM MENU</p>
          </button>
          <button className="btn warning" onClick={handleGenerateMenu}>
            <p>REDO</p>
          </button>
        </div>
      </Popup>
    </>
  );
}
NewMenu.propTypes;
