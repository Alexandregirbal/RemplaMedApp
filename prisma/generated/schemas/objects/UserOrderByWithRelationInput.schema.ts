import { z } from "zod";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { AccountOrderByRelationAggregateInputObjectSchema } from "./AccountOrderByRelationAggregateInput.schema";
import { SessionOrderByRelationAggregateInputObjectSchema } from "./SessionOrderByRelationAggregateInput.schema";
import { PostOrderByRelationAggregateInputObjectSchema } from "./PostOrderByRelationAggregateInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
    .object({
        id: z.lazy(() => SortOrderSchema).optional(),
        name: z.lazy(() => SortOrderSchema).optional(),
        email: z.lazy(() => SortOrderSchema).optional(),
        password: z.lazy(() => SortOrderSchema).optional(),
        emailVerified: z.lazy(() => SortOrderSchema).optional(),
        image: z.lazy(() => SortOrderSchema).optional(),
        description: z.lazy(() => SortOrderSchema).optional(),
        roles: z.lazy(() => SortOrderSchema).optional(),
        createdAt: z.lazy(() => SortOrderSchema).optional(),
        postsViewed: z.lazy(() => SortOrderSchema).optional(),
        accounts: z
            .lazy(() => AccountOrderByRelationAggregateInputObjectSchema)
            .optional(),
        sessions: z
            .lazy(() => SessionOrderByRelationAggregateInputObjectSchema)
            .optional(),
        posts: z
            .lazy(() => PostOrderByRelationAggregateInputObjectSchema)
            .optional(),
    })
    .strict();

export const UserOrderByWithRelationInputObjectSchema = Schema;
