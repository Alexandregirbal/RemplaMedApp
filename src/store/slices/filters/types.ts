import type { PostIntent } from "server/database/models/post/types";

export type FiltersState = {
    dates: {
        from: string | null;
        to: string | null;
    };
    createdAt: {
        value: number;
        label: string;
    };
    notViewed: boolean;
    intent: PostIntent | null;
};
