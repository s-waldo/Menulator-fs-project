import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
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
  const showAbout = useStore(UIStore, (state) => state.showAboutDialog)
  const showDonate = useStore(UIStore, (state) => state.showDonateDialog)
  const [userInformation, setUserInformation] = useState(() => {
    return JSON.parse(window.localStorage.getItem("userInfo"))
  })

  // Set default settings for new users
  const [menuList, setMenuList] = useState()
  const [recipeList, setRecipeList] = useState()


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
    <>
      {true ? (
        <>
          <Header />
          <div className="container">
            <Sidebar />
          </div>
        </>
      ) : (
        <></>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Menu />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/previous" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
      {showAbout && <About />}
      {showDonate && <Donate />}
    </>
  )
}
