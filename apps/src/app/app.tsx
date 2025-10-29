import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import Login from "../pages/Login";
import HomeScreen from "../pages/homeScreen";
import MyProfile from "../components/MyProfile";
import PrivateRoute from "../components/privateRoute";
import PublicRoute from "../components/publicRoute";
import EditProfile from "../components/editProfile";
import { fetchUserDetails } from "../slice/userSlice";
import { useAuth } from "../api/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../api";
import { useAppDispatch } from "../redux/store";

export function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const storedToken = localStorage.getItem("token");

  // On app load, initialize Redux user state from localStorage
  useEffect(() => {
    if (storedToken && isAuthenticated) {
      const decodedUserDetails: JwtPayload = jwtDecode(storedToken);

      if (decodedUserDetails.id) {
        dispatch(fetchUserDetails(decodedUserDetails.id));
      }
    }
  }, [dispatch, storedToken, isAuthenticated]);

  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/homeScreen" element={<PrivateRoute><HomeScreen /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
      <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
