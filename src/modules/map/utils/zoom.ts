export const getNewZoomedValue = (params: {
    zoom: number;
    min: number;
    max: number;
}): number => {
    const { zoom, min, max } = params;
    return Number(
        Math.max(Math.min(zoom + Math.exp(zoom / min), max), min).toFixed(2)
    );
};
