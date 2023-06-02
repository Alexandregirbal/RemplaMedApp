import { createSlice } from "@reduxjs/toolkit";
import { type AppState } from "store";
import type { FiltersState } from "./types";

const initialState: FiltersState = {
    displayMode: "map",
    dates: {
        from: null,
        to: null,
    },
    sortBy: "date",
};

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setDisplayMode(
            state,
            action: { payload: FiltersState["displayMode"] }
        ) {
            state.displayMode = action.payload;
        },
        setDates(state, action: { payload: FiltersState["dates"] }) {
            state.dates = action.payload;
        },
        setSortBy(state, action: { payload: FiltersState["sortBy"] }) {
            state.sortBy = action.payload;
        },
    },
    // add extraReducers for server init only
});

export const { setDates, setDisplayMode, setSortBy } = filtersSlice.actions;

export const selectFiltersState = (state: AppState) => state.filters;

export default filtersSlice.reducer;
