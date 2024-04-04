import type { UserDescription } from "@prisma/client";
import { prisma } from "server/db";

export const addPostViewed = async (params: {
    postId: string;
    userId: string;
}) => {
    const { postId, userId } = params;
    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            postsViewed: {
                push: postId,
            },
        },
    });
};

export const updateProfile = async (params: {
    userId: string;
    name?: string;
    phoneNumber?: string;
    description?: UserDescription;
}) => {
    const { userId, name, description, phoneNumber } = params;
    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ...(name ? { name } : {}),
            ...(phoneNumber ? { phoneNumber: phoneNumber } : {}),
            ...(description ? { description: description } : {}),
        },
    });
};
