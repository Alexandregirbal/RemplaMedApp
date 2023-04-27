import type { Prisma } from "@prisma/client";
import { prisma } from "../../../server/db";

export const createOnePost = async (post: Prisma.PostCreateInput) => {
    const user = await prisma.post.create({
        data: post,
    });

    return user;
};
