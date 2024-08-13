import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./componenets/About";
import Donate from "./componenets/Donate";
import Header from "./componenets/Header";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Sidebar from "./componenets/Sidebar";
import Recipes from "./pages/Recipes";
import History from "./pages/History";
import Settings from "./pages/Settings";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import axios from "../api/axios";

export default function App() {
  // Set toggle status for pop up menu items
  const [showSidebar, setShowSidebar] = useState(() => {
    const saved = window.localStorage.getItem("sidebar");
    const initialValue = JSON.parse(saved);
    return initialValue;
  });
  const [showAbout, setShowAbout] = useState(false);
  const [showDonate, setShowDonate] = useState(() => {
    const saved = window.localStorage.getItem("donateMenu");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });
  const [loggedIn, setLogIn] = useState(() => {
    return JSON.parse(window.localStorage.getItem("isLoggedIn")) || false;
  });
  const [userInformation, setUserInformation] = useState(() => {
    return JSON.parse(window.localStorage.getItem("userInfo"));
  });

  // Set default settings for new users
  const [menuList, setMenuList] = useState();
  const [recipeList, setRecipeList] = useState();

  // Set default days of week - POTENTIAL UPDATE FOR FUTURE RELEASES FOR USER SETTINGS
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Add recipe and menu functions
  async function handleAddRecipe(newRecipe) {
    setRecipeList(newRecipe);
    await axios.put(
      `/recipes/${JSON.parse(window.localStorage.getItem("userInfo"))._id}`,
      {
        recipes: newRecipe,
      },
      { headers: { "Content-Type": "application/json" } }
    );
  }
  async function createNewMenu(mealArr) {
    let menu;
    await axios
      .get(`/menu/${JSON.parse(window.localStorage.getItem("userInfo"))._id}`)
      .then((res) => (menu = res.data));
    if (menu === "") {
      await axios
        .post(
          `/menu/${JSON.parse(window.localStorage.getItem("userInfo"))._id}`,
          {
            menu: mealArr,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .catch((err) => console.log(err));
    } else {
      await axios
        .put(
          `/menu/${JSON.parse(window.localStorage.getItem("userInfo"))._id}`,
          {
            menu: mealArr,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .catch((err) => console.log(err));
    }
    setMenuList(mealArr);
  }

  function updateUser(userObj) {
    window.localStorage.setItem("userInfo", JSON.stringify(userObj));
    setUserInformation(userObj);
  }

  // Popup menu toggle actions
  function toggleSidebar() {
    window.localStorage.setItem("sidebar", !showSidebar);
    setShowSidebar(!showSidebar);
  }
  function logIn() {
    window.localStorage.setItem("isLoggedIn", !loggedIn);
    setLogIn(!loggedIn);
  }
  function toggleAbout() {
    setShowAbout(!showAbout);
  }
  function toggleDonate() {
    window.localStorage.setItem("donateMenu", !showDonate);
    setShowDonate(!showDonate);
  }

  useEffect(() => {
    async function fetchData() {
      if (userInformation == undefined) {
        return;
      }
      // get Meals
      const mealRes = await axios.get(`/menu/${userInformation._id}`);
      const meals = await mealRes.data;

      // get Recipes
      const recipeRes = await axios.get(`/recipes/${userInformation._id}`);
      const recipes = await recipeRes.data;
      setMenuList(meals);
      setRecipeList(recipes[0].recipes);
    }
    fetchData();
  }, [userInformation]);

  // Main site framework with Route functionality
  return (
    <Router>
      {loggedIn ? (
        <>
          <Header
            toggleSidebar={toggleSidebar}
            logIn={logIn}
            userInformation={userInformation}
          />
          <div className="container">
            <Sidebar
              isOpen={showSidebar}
              toggleAbout={toggleAbout}
              toggleDonate={toggleDonate}
            />
          </div>
        </>
      ) : (
        <div></div>
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login setUserInformation={updateUser} logIn={logIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes loggedIn={loggedIn} />}>
          <Route
            path="/"
            element={
              <Menu
                menuList={menuList}
                daysOfWeek={daysOfWeek}
                generateMenu={createNewMenu}
                recipeList={recipeList}
                isOpen={showSidebar}
                toggleAbout={toggleAbout}
                toggleDonate={toggleDonate}
                toggleSidebar={toggleSidebar}
                userInformation={userInformation}
              />
            }
          />
          <Route
            path="/recipes"
            element={
              <Recipes
                recipeList={recipeList}
                handleAddRecipe={handleAddRecipe}
                isOpen={showSidebar}
                toggleAbout={toggleAbout}
                toggleDonate={toggleDonate}
                toggleSidebar={toggleSidebar}
                userInformation={userInformation}
              />
            }
          />
          <Route
            path="/previous"
            element={
              <History
                isOpen={showSidebar}
                toggleAbout={toggleAbout}
                toggleDonate={toggleDonate}
                toggleSidebar={toggleSidebar}
                userInformation={userInformation}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                isOpen={showSidebar}
                toggleAbout={toggleAbout}
                toggleDonate={toggleDonate}
                toggleSidebar={toggleSidebar}
                userInformation={userInformation}
                updateUser={updateUser}
              />
            }
          />
        </Route>
      </Routes>
      {showAbout && <About toggleScreen={toggleAbout} />}
      {showDonate && <Donate toggleScreen={toggleDonate} />}
    </Router>
  );
}
