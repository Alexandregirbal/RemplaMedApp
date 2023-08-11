import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostAvgOrderByAggregateInput> = z
    .object({
        latitude: z.lazy(() => SortOrderSchema).optional(),
        longitude: z.lazy(() => SortOrderSchema).optional(),
        views: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostAvgOrderByAggregateInputObjectSchema = Schema;
