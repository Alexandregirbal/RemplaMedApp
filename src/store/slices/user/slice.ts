import { createSlice } from "@reduxjs/toolkit";
import { type AppState } from "store";
import type { UserState } from "./types";

const initialState: UserState = {
    id: null,
    postsViewed: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId(state, action: { payload: UserState["id"] }) {
            state.id = action.payload;
        },
        setPostsViewed(state, action: { payload: UserState["postsViewed"] }) {
            state.postsViewed = action.payload;
        },
        addViewedPost(state, action: { payload: UserState["postsViewed"][0] }) {
            state.postsViewed.push(action.payload);
        },
        resetUser(state) {
            state.id = null;
            state.postsViewed = [];
        },
    },
});

export const { addViewedPost, resetUser, setUserId, setPostsViewed } =
    userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;
