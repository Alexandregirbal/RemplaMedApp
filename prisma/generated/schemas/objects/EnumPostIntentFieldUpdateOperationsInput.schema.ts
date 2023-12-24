import { z } from "zod";
import { PostIntentSchema } from "../enums/PostIntent.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.EnumPostIntentFieldUpdateOperationsInput> = z
    .object({
        set: z.lazy(() => PostIntentSchema).optional(),
    })
    .strict();

export const EnumPostIntentFieldUpdateOperationsInputObjectSchema = Schema;
