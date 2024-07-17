import { baseMongoObject } from "server/database/types";
import { z } from "zod";

export enum UserDescription {
    OWNER = "OWNER",
    REPLACER = "REPLACER",
    STUDENT = "STUDENT",
    OTHER = "OTHER",
}

export const userDataZod = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    emailVerified: z.date().optional(),
    image: z.string().optional(),
    description: z.nativeEnum(UserDescription),
    phoneNumber: z.string().optional(),
    accounts: z.array(z.string()).optional(),
    sessions: z.array(z.string()).optional(),
    posts: z.array(z.string()).optional(),
    roles: z.array(z.string()).optional(),
    postsViewed: z.array(z.string()),
});

export type UserData = z.infer<typeof userDataZod>;

export const userZod = userDataZod.merge(baseMongoObject);

export type User = z.infer<typeof userZod>;
