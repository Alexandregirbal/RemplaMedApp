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
