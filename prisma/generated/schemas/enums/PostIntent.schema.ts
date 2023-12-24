import { z } from "zod";

export const PostIntentSchema = z.enum([
    "remplacement_offer",
    "remplacement_search",
    "partnership",
    "transaction",
    "other",
]);
