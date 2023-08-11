import { type Post } from "@prisma/client";
import type { PostDateFields } from "../types/post";

export const postToPostWithDatesStrings = <T extends Post>(
    post: T
): T & PostDateFields => {
    return {
        ...post,
        createdAt: post.createdAt.toISOString(),
        updatedAt: post.updatedAt?.toISOString(),
        availablityFrom: post.availablityFrom?.toISOString(),
        availablityTo: post.availablityTo?.toISOString(),
    };
};
