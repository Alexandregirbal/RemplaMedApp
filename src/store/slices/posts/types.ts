import { type MetaData } from "modules/post/types/metadata";
import { type PostWithAuthorName } from "modules/post/types/post";

export type PostsState = {
    data: PostWithAuthorName[];
    metadata: MetaData;
    selectedPosts: Array<PostWithAuthorName>;
    filteredPosts: Array<PostWithAuthorName>;
    newPost: Pick<
        PostWithAuthorName,
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
