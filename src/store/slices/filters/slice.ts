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
    intent: null,
};

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        resetFiltersSlice(state) {
            state.dates = initialState.dates;
            state.createdAt = initialState.createdAt;
            state.notViewed = initialState.notViewed;
            state.intent = initialState.intent;
            // ADD new filters here
        },
        setDates(state, action: { payload: FiltersState["dates"] }) {
            state.dates = action.payload;
        },
        setCreatedAt(state, action: { payload: FiltersState["createdAt"] }) {
            state.createdAt = action.payload;
        },
        setNotViewed(state, action: { payload: FiltersState["notViewed"] }) {
            state.notViewed = action.payload;
        },
        setIntent(state, action: { payload: FiltersState["intent"] }) {
            state.intent = action.payload;
        },
        // Add extraReducers for server init only
    },
});

export const {
    resetFiltersSlice,
    setDates,
    setCreatedAt,
    setNotViewed,
    setIntent,
} = filtersSlice.actions;

export const selectFiltersState = (state: AppState) => state.filters;

export default filtersSlice.reducer;
