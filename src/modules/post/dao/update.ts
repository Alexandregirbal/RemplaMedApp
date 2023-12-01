import { PaymentStatus } from "@mollie/api-client";
import { prisma } from "server/db";

export const incrementPostViews = async (postId: string) => {
    return await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            views: {
                increment: 1,
            },
        },
    });
};

export const setPublishedPost = async (postId: string) => {
    return await prisma.post.update({
        data: {
            published: true,
        },
        where: {
            id: postId,
        },
    });
};

export const togglePublished = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });
    if (!post) {
        return {
            success: false,
            error: "Post not found",
        };
    }
    if (post.paymentStatus !== PaymentStatus.paid) {
        return {
            success: false,
            error: "Post is not paid, cannot update the published status",
        };
    }
    const newPost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            published: !post.published,
        },
    });
    return {
        success: true,
        data: newPost,
    };
};
