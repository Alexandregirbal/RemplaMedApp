import {
    configureStore,
    type Action,
    type ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { filtersSlice } from "./slices/filters/slice";
import { postsSlice } from "./slices/posts/slice";
import { uiSlice } from "./slices/ui/slice";

const makeStore = () =>
    configureStore({
        reducer: {
            [filtersSlice.name]: filtersSlice.reducer,
            [postsSlice.name]: postsSlice.reducer,
            [uiSlice.name]: uiSlice.reducer,
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
