import { type MetaData } from "modules/post/types/metadata";
import { type PostWithAuthorName } from "modules/post/types/post";

export type PostsState = {
    metadata: MetaData;
    data: PostWithAuthorName[];
    selectedPost: PostWithAuthorName | null;
    newPost: Pick<
        PostWithAuthorName,
        "title" | "message" | "postalCode" | "availablityFrom" | "availablityTo"
    >;
};
