import type { Coordinates } from "modules/filters/types/distance";

type DistanceParams = {
    current: Coordinates;
    away: Coordinates;
};

export const distance = (params: DistanceParams) => {
    const { current, away } = params;
    const distance = Math.sqrt(
        Math.pow(current.latitude - away.latitude, 2) +
            Math.pow(current.longitude - away.longitude, 2)
    );

    return distance;
};
