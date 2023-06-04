import type { Post, User } from "@prisma/client";

export type PostDateFields = {
    createdAt: string;
    updatedAt?: string;
    availablityFrom?: string;
    availablityTo?: string;
};

export type PostWithDatesStrings = Omit<
    Post,
    "createdAt" | "updatedAt" | "availablityFrom" | "availablityTo"
> &
    PostDateFields;

export type PostWithAuthorName = PostWithDatesStrings & {
    author: Pick<User, "name">;
};
