import { useStore } from "zustand"
import { UIStore } from "../lib/zustand.setup"
import { Link } from "react-router-dom"

export default function Sidebar() {
  const toggleAbout = useStore(UIStore, (state) => state.setShowAboutDialog)
  const toggleDonate = useStore(UIStore, (state) => state.setShowDonateDialog)
  const isOpen = useStore(UIStore, (state) => state.showSidebar)
  const sidebarClass = isOpen
    ? "sidebar flex ov-hd"
    : "sidebar closed flex ov-hd"
  return (
    <div className={sidebarClass}>
      <Link to="/" className="sidebarItem">
        <i className="fa-regular fa-calendar-days"></i>
        <div>My Menu</div>
      </Link>
      <Link to="/recipes" className="sidebarItem">
        <i className="fa-solid fa-rectangle-list"></i>
        <div>My Recipes</div>
      </Link>
      <Link to="#" className="sidebarItem bottom" onClick={toggleAbout}>
        <i className="fa-solid fa-circle-info"></i>
        <div>About</div>
      </Link>
      <Link to="#" className="sidebarItem" onClick={toggleDonate}>
        <i className="fa-solid fa-hand-holding-dollar"></i>
        <div>Donate</div>
      </Link>
      <Link to="/settings" className="sidebarItem">
        <i className="fa-solid fa-gear"></i>
        <div>Settings</div>
      </Link>
    </div>
  )
}
