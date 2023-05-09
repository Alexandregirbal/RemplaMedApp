import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostCountAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        authorId: z.literal(true).optional(),
        published: z.literal(true).optional(),
        title: z.literal(true).optional(),
        postalCode: z.literal(true).optional(),
        message: z.literal(true).optional(),
        createdAt: z.literal(true).optional(),
        updatedAt: z.literal(true).optional(),
        availablityFrom: z.literal(true).optional(),
        availablityTo: z.literal(true).optional(),
        views: z.literal(true).optional(),
        _all: z.literal(true).optional(),
    })
    .strict();

export const PostCountAggregateInputObjectSchema = Schema;
