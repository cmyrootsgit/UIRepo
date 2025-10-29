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
    return [
      {
        "Post": {
          "PostDateTimeJson": 636896852596398000,
          "UpdatedAtJson": 636896852596428000,
          "PostDateTimeString": "Invalid Date",
          "UserId": "5ca1819e8d50a812b0537090",
          "PostTypeId": 4,
          "PostTargetTypeId": 3,
          "Text": null,
          "Name": null,
          "PhotoPath": null,
          "SourceType": 0,
          "TopTenPostPhotos": null,
          "PostPhotoCount": 0,
          "LatestFivePostComments": null,
          "PostCommentCount": 0,
          "PostEmotionMetrics": null,
          "CustomData": {
            "EventId": "5ca1820b8d50a812b0537093"
          },
          "Id": "5ca1820b8d50a812b0537094",
          "UpdatedAt": 636896852596428000,
          "CreatedAt": 636896852596428000,
          "CreatedBy": "5ca1819e8d50a812b0537090",
          "UpdatedBy": "5ca1819e8d50a812b0537090"
        },
        "PostPhotoInfo": {
          "PhotoCount": 0,
          "PageSize": 10,
          "PageIndex": 0,
          "PostPhotos": null
        },
        "PostCommentInfo": {
          "CommentCount": 0,
          "PageSize": 5,
          "PageIndex": 0,
          "PostComment": null,
          "PostComments": null
        },
        "PostEmotionInfo": {
          "EmotionCount": 0,
          "LikeCount": 0,
          "LoveCount": 0,
          "WowCount": 0,
          "HaHaCount": 0,
          "SadCount": 0,
          "AngryCount": 0,
          "PostEmotion": null
        },
        "RecentPostsCount": 0
      }
    ]
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
