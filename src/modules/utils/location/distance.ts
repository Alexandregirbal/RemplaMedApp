import type { Coordinates } from "modules/filters/types/distance";
import { GeoPosition } from "geo-position.ts";

type DistanceParams = {
    current: Coordinates;
    away: Coordinates;
};

export const distanceKm = (params: DistanceParams) => {
    const { current, away } = params;
    const currentPostition = new GeoPosition(
        current.latitude,
        current.longitude
    );
    const awayPostition = new GeoPosition(away.latitude, away.longitude);
    return +(currentPostition.Distance(awayPostition) / 1000).toFixed(0);
};
