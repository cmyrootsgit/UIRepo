import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { authService, LoginRequest, LoginResponse } from "../api/services/auth";

// 🔹 Slice state type
export interface AuthState {
  user: LoginResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.loginWithEmail(payload);

      // ✅ Check the new response format
      if (!response.data?.token) {
        return rejectWithValue(response.message || "Invalid login response");
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);


// export const logoutUser = createAsyncThunk<void>(
//   "auth/logoutUser",
//   async (_, { dispatch }) => {
//     authService.logout();
//     dispatch(authSlice.actions.resetAuth());
//   }
// );

// 🔹 Initial state
const initialState: AuthState = {
  user: null,
  token: authService.getToken(),
  isAuthenticated: !!authService.getToken(),
  loading: false,
  error: null,
};

// 🔹 Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
      state.loading = false;
      state.user = action.payload;
      state.token = action.payload.data?.token || null; 
      state.isAuthenticated = !!action.payload.data?.token;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Login failed";
    });
    // builder.addCase(logoutUser.fulfilled, (state) => {
    //   state.user = null;
    //   state.token = null;
    //   state.isAuthenticated = false;
    // });
  },
});

// 🔹 Export actions & reducer
export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
