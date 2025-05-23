import { useState } from "react"
import ProfileMenu from "./ProfileMenu"
import { UIStore } from "../lib/zustand.setup"
import { useStore } from "zustand"
import { Link } from "react-router-dom"

export default function Header() {
  const toggleSidebar = useStore(UIStore, (state) => state.setShowSidebar)
  // Handle profile dropdown toggle
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  function toggleMenu() {
    setShowProfileMenu(!showProfileMenu)
  }

  return (
    <div className="navbar flex align row gap">
      <button className="menuBtn btn icon" onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="logoDiv">
        <Link to="/" className="logoBtn">
          <i className="fa-solid fa-pizza-slice" />
          <h3 className="logoName">Menulator</h3>
        </Link>
      </div>
      <div className="profileSettings">
        <button className="avatar btn icon" onClick={toggleMenu}>
          <i className="fa-regular fa-user" />
        </button>
        {showProfileMenu && <ProfileMenu />}
      </div>
    </div>
  )
}
