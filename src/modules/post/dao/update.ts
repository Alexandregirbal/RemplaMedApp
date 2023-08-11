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
