export type Toaster = {
    message: string;
    type: "success" | "error" | "debug";
};

export type UIState = {
    isLoading: boolean;
    toaster: Toaster | null;
};
