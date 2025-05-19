import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from "./components/About.tsx"
import Donate from "./components/Donate.tsx"
import Header from "./components/Header.tsx"
import Menu from "./pages/Menu.tsx"
import Login from "./pages/Login.tsx"
import Register from "./pages/Register.tsx"
import Sidebar from "./components/Sidebar.tsx"
import Recipes from "./pages/Recipes.tsx"
import History from "./pages/History.tsx"
import Settings from "./pages/Settings.tsx"
import ProtectedRoutes from "./utils/ProtectedRoutes.tsx"
import axios from "../api/axios.ts"
import { useStore } from "zustand"
import { UIStore } from "./lib/zustand.setup.ts"

export default function App() {
  // Set toggle status for pop up menu items
  const showAbout = useStore(UIStore, state => state.showAboutDialog)
  const showDonate = useStore(UIStore, state => state.showDonateDialog)
  const [loggedIn, setLogIn] = useState(() => {
    return JSON.parse(window.localStorage.getItem("isLoggedIn")) || false
  })
  const [userInformation, setUserInformation] = useState(() => {
    return JSON.parse(window.localStorage.getItem("userInfo"))
  })

  // Set default settings for new users
  const [menuList, setMenuList] = useState()
  const [recipeList, setRecipeList] = useState()

  // Set default days of week - POTENTIAL UPDATE FOR FUTURE RELEASES FOR USER SETTINGS
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]

  // Add recipe and menu functions
  async function handleAddRecipe(newRecipe) {
    setRecipeList(newRecipe)
    await axios.put(
      `/recipes/${JSON.parse(window.localStorage.getItem("userInfo"))._id}`,
      {
        recipes: newRecipe,
      },
      { headers: { "Content-Type": "application/json" } }
    )
  }
  async function createNewMenu(mealArr) {
    let menu
    await axios
      .get(`/menu/${JSON.parse(window.localStorage.getItem("userInfo"))._id}`)
      .then((res) => (menu = res.data))
    if (menu === "") {
      await axios
        .post(
          `/menu/${JSON.parse(window.localStorage.getItem("userInfo"))._id}`,
          {
            menu: mealArr,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .catch((err) => console.log(err))
    } else {
      await axios
        .put(
          `/menu/${JSON.parse(window.localStorage.getItem("userInfo"))._id}`,
          {
            menu: mealArr,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .catch((err) => console.log(err))
    }
    setMenuList(mealArr)
  }

  function updateUser(userObj) {
    window.localStorage.setItem("userInfo", JSON.stringify(userObj))
    setUserInformation(userObj)
  }

  // Popup menu toggle actions
  function toggleSidebar() {
    const {showSidebar, setShowSidebar} = useStore(UIStore, state => state)
    window.localStorage.setItem("sidebar", String(!showSidebar))
    setShowSidebar()
  }
  function logIn() {
    window.localStorage.setItem("isLoggedIn", !loggedIn)
    setLogIn(!loggedIn)
  }
  function toggleAbout() {
    setShowAbout(!showAbout)
  }
  function toggleDonate() {
    window.localStorage.setItem("donateMenu", !showDonate)
    setShowDonate(!showDonate)
  }

  useEffect(() => {
    async function fetchData() {
      if (userInformation == undefined) {
        return
      }
      // get Meals
      const mealRes = await axios.get(`/menu/${userInformation._id}`)
      const meals = await mealRes.data

      // get Recipes
      const recipeRes = await axios.get(`/recipes/${userInformation._id}`)
      const recipes = await recipeRes.data
      setMenuList(meals)
      setRecipeList(recipes[0].recipes)
    }
    fetchData()
  }, [userInformation])

  // Main site framework with Route functionality
  return (
    <Router>
      {true ? (
        <>
          <Header
            logIn={logIn}
            userInformation={userInformation}
          />
          <div className="container">
            <Sidebar
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
              <History/>
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
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
      {showAbout && <About />}
      {showDonate && <Donate />}
    </Router>
  )
}
