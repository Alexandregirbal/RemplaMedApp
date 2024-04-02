import type { Post } from "server/database/models/post/types";
import type { PostDateFields } from "../types/post";

export const postToPostWithDatesStrings = <T extends Post>(
    post: T
): T & PostDateFields => {
    return {
        ...post,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        availablityFrom: post.availablityFrom,
        availablityTo: post.availablityTo,
    };
};
