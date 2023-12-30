import type { PostIntent } from "@prisma/client";

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
