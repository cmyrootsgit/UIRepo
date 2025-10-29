import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loginUser } from "../../slice/authSlice";
import { LoginRequest } from "../services/auth";
import { useCallback } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  // Login function using unwrap() to get actual payload
  const login = useCallback(
    async (payload: LoginRequest) => {
      try {
        const result = await dispatch(loginUser(payload)).unwrap();

        return result;
      } catch (err: any) {
        // Throws error if login failed
        throw new Error(err || "Login failed");
      }
    },
    [dispatch]
  );

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    // Optionally, reset Redux state if you have a logout thunk
    // dispatch(logoutUser());
  }, []);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};
