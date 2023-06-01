import type { Post, User } from "@prisma/client";

export type PostDateFields = {
    createdAt: string;
    updatedAt?: string;
    availablityFrom?: string;
    availablityTo?: string;
};

export type PostWithDatesStrings = Post & {
    createdAt: string;
    updatedAt: string;
    availablityFrom: string;
    availablityTo: string;
};

export type PostWithAuthorName = PostWithDatesStrings & {
    author: Pick<User, "name">;
};
