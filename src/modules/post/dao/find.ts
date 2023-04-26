import type { Post, Prisma } from "@prisma/client";
import { prisma } from "../../../server/db";

export const findOnePost = async (
    id: string | undefined
): Promise<Post | null> => {
    if (!id) {
        return null;
    }

    try {
        const post = await prisma.post.findUniqueOrThrow({
            where: { id },
        });

        return post;
    } catch (error) {
        return null;
    }
};

export const findManyPosts = async (
    params: Prisma.PostFindManyArgs
): Promise<Post[]> => {
    const posts = await prisma.post.findMany(params);
    return posts;
};
