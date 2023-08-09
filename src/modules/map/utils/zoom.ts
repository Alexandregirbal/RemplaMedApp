export const getNewZoomedValue = (params: {
    zoom: number;
    min: number;
    max: number;
}) => {
    const { zoom, min, max } = params;
    return Math.max(Math.min(zoom + Math.exp(zoom / min), max), 0);
};
