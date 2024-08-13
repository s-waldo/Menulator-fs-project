import React, { useEffect } from "react";
import { Image } from "cloudinary-react";

// IN DEVELOPMENT
// Quick select menu for Account information
// Information pulled via API from backend

export default function ProfileMenu(props) {
  const { logIn, userInformation } = props;

  function logout() {
    logIn();
    window.localStorage.removeItem("userInfo");
  }

  return (
    <div className="profileMenu">
      <div className="arrow"></div>
      <ul className="userMenu">
        <div className="profileSummary flex row align gap ov-hd">
          <a href="/settings">
            {userInformation && (
              <Image
                cloudName={import.meta.env.VITE_CLOUDINARY_NAME}
                publicId={userInformation.avatar}
              />
            )}
          </a>
          <div className="details">
            {userInformation && <div>{userInformation.name}</div>}
            {userInformation && (
              <div className="email">{userInformation.emailAddress}</div>
            )}
          </div>
        </div>
        <li className="listItem">
          <a href="/settings" className="menuLink">
            <i className="fa-solid fa-gear"></i>
            <div>Settings</div>
          </a>
        </li>
        <li className="listItem">
          <a onClick={logout} href="/" className="menuLink">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <div>Logout</div>
          </a>
        </li>
      </ul>
    </div>
  );
}
