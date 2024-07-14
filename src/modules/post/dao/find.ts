import dayjs from "dayjs";
import type { FilterQuery } from "mongoose";
import { PostModel } from "server/database/models/post/model";
import type { Post } from "server/database/models/post/types";
import mongooseConnect from "server/database/mongoose";
import { parseObjectToSerialize } from "server/database/parseMongoObject";
import { type MetaData } from "../types/metadata";

const MIN_DATE = dayjs().subtract(3, "month");

export const findOnePost = async (
    id: string | undefined
): Promise<Post | null> => {
    if (!id) {
        return null;
    }

    await mongooseConnect();

    const post = await PostModel.findOne({ _id: id, published: true }).lean();
    return post;
};

export const findManyPosts = async (params: FilterQuery<Post>) => {
    await mongooseConnect();

    const posts = await PostModel.find(
        {
            published: true,
            createdAt: {
                $gte: MIN_DATE.toDate(),
            },
            ...params,
        },
        undefined,
        {
            sort: {
                createdAt: -1,
            },
        }
    ).lean();
    return posts.map(parseObjectToSerialize);
};

export const findPostsIds = async (): Promise<
    Array<{ _id: string; createdAt: Date }>
> => {
    await mongooseConnect();

    const posts = await PostModel.find(
        {
            published: true,
        },
        { _id: true, createdAt: true },
        { sort: { createdAt: -1 } }
    ).lean();
    return posts.map((post) => {
        return { _id: post._id.toString(), createdAt: post.createdAt };
    });
};

export const getMetaData = async (): Promise<MetaData> => {
    await mongooseConnect();

    const totalOverallPosts = await PostModel.countDocuments({
        published: true,
    });

    const totalRecentPosts = await PostModel.countDocuments({
        published: true,
        createdAt: {
            $gte: MIN_DATE.toDate(),
        },
    });

    return { totalOverallPosts, totalRecentPosts };
};

export const findUserPosts = async (
    userId: string | undefined
): Promise<Post[]> => {
    if (!userId) {
        return [];
    }
    await mongooseConnect();

    const posts = await PostModel.find(
        {
            authorId: userId,
        },
        {
            sort: { createdAt: -1 },
        }
    );

    return posts;
};

export const findPostByPaymentId = async (
    paymentId: string | undefined
): Promise<Post | null> => {
    if (!paymentId) {
        return null;
    }

    await mongooseConnect();

    const post = await PostModel.findOne({ paymentId });
    return post;
};
