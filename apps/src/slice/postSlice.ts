import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosts } from "../api/services/post";
import { PostFromAPI } from "../types/postTypes";

export interface PostState {
  posts: PostFromAPI[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const getPosts = createAsyncThunk<
  PostFromAPI[],
  { userId: string; token: string }
>("posts/getPosts", async ({ userId, token }, thunkAPI) => {
  try {
    return await fetchPosts(userId, token);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
