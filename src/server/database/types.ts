import { Types } from "mongoose";
import { z } from "zod";

export const baseMongoObject = z.object({
    _id: z.instanceof(Types.ObjectId).or(z.string()),
    createdAt: z.date(),
    updatedAt: z.date(),
});
