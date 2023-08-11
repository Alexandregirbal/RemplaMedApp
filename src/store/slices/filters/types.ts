export type FiltersState = {
    displayMode: "list" | "map";
    dates: {
        from: string | null;
        to: string | null;
    };
    sortBy: "distance" | "date";
};

export const isDisplayMode = (
    displayMode: string
): displayMode is FiltersState["displayMode"] => {
    return ["list", "map"].includes(displayMode);
};

export const isSortBy = (sortBy: string): sortBy is FiltersState["sortBy"] => {
    return ["distance", "date", "dateFrom", "dateTo"].includes(sortBy);
};
