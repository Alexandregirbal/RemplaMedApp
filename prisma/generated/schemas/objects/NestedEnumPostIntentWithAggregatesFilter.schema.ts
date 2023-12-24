import { z } from "zod";
import { PostIntentSchema } from "../enums/PostIntent.schema";
import { NestedIntFilterObjectSchema } from "./NestedIntFilter.schema";
import { NestedEnumPostIntentFilterObjectSchema } from "./NestedEnumPostIntentFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.NestedEnumPostIntentWithAggregatesFilter> = z
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
                z.lazy(
                    () => NestedEnumPostIntentWithAggregatesFilterObjectSchema
                ),
            ])
            .optional(),
        _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
        _min: z.lazy(() => NestedEnumPostIntentFilterObjectSchema).optional(),
        _max: z.lazy(() => NestedEnumPostIntentFilterObjectSchema).optional(),
    })
    .strict();

export const NestedEnumPostIntentWithAggregatesFilterObjectSchema = Schema;
