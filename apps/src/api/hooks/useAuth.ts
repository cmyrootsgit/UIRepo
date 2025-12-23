import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loginUser, resetAuth } from "../../slice/authSlice";
import { clearUser } from "../../slice/userSlice";
import { clearUserProfile } from "../../slice/profileSlice";
import { clearRelatives } from "../../slice/relativeSlice";
import { authService, LoginRequest } from "../services/auth";
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
    authService.logout();
    dispatch(resetAuth());
    dispatch(clearUser());
    dispatch(clearUserProfile());
    dispatch(clearRelatives());
  }, [dispatch]);

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
