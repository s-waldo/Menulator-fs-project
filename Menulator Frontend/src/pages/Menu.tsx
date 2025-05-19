import { useState } from "react";
import NewMenu from "../components/NewMenu";
import { useMenuStore } from "../lib/zustand.setup";
import { daysOfTheWeek } from "../lib/universalData";

// Main menu generation page for users.  This menu allows users to see clear and concisely
// Their menu for the next week.

export default function Menu() {
  // Toggle popup for generating new menu
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [activeDay, setActiveDay] = useState("sunday");
  const [menuLoaded, setMenuLoaded] = useState(false);
  const menuStore = useMenuStore((state) => (state.menu))

  function dayMenu(e: React.MouseEvent<HTMLButtonElement>) {
    setActiveDay(e.currentTarget.id);
  }
  function createNewMenu() {
    setShowNewMenu(!showNewMenu);
  }


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
            {daysOfTheWeek.map((day, dayIndex) => {
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
                {menuStore[activeDay].breakfast}
              </h1>
            </div>
            <div className="menu">
              <h3>Lunch</h3>
              <h1>{menuStore[activeDay].lunch}</h1>
            </div>
            <div className="menu">
              <h3>Dinner</h3>
              <h1>{menuStore[activeDay].dinner}</h1>
            </div>
          </div>
        </div>
        {showNewMenu && (
          <NewMenu
            menuLoaded={menuLoaded}
            setMenuLoaded={setMenuLoaded}
            close={createNewMenu}
          />
        )}
      </div>
    </div>
  );
}