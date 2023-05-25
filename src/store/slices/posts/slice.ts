/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
            console.log(`LOG by Girbal --- | setPosts | state---`, state);
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
            const nextState = {
                ...state,
                posts: action.payload.posts,
            };
            // WATCH OUT! This will overwrite client state!
            // TODO: use state reconciliation to merge states https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
            if (state.metadata) nextState.metadata = state.metadata;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return nextState;
        },
    },
});

export const { addPosts, setPosts, setPostsMetadata } = postsSlice.actions;

export const selectPostsState = (state: AppState) => state.posts;

export default postsSlice.reducer;
