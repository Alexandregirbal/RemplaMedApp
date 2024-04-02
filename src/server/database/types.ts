import { z } from "zod";

export const baseMongooseObjectZod = z.object({
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});
