import { createSlice } from "@reduxjs/toolkit";
import { type AppState } from "store";
import type { FiltersState } from "./types";

const initialState: FiltersState = {
    dates: {
        from: null,
        to: null,
        postsIds: [],
    },
    createdAt: {
        value: 0,
        label: "Aucun filtre",
        postsIds: [],
    },
};

export const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setDates(state, action: { payload: FiltersState["dates"] }) {
            state.dates = action.payload;
        },
        setCreatedAt(state, action: { payload: FiltersState["createdAt"] }) {
            state.createdAt = action.payload;
        },
    },
    // add extraReducers for server init only
});

export const { setDates, setCreatedAt } = filtersSlice.actions;

export const selectFiltersState = (state: AppState) => state.filters;

export default filtersSlice.reducer;
