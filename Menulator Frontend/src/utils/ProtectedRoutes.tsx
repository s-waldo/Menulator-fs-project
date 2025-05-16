
import { Outlet, Navigate, useLocation } from "react-router-dom";

function ProtectedRoutes(props) {
  const location = useLocation();
  const { loggedIn } = props;
  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

ProtectedRoutes.propTypes

export default ProtectedRoutes;
