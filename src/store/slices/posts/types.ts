import { type MetaData } from "modules/post/types/metadata";
import { type PostWithAuthorName } from "modules/post/types/post";
import type { FiltersState } from "../filters/types";

export type PostsState = {
    data: PostWithAuthorName[];
    metadata: MetaData;
    selectedPosts: Array<PostWithAuthorName>;
    filteredPosts: {
        appliedFilters: Array<keyof FiltersState>;
        value: Array<PostWithAuthorName>;
    };
    newPost: Pick<
        PostWithAuthorName,
        | "title"
        | "message"
        | "postalCode"
        | "city"
        | "latitude"
        | "longitude"
        | "availablityFrom"
        | "availablityTo"
    >;
};
