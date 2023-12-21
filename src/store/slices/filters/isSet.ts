import type { FiltersState } from "./types";

export const isCreatedAtFilterSet = (createdAt: FiltersState["createdAt"]) =>
    createdAt.value !== 0;

export const isDatesFilterSet = (dates: FiltersState["dates"]) =>
    dates.from !== null && dates.to !== null;

export const isNotViewedFilterSet = (notViewed: FiltersState["notViewed"]) =>
    !!notViewed;
