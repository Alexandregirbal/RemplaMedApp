import type { PostWithAuthorName } from "modules/post/types/post";
import { distance } from "modules/user/services/distance";
import type { Coordinates } from "../types/distance";

export const sortByDistance = (params: {
    current: Coordinates;
    pointA: Coordinates;
    pointB: Coordinates;
}) => {
    const { current, pointA, pointB } = params;
    const distanceFromA = distance({
        away: pointA,
        current,
    });
    const distanceFromB = distance({
        away: pointB,
        current,
    });
    if (distanceFromA < distanceFromB) return -1;
    else return 1;
};

export const sortByCreatedAt = (
    a: PostWithAuthorName,
    b: PostWithAuthorName
) => {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
};
