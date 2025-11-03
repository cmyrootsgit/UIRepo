import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RelativeFromAPI, RelativeRequest } from "../types/relativeTypes";
import { fetchRelatives } from "../api";

export interface RelativeState {
    suggestions: RelativeFromAPI[];
    loading: boolean;
    error: string | null;
}

const initialState: RelativeState = {
    suggestions: [],
    loading: false,
    error: null,
};

export const getRelatives = createAsyncThunk<
    RelativeFromAPI[],
    { payload: RelativeRequest }
>("relative/getRelatives", async ({ payload }, thunkAPI) => {
    try {
        return await fetchRelatives(payload);
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

const relativeSlice = createSlice({
    name: "relative",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRelatives.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRelatives.fulfilled, (state, action) => {
                state.loading = false;
                state.suggestions = action.payload;
            })
            .addCase(getRelatives.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default relativeSlice.reducer;