import { Navigate } from "react-router-dom";
import { authService } from "../api/services/auth";
import  { ReactElement } from "react";
 
interface PublicRouteProps {
  children: ReactElement;
}
 
const PublicRoute = ({ children }: PublicRouteProps) => {
  const isLoggedIn = authService.isAuthenticated();
  return isLoggedIn ? <Navigate to="/homeScreen" replace /> : children;
};
 
export default PublicRoute;