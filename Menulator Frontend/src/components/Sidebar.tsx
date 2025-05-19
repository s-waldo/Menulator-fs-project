import { useStore } from "zustand";
import { UIStore } from "../lib/zustand.setup";

export default function Sidebar() {
  const toggleAbout = useStore(UIStore, (state) => state.setShowAboutDialog)
  const toggleDonate = useStore(UIStore, (state) => state.setShowDonateDialog)
  const isOpen = useStore(UIStore, (state) => state.showSidebar)
  const sidebarClass = isOpen ? "sidebar flex ov-hd" : "sidebar closed flex ov-hd";
  return (
    <div className={sidebarClass}>
      <a href="/" className="sidebarItem">
        <i className="fa-regular fa-calendar-days"></i>
        <div>My Menu</div>
      </a>

      <a href="/recipes" className="sidebarItem">
        <i className="fa-solid fa-rectangle-list"></i>
        <div>My Recipes</div>
      </a>

      <a href="#" className="sidebarItem bottom" onClick={toggleAbout}>
        <i className="fa-solid fa-circle-info"></i>
        <div>About</div>
      </a>
      <a href="#" className="sidebarItem" onClick={toggleDonate}>
        <i className="fa-solid fa-hand-holding-dollar"></i>
        <div>Donate</div>
      </a>
      <a href="/settings" className="sidebarItem">
        <i className="fa-solid fa-gear"></i>
        <div>Settings</div>
      </a>
    </div>
  );
}
