/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createSlice } from "@reduxjs/toolkit";
import { sortByDate, sortByDistance } from "modules/filters/services/sortBy";
import type { Coordinates } from "modules/filters/types/distance";
import type { PostWithAuthorName } from "modules/post/types/post";
import { HYDRATE } from "next-redux-wrapper";
import { type AppState } from "store";
import type { PostsState } from "./types";

const initialState: PostsState = {
    data: [],
    metadata: {
        totalOverallPosts: 0,
        totalRecentPosts: 0,
    },
    selectedPost: null,
    newPost: {
        title: "",
        message: "",
        postalCode: "",
        city: "",
        latitude: 0,
        longitude: 0,
        availablityFrom: new Date().toISOString(),
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
                    !action.payload.currentPosition ||
                    (!a.latitude && a.latitude !== 0) ||
                    (!b.latitude && b.latitude !== 0) ||
                    (!a.longitude && a.longitude !== 0) ||
                    (!b.longitude && b.longitude !== 0)
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
        sortPostsByDate(state) {
            const sortedPosts = [...state.data].sort(sortByDate);
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
        setNewPost(state, action: { payload: PostsState["newPost"] }) {
            state.newPost = action.payload;
        },
        resetNewPost(state) {
            state.newPost = initialState.newPost;
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
    sortPostsByDate,
    setNewPost,
    resetNewPost,
} = postsSlice.actions;

export const selectPostsState = (state: AppState) => state.posts;

export default postsSlice.reducer;
