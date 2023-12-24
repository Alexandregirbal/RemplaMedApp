import { z } from "zod";

export const PostIntentSchema = z.enum([
    "replacementOffer",
    "replacementSearch",
    "partnership",
    "transaction",
    "other",
]);
