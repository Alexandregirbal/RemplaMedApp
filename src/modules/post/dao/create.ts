import type { Prisma } from "@prisma/client";
import { getGeocodeDataFromPostalCode } from "modules/geocode";
import { prisma } from "server/db";

export const createOnePost = async (post: Prisma.PostUncheckedCreateInput) => {
    const geocodeData = await getGeocodeDataFromPostalCode(post.postalCode);
    const enrichedPost = {
        ...post,
        ...geocodeData[0], // TODO use a city to help finding the right geocodeData
    };

    const newPost = await prisma.post.create({
        data: enrichedPost,
    });

    return newPost;
};
