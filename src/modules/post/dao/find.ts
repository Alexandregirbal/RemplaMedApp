import type { Post, Prisma } from "@prisma/client";
import { prisma } from "server/db";
import { postToPostWithDatesStrings } from "../services/postWithDatesStrings";
import { type MetaData } from "../types/metadata";
import type { PostWithDatesStrings, PostWithAuthorName } from "../types/post";
import dayjs from "dayjs";

const MIN_DATE = dayjs().subtract(3, "month");

export const findOnePost = async (
    id: string | undefined
): Promise<PostWithAuthorName | null> => {
    if (!id) {
        return null;
    }

    try {
        const post = await prisma.post.findUniqueOrThrow({
            where: { id },
            include: {
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return postToPostWithDatesStrings(post);
    } catch (error) {
        return null;
    }
};

export const findManyPosts = async (
    params: Omit<Prisma.PostFindManyArgs, "orderBy">
): Promise<Array<PostWithAuthorName>> => {
    const posts = await prisma.post.findMany({
        ...params,
        include: {
            author: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        where: {
            createdAt: {
                gte: MIN_DATE.toDate(),
            },
            ...params.where,
        },
    });
    return posts.map((post) => postToPostWithDatesStrings(post));
};

export const findPostsIds = async (): Promise<Array<Pick<Post, "id">>> => {
    const postsIds = await prisma.post.findMany({ select: { id: true } });
    return postsIds;
};

export const getMetaData = async (): Promise<MetaData> => {
    const totalOverallPosts = await prisma.post.count();

    const totalRecentPosts = await prisma.post.count({
        where: {
            createdAt: {
                gte: MIN_DATE.toDate(),
            },
        },
    });

    return { totalOverallPosts, totalRecentPosts };
};

export const findUserPosts = async (
    userId: string | undefined
): Promise<PostWithDatesStrings[]> => {
    if (!userId) {
        return [];
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return posts.map((post) => postToPostWithDatesStrings(post));
};
