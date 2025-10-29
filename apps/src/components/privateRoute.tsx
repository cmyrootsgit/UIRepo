import React from "react"; 
import { Navigate } from "react-router-dom";
import { authService } from "../api/services/auth";
 
interface PrivateRouteProps {
  children: React.ReactElement; 
}
 
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLoggedIn = authService.isAuthenticated();
 
  return isLoggedIn ? children : <Navigate to="/" replace />;
};
 
export default PrivateRoute;