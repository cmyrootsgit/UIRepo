import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RelativesResponseData, RelativeRequest } from "../types/relativeTypes";
import { fetchRelatives } from "../api";

export interface RelativeState {
    suggestions: RelativesResponseData;
    loading: boolean;
    error: string | null;
}

const initialState: RelativeState = {
    suggestions: { data: { peopleYouMayKnow: [], relatives: [] } },
    loading: false,
    error: null,
};

export const getRelatives = createAsyncThunk<
    RelativesResponseData,
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
    reducers: {
        clearRelatives: (state) => {
            state.suggestions = { data: { peopleYouMayKnow: [], relatives: [] } };
            state.loading = false;
            state.error = null;
        },
    },
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

export const { clearRelatives } = relativeSlice.actions;
export default relativeSlice.reducer;