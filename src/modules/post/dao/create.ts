import type { Prisma } from "@prisma/client";
import { prisma } from "../../../server/db";

export const createOnePost = async (post: Prisma.PostUncheckedCreateInput) => {
    const newPost = await prisma.post.create({
        data: post,
    });

    return newPost;
};
