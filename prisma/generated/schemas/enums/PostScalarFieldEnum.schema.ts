import { z } from "zod";

export const PostScalarFieldEnumSchema = z.enum([
    "id",
    "authorId",
    "published",
    "intent",
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
