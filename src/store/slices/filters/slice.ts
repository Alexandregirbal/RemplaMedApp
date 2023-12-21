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
    notViewed: false,
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
        setNotViewed(state, action: { payload: FiltersState["notViewed"] }) {
            state.notViewed = action.payload;
        },
        resetNotViewed(state) {
            state.notViewed = initialState.notViewed;
        },
    },
    // add extraReducers for server init only
});

export const {
    setDates,
    setCreatedAt,
    resetCreatedAt,
    resetDates,
    setNotViewed,
    resetNotViewed,
} = filtersSlice.actions;

export const selectFiltersState = (state: AppState) => state.filters;

export default filtersSlice.reducer;
