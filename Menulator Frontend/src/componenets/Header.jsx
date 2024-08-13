import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";

export default function Header(props) {
  const { toggleSidebar } = props;
  // Handle profile dropdown toggle
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  function toggleMenu() {
    setShowProfileMenu(!showProfileMenu);
    return;
  }

  return (
    <div className="navbar flex align row gap">
      <button className="menuBtn btn icon" onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="logoDiv">
        <a href="/" className="logoBtn">
          <i className="fa-solid fa-pizza-slice" />
          <h3 className="logoName">Menulator</h3>
        </a>
      </div>
      <div className="profileSettings">
        <button className="avatar btn icon" onClick={toggleMenu}>
          <i className="fa-regular fa-user" />
        </button>
        {showProfileMenu && <ProfileMenu {...props} />}
      </div>
    </div>
  );
}
