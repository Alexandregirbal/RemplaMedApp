import { Types } from "mongoose";
import { z } from "zod";

export const baseMongoObject = z.object({
    _id: z.instanceof(Types.ObjectId),
    createdAt: z.date(),
    updatedAt: z.date(),
});
