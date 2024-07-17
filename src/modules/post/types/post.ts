import type { Post } from "server/database/models/post/types";

export type PostDateFields = {
    createdAt: string;
    updatedAt?: string;
    availablityFrom: string;
    availablityTo?: string;
};

export type PostWithDatesStrings = Omit<
    Post,
    "createdAt" | "updatedAt" | "availablityFrom" | "availablityTo"
> &
    PostDateFields;
