export const getNewZoomedValue = (zoom: number) =>
    Math.max(Math.min(zoom + Math.exp(zoom / 5), 12), 0);
