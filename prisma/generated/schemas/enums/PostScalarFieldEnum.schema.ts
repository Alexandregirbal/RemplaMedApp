import { z } from "zod";

export const PostScalarFieldEnumSchema = z.enum([
    "id",
    "authorId",
    "published",
    "title",
    "postalCode",
    "city",
    "latitude",
    "longitude",
    "message",
    "createdAt",
    "updatedAt",
    "availablityFrom",
    "availablityTo",
    "views",
    "source",
    "paymentId",
    "paymentStatus",
]);
