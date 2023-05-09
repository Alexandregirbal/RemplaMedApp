import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostCreateManyAuthorInput> = z
    .object({
        id: z.string().optional(),
        published: z.boolean().optional(),
        title: z.string(),
        postalCode: z.string(),
        message: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional().nullable(),
        availablityFrom: z.date().optional().nullable(),
        availablityTo: z.date().optional().nullable(),
        views: z.number().optional(),
    })
    .strict();

export const PostCreateManyAuthorInputObjectSchema = Schema;
