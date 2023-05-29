import type { Prisma } from "@prisma/client";
import { getLocationFromPostalCode } from "modules/geocode";
import { prisma } from "server/db";

export const createOnePost = async (post: Prisma.PostUncheckedCreateInput) => {
    const geocodeData = await getLocationFromPostalCode(post.postalCode);
    const enrichedPost = {
        ...post,
        ...geocodeData,
    };

    const newPost = await prisma.post.create({
        data: enrichedPost,
    });

    return newPost;
};
