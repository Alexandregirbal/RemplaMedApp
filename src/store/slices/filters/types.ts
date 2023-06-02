export type FiltersState = {
    displayMode: "list" | "map";
    dates: {
        from: Date | null;
        to: Date | null;
    };
    sortBy: "distance" | "date"; //| "dateFrom" | "dateTo";
};

export const isDisplayMode = (
    displayMode: string
): displayMode is FiltersState["displayMode"] => {
    return ["list", "map"].includes(displayMode);
};

export const isSortBy = (sortBy: string): sortBy is FiltersState["sortBy"] => {
    return ["distance", "date", "dateFrom", "dateTo"].includes(sortBy);
};
