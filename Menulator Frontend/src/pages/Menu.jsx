import { useEffect, useState } from "react";
import NewMenu from "../componenets/NewMenu";

// Main menu generation page for users.  This menu allows users to see clear and concisely
// Their menu for the next week.

export default function Menu(props) {
  const { menuList, daysOfWeek } = props;

  // Toggle popup for generating new menu
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [activeDay, setActiveDay] = useState("Sunday");
  const [menuLoaded, setMenuLoaded] = useState(false);
  const [breakfast, setBreakfast] = useState();
  const [lunch, setLunch] = useState();
  const [dinner, setDinner] = useState();

  function dayMenu(e) {
    setActiveDay(e.currentTarget.id);
  }
  function createNewMenu() {
    setShowNewMenu(!showNewMenu);
  }

  function setMenu() {
    if (menuList === undefined) {
      return;
    }
    setBreakfast(menuList.menu[daysOfWeek.indexOf(activeDay)].breakfast);
    setLunch(menuList.menu[daysOfWeek.indexOf(activeDay)].lunch);
    setDinner(menuList.menu[daysOfWeek.indexOf(activeDay)].dinner);
  }

  useEffect(() => {
    setMenuLoaded(false);
    setMenuLoaded(true);
    setMenu();
  }, [activeDay, menuList]);

  return (
    <div className="container">
      <div className="menuDiv flex align gap">
        <div className="pageTitle w-80 flex row justify-b">
          <h1>
            MY <span>MENU</span>
          </h1>
          <button onClick={createNewMenu} className="btn select">
            <p>
              NEW <strong>MENU</strong>
            </p>
          </button>
        </div>
        <div className="card">
          <div className="card-menu">
            {props.daysOfWeek.map((day, dayIndex) => {
              return (
                <button
                  className={activeDay == day ? "item active" : "item"}
                  id={day}
                  onClick={dayMenu}
                  key={dayIndex}
                >
                  <h3>{day}</h3>
                </button>
              );
            })}
          </div>
          <div className="card-info">
            <div className="menu">
              <h3>Breakfast</h3>
              <h1>
                {menuList ? breakfast : <div className="scrollBar"></div>}
              </h1>
            </div>
            <div className="menu">
              <h3>Lunch</h3>
              <h1>{menuList ? lunch : <div className="scrollBar"></div>}</h1>
            </div>
            <div className="menu">
              <h3>Dinner</h3>
              <h1>{menuList ? dinner : <div className="scrollBar"></div>}</h1>
            </div>
          </div>
        </div>
        {showNewMenu && (
          <NewMenu
            {...props}
            menuLoaded={menuLoaded}
            setMenuLoaded={setMenuLoaded}
            close={createNewMenu}
          />
        )}
      </div>
    </div>
  );
}
Menu.propTypes