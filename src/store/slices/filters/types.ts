export type FiltersState = {
    displayMode: "list" | "map";
    distance: number;
    dates: {
        from: Date | null;
        to: Date | null;
    };
    sortBy: "distance" | "createdAt" | "dateFrom" | "dateTo";
};
