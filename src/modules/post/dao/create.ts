import type { Post } from "@prisma/client";
import { prisma } from "../../../server/db";

export const createOnePost = async (post: Post) => {
    const user = await prisma.post.create({
        data: post,
    });

    return user;
};
