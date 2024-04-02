import { type MetaData } from "modules/post/types/metadata";
import type { Post } from "server/database/models/post/types";

export type PostsState = {
    data: Post[];
    metadata: MetaData;
    selectedPosts: Array<Post>;
    filteredPosts: Array<Post>;
    newPost: Pick<
        Post,
        | "intent"
        | "message"
        | "postalCode"
        | "city"
        | "latitude"
        | "longitude"
        | "availablityFrom"
        | "availablityTo"
    >;
};
