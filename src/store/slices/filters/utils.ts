import type { FiltersState } from "./types";

export const isAnyFilterSet = (filters: FiltersState) => {
    return (
        filters.createdAt.value !== 0 ||
        filters.dates.from !== null ||
        filters.dates.to !== null ||
        filters.notViewed ||
        filters.intent
    );
};

export const isCreatedAtFilterSet = (createdAt: FiltersState["createdAt"]) => {
    return createdAt.value !== 0;
};

export const isDatesFilterSet = (dates: FiltersState["dates"]) => {
    return dates.from !== null && dates.to !== null;
};

export const isNotViewedFilterSet = (notViewed: FiltersState["notViewed"]) => {
    return !!notViewed;
};

export const isIntentFilterSet = (intent: FiltersState["intent"]) => {
    return !!intent;
};
