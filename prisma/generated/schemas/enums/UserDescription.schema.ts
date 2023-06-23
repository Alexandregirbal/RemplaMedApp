import { z } from "zod";

export const UserDescriptionSchema = z.enum([
    "OWNER",
    "REPLACER",
    "STUDENT",
    "OTHER",
]);
