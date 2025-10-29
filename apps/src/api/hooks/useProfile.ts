import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { UserProfileUpdateRequest } from "../services/profile";
import { clearUserProfile, updateUserProfile } from "../../slice/profileSlice";

export const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const { details ,loading, error } = useAppSelector((state) => state.profile);

  // Update profile function
  const updateProfile = useCallback(
    async (payload: UserProfileUpdateRequest) => {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");

      const resultAction = await dispatch(updateUserProfile({ userId, payload }));
      return resultAction;
    },
    [dispatch]
  );

  // Clear profile
  const clearProfile = useCallback(() => {
    dispatch(clearUserProfile());
    localStorage.removeItem("userDetails");
  }, [dispatch]);

  return {
    details,
    loading,
    error,
    updateProfile,
    clearProfile,
  };
};
