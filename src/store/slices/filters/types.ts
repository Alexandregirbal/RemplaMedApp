import type { PostWithAuthorName } from "modules/post/types/post";

type Results = { postsIds: Array<PostWithAuthorName["id"]> };

export type FiltersState = {
    dates: {
        from: string | null;
        to: string | null;
    } & Results;
    createdAt: {
        value: number;
        label: string;
    } & Results;
};
