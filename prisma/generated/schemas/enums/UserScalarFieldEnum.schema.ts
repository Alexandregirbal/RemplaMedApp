import { z } from "zod";

export const UserScalarFieldEnumSchema = z.enum([
    "id",
    "name",
    "email",
    "password",
    "emailVerified",
    "image",
    "description",
    "roles",
    "createdAt",
    "postsViewed",
]);
