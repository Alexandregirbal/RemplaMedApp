import dayjs from "dayjs";
import { distanceKm } from "modules/utils/location/distance";
import type { Post } from "server/database/models/post/types";
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

export const sortByDate = (a: Post, b: Post) => {
    if (dayjs(a.createdAt).isBefore(b.createdAt)) return -1;
    if (dayjs(a.createdAt).isAfter(b.createdAt)) return 1;
    return 0;
};
