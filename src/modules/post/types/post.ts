import type { Post, PostIntent, User } from "@prisma/client";
import { PostIntentSchema } from "../../../../prisma/generated/schemas/enums/PostIntent.schema";

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

export type PostWithAuthorName = PostWithDatesStrings & {
    author: Pick<User, "name">;
};

export const isPostIntent = (value: string): value is PostIntent =>
    PostIntentSchema.safeParse(value).success;
