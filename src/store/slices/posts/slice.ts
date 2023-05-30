/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { type AppState } from "store";
import type { PostsState } from "./types";
import type { FiltersState } from "../filters/types";
import {
    sortByCreatedAt,
    sortByDistance,
} from "modules/filters/services/sortBy";
import { Coordinates } from "modules/filters/types/distance";
import { PostWithAuthorName } from "modules/post/types/post";

const initialState: PostsState = {
    data: [],
    metadata: {
        totalOverallPosts: 0,
        totalRecentPosts: 0,
    },
    selectedPost: null,
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
        sortPostsByDistance(
            state,
            action: {
                payload: {
                    currentPosition: Coordinates;
                };
            }
        ) {
            const sortByDistanceFromCurrentLocation = (
                a: PostWithAuthorName,
                b: PostWithAuthorName
            ) => {
                if (
                    !action.payload.currentPosition.latitude ||
                    !action.payload.currentPosition.longitude ||
                    !a.latitude ||
                    !b.latitude ||
                    !a.longitude ||
                    !b.longitude
                ) {
                    return 0;
                }
                return sortByDistance({
                    current: action.payload.currentPosition,
                    pointA: {
                        latitude: a.latitude,
                        longitude: a.longitude,
                    },
                    pointB: {
                        latitude: b.latitude,
                        longitude: b.longitude,
                    },
                });
            };
            const sortedPosts = [...state.data].sort(
                sortByDistanceFromCurrentLocation
            );
            state.data = sortedPosts;
        },
        setPostsMetadata(state, action: { payload: PostsState["metadata"] }) {
            state.metadata = action.payload;
        },
        setSelectedPost(
            state,
            action: { payload: PostsState["selectedPost"] }
        ) {
            state.selectedPost = action.payload;
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            const clientState = { ...state };
            const serverState = { ...action.payload };
            const nextState = {
                ...clientState,
                data: serverState.posts.data,
            };
            if (clientState.metadata) nextState.metadata = clientState.metadata;
            if (clientState.selectedPost)
                nextState.selectedPost = clientState.selectedPost;
            return nextState;
        },
    },
});

export const {
    addPosts,
    setPosts,
    setPostsMetadata,
    setSelectedPost,
    sortPostsByDistance,
} = postsSlice.actions;

export const selectPostsState = (state: AppState) => state.posts;

export default postsSlice.reducer;
