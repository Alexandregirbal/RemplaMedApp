import { createSlice } from "@reduxjs/toolkit";
import type { UIState } from "./types";
import { type AppState } from "store";

const initialState: UIState = {
    isLoading: false,
    toaster: null,
};

export const uiSlice = createSlice({
    name: "UI",
    initialState,
    reducers: {
        setIsLoading(state, action: { payload: UIState["isLoading"] }) {
            state.isLoading = action.payload;
        },
        setToaster(state, action: { payload: UIState["toaster"] }) {
            state.toaster = action.payload;
        },
    },
});

export const { setIsLoading, setToaster } = uiSlice.actions;

export const selectUIState = (state: AppState) => state.UI;

export default uiSlice.reducer;
