export type FiltersState = {
    dates: {
        from: string | null;
        to: string | null;
    };
    createdAt: {
        value: number;
        label: string;
    };
};
