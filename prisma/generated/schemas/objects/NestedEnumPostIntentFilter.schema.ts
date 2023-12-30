import { z } from "zod";
import { PostIntentSchema } from "../enums/PostIntent.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.NestedEnumPostIntentFilter> = z
    .object({
        equals: z.lazy(() => PostIntentSchema).optional(),
        in: z
            .lazy(() => PostIntentSchema)
            .array()
            .optional(),
        notIn: z
            .lazy(() => PostIntentSchema)
            .array()
            .optional(),
        not: z
            .union([
                z.lazy(() => PostIntentSchema),
                z.lazy(() => NestedEnumPostIntentFilterObjectSchema),
            ])
            .optional(),
    })
    .strict();

export const NestedEnumPostIntentFilterObjectSchema = Schema;
