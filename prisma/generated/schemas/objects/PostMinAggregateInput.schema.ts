import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostMinAggregateInputType> = z
    .object({
        id: z.literal(true).optional(),
        authorId: z.literal(true).optional(),
        published: z.literal(true).optional(),
        intent: z.literal(true).optional(),
        title: z.literal(true).optional(),
        postalCode: z.literal(true).optional(),
        city: z.literal(true).optional(),
        latitude: z.literal(true).optional(),
        longitude: z.literal(true).optional(),
        message: z.literal(true).optional(),
        createdAt: z.literal(true).optional(),
        updatedAt: z.literal(true).optional(),
        availablityFrom: z.literal(true).optional(),
        availablityTo: z.literal(true).optional(),
        views: z.literal(true).optional(),
        source: z.literal(true).optional(),
        paymentId: z.literal(true).optional(),
        paymentStatus: z.literal(true).optional(),
    })
    .strict();

export const PostMinAggregateInputObjectSchema = Schema;
