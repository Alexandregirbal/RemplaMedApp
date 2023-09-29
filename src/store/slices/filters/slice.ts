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
    createdAt: {
        value: 0,
        label: "Aucun filtre",
    },
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
        setCreatedAt(state, action: { payload: FiltersState["createdAt"] }) {
            state.createdAt = action.payload;
        },
    },
    // add extraReducers for server init only
});

export const { setDates, setDisplayMode, setSortBy, setCreatedAt } =
    filtersSlice.actions;

export const selectFiltersState = (state: AppState) => state.filters;

export default filtersSlice.reducer;
