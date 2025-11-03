import { createSlice, createAsyncThunk, PayloadAction, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { UserDetails, UserDetailsResponse, userService } from "../api/services/user";

export const userAdapter = createEntityAdapter<UserDetails>();

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await userService.getUserDetails(userId);
      return response.data; // ✅ only user object
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

export interface UserState extends EntityState<UserDetails, string> {
  details: UserDetails | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = userAdapter.getInitialState({
  details: null,
  loading: false,
  error: null,
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    upsertOne: userAdapter.upsertOne,
    setProfile: (state, action: PayloadAction<Partial<UserDetails>>) => {
      if (state.details) {
        state.details.profile = {
          ...state.details.profile,
          ...action.payload,
        };
      }
    },
    setUser: (state, action: PayloadAction<UserDetailsResponse["data"]>) => {
      state.details = action.payload;
    },
    clearUser: (state) => {
      state.details = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userActions = userSlice.actions;
export default userSlice.reducer;
