import type { PostWithAuthorName } from "modules/post/types/post";
import { distanceKm } from "modules/utils/location/distance";
import type { Coordinates } from "../types/distance";

export const sortByDistance = (params: {
    current: Coordinates;
    pointA: Coordinates;
    pointB: Coordinates;
}) => {
    const { current, pointA, pointB } = params;
    const distanceFromA = distanceKm({
        away: pointA,
        current,
    });

    const distanceFromB = distanceKm({
        away: pointB,
        current,
    });
    if (distanceFromA < distanceFromB) return -1;
    else return 1;
};

export const sortByDate = (a: PostWithAuthorName, b: PostWithAuthorName) => {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
};
