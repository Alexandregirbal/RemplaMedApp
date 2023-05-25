import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { type AppState } from "store";
import type { PostsState } from "./types";

const initialState: PostsState = {
    data: [],
    metadata: {
        totalOverallPosts: 0,
        totalRecentPosts: 0,
    },
};

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state, action: { payload: PostsState["data"] }) {
            state.data = action.payload;
        },
        addPosts(state, action: { payload: PostsState["data"] }) {
            state.data = [...state.data, ...action.payload];
        },
        setPostsMetadata(state, action: { payload: PostsState["metadata"] }) {
            state.metadata = action.payload;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return {
                ...state,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                ...action.payload.posts,
            };
        },
    },
});

export const { addPosts, setPosts, setPostsMetadata } = postsSlice.actions;

export const selectPostsState = (state: AppState) => state.posts;

export default postsSlice.reducer;
