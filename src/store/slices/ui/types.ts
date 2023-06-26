export type Toaster = {
    message: string;
    type: "success" | "error" | "debug";
};

export type UIState = {
    isLoading: boolean;
    isMobile: boolean;
    toaster: Toaster | null;
};
