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
        isCreatedAtFilterSet(state) {
            state.createdAt.value !== 0;
        },
        isDatesFilterSet(state) {
            state.dates.from !== null && state.dates.to !== null;
        },
        isNotViewedFilterSet(state) {
            !!state.notViewed;
        },
        isIntentFilterSet(state) {
            !!state.intent;
        },
        isAnyFilterSet(state) {
            state.createdAt.value !== 0 ||
                state.dates.from !== null ||
                state.dates.to !== null ||
                !!state.notViewed ||
                !!state.intent;
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
    isCreatedAtFilterSet,
    isDatesFilterSet,
    isNotViewedFilterSet,
    isIntentFilterSet,
    isAnyFilterSet,
} = filtersSlice.actions;

export const selectFiltersState = (state: AppState) => state.filters;

export default filtersSlice.reducer;
