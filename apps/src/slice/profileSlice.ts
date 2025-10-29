import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile, userProfileService, UserProfileUpdateRequest, UserProfileUpdateResponse } from "../api/services/profile";

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk<
  UserProfileUpdateResponse, // Return type of the fulfilled action
  { userId: string; payload: UserProfileUpdateRequest }, // Argument type
  { rejectValue: string } // reject type
>(
  "userProfile/updateUserProfile",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const response = await userProfileService.updateProfile(userId, payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

// Slice state type
export interface UserProfileState {
  details: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  details: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    clearUserProfile: (state) => {
      state.details = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserProfileUpdateResponse>) => {
        state.loading = false;

        if (!state.details) return;

        state.details = {
          ...state.details,
          ...action.payload,
        };

      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
