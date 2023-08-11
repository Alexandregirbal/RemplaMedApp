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
    name: string;
}) => {
    const { userId, name } = params;
    return await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: name,
        },
    });
};
