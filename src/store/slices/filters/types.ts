export type FiltersState = {
    displayMode: "list" | "map";
    distance: number;
    dates: {
        from: Date | null;
        to: Date | null;
    };
    sortBy: "distance" | "createdAt" | "dateFrom" | "dateTo";
};

export const isDisplayMode = (
    displayMode: string
): displayMode is FiltersState["displayMode"] => {
    return ["list", "map"].includes(displayMode);
};

export const isSortBy = (sortBy: string): sortBy is FiltersState["sortBy"] => {
    return ["distance", "createdAt", "dateFrom", "dateTo"].includes(sortBy);
};
