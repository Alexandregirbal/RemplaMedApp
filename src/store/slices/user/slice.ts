import { createSlice } from "@reduxjs/toolkit";
import { type AppState } from "store";
import type { UserState } from "./types";

const initialState: UserState = {
    _id: null,
    email: null,
    phoneNumber: undefined,
    postsViewed: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId(state, action: { payload: UserState["_id"] }) {
            state._id = action.payload;
        },
        setPostsViewed(state, action: { payload: UserState["postsViewed"] }) {
            state.postsViewed = action.payload;
        },
        addViewedPost(state, action: { payload: UserState["postsViewed"][0] }) {
            state.postsViewed.push(action.payload);
        },
        setUserEmail(state, action: { payload: UserState["email"] }) {
            state.email = action.payload;
        },
        setUserPhoneNumber(
            state,
            action: { payload: UserState["phoneNumber"] }
        ) {
            state.phoneNumber = action.payload;
        },
        resetUser(state) {
            state._id = null;
            state.email = null;
            state.postsViewed = [];
        },
    },
});

export const {
    addViewedPost,
    resetUser,
    setUserId,
    setPostsViewed,
    setUserEmail,
    setUserPhoneNumber,
} = userSlice.actions;

export const selectUserState = (state: AppState) => state.user;

export default userSlice.reducer;
