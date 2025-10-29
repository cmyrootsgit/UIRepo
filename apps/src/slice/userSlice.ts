import { createSlice, createAsyncThunk, PayloadAction, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { UserDetails, UserDetailsResponse, userService } from "../api/services/user";

export const userAdapter = createEntityAdapter<UserDetails>();

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = {
        "status": "SUCCESS",
        "code": 200,
        "message": "User details fetched",
        "data": {
          "_id": "5e32ae4fb5285e1e088408ea",
          "CreatedBy": "5e32ae4fb5285e1e088408ea",
          "UpdatedBy": "5e32ae4fb5285e1e088408ea",
          "FirstName": "karthik",
          "LastName": "arjun",
          "Email": "karthikarjun54@gmail.com",
          "SocialLogin": {
            "FacebookId": null,
            "GoogleId": "karthikarjun54@gmail.com"
          },
          "Gender": 1,
          "SecurityQuestion1": 8,
          "SecurityAnswer1": "a1",
          "SecurityQuestion2": 14,
          "SecurityAnswer2": "a2",
          "LoginFailedCount": 0,
          "LastLoginFailed": false,
          "Locked": false,
          "Active": true,
          "ResetPasswordAtLogin": false,
          "AuthToken": "zlmmQwIeAIVEZ/Kg19Zc0oPjNWsO9qE5NSLdd2DVAqZ7oJcXlolJAqVkveXnfHQIZB/E6gsyn+L0usqDxbhKbA==",
          "UserType": 3,
          "IsFirstTimeLogin": false,
          "CreatedAt": "2025-10-24T09:06:58.201Z",
          "UpdatedAt": "2025-10-24T09:06:58.201Z",
          "profile": {
            "_id": "5e9166deb5285e0f00a4b279",
            "CreatedBy": "5e32ae4fb5285e1e088408ea",
            "UpdatedBy": "5e32ae4fb5285e1e088408ea",
            "HighSchool": null,
            "College": null,
            "LinkedInUrl": null,
            "UserId": "5e32ae4fb5285e1e088408ea",
            "PhotoPath": "users/ZCucUSq4FM29mDEOgj3nMT6JdXzHjVgKIrQ5Cmlc5goeq/profilephoto.jpg",
            "DateOfBirth": {
              "low": 1265768448,
              "high": 148362762,
              "unsigned": false
            },
            "BirthMonthDate": "4-1",
            "MaritalStatus": "2",
            "FamilyName": "good",
            "AboutMe": null,
            "CurrentLocation": "Trichy, Tamil Nadu, India",
            "Location": "Musiri, Tamil Nadu, India",
            "Occupation": null,
            "ContactNumber": null,
            "CreatedAt": "2025-10-24T09:06:58.208Z",
            "UpdatedAt": "2025-10-24T09:06:58.208Z"
          }
        }
      }
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
