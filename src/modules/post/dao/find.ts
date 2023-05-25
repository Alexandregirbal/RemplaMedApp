import type { Post, Prisma } from "@prisma/client";
import { prisma } from "server/db";
import { MetaData } from "../types/metadata";
const JOUR = 1000 * 60 * 60 * 24;
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

export const getMetaData = async (): Promise<MetaData> => {
    const totalOverallPosts = await prisma.post.count();

    const totalRecentPosts = await prisma.post.count({
        where: {
            createdAt: {
                gt: new Date(new Date().getTime() - 31 * JOUR),
            },
        },
    });

    return { totalOverallPosts, totalRecentPosts };
};
