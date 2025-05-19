import { Image } from "cloudinary-react";
import { useStore } from "zustand";
import { UserStore, type User } from "../lib/zustand.setup";

// IN DEVELOPMENT
// Quick select menu for Account information
// Information pulled via API from backend

export default function ProfileMenu() {
  const user: User = useStore(UserStore, state => state)
  function logout() {
    // logIn();
    window.localStorage.removeItem("userInfo");
  }

  return (
    <div className="profileMenu">
      <div className="arrow"></div>
      <ul className="userMenu">
        <div className="profileSummary flex row align gap ov-hd">
          <a href="/settings">
            {user && (
              <Image
                cloudName={import.meta.env.VITE_CLOUDINARY_NAME}
                publicId={user.avatar}
              />
            )}
          </a>
          <div className="details">
            {user && <div>{user.name}</div>}
            {user && (
              <div className="email">{user.email}</div>
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
