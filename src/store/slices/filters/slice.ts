import { createSlice } from "@reduxjs/toolkit";
import { type AppState } from "store";
import type { FiltersState } from "./types";

const initialState: FiltersState = {
    dates: {
        from: null,
        to: null,
    },
    createdAt: {
        value: 0,
        label: "Aucun filtre",
    },
};

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setDates(state, action: { payload: FiltersState["dates"] }) {
            state.dates = action.payload;
        },
        resetDates(state) {
            state.dates = initialState.dates;
        },
        setCreatedAt(state, action: { payload: FiltersState["createdAt"] }) {
            state.createdAt = action.payload;
        },
        resetCreatedAt(state) {
            state.createdAt = initialState.createdAt;
        },
    },
    // add extraReducers for server init only
});

export const { setDates, setCreatedAt, resetCreatedAt, resetDates } =
    filtersSlice.actions;

export const selectFiltersState = (state: AppState) => state.filters;

export default filtersSlice.reducer;
