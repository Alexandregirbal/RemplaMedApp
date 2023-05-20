import { createSlice } from "@reduxjs/toolkit";
import { type AppState } from "../../store";
import { HYDRATE } from "next-redux-wrapper";

export type FiltersState = {
    displayMode: "list" | "map";
    distance: number;
    dates: {
        from: Date | null;
        to: Date | null;
    };
    sortBy: "distance" | "createdAt" | "dateFrom" | "dateTo";
};

const initialState: FiltersState = {
    displayMode: "map",
    distance: 50,
    dates: {
        from: null,
        to: null,
    },
    sortBy: "distance",
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
        setDistance(state, action: { payload: FiltersState["distance"] }) {
            state.distance = action.payload;
        },
        setSortBy(state, action: { payload: FiltersState["sortBy"] }) {
            state.sortBy = action.payload;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
                ...state,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                ...action.payload.filters,
            };
        },
    },
});

export const { setDates, setDisplayMode, setDistance, setSortBy } =
    filtersSlice.actions;

export const selectFiltersState = (state: AppState) => state.filters;

export default filtersSlice.reducer;
