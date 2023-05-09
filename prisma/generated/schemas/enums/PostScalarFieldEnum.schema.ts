import { z } from "zod";

export const PostScalarFieldEnumSchema = z.enum([
    "id",
    "authorId",
    "published",
    "title",
    "postalCode",
    "message",
    "createdAt",
    "updatedAt",
    "availablityFrom",
    "availablityTo",
    "views",
]);
