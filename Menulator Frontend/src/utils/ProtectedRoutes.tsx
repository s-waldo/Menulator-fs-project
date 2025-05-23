
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useStore } from "zustand";
import { UserStore } from "../lib/zustand.setup";

export default function ProtectedRoutes() {
  const location = useLocation();
  const { loggedIn } = useStore(UserStore);
  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
