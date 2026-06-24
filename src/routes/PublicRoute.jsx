import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function PublicRoute() {
  return isAuthenticated() ? (
    <Navigate to="/trip-options" replace />
  ) : (
    <Outlet />
  );
}
