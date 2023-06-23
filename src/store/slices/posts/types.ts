import { type MetaData } from "modules/post/types/metadata";
import { type PostWithAuthorName } from "modules/post/types/post";

export type PostsState = {
    metadata: MetaData;
    data: PostWithAuthorName[];
    selectedPost: Partial<PostWithAuthorName> | null;
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
