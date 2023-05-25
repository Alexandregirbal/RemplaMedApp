import {
    configureStore,
    type ThunkAction,
    type Action,
} from "@reduxjs/toolkit";
import { filtersSlice } from "./slices/filters/slice";
import { createWrapper } from "next-redux-wrapper";
import { postsSlice } from "./slices/posts/slice";

const makeStore = () =>
    configureStore({
        reducer: {
            [filtersSlice.name]: filtersSlice.reducer,
            [postsSlice.name]: postsSlice.reducer,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
