import { z } from "zod";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostUncheckedCreateInput> = z
    .object({
        id: z.string().optional(),
        authorId: z.string(),
        title: z.string(),
        postalCode: z.string(),
        city: z.string().optional().nullable(),
        latitude: z.number().optional().nullable(),
        longitude: z.number().optional().nullable(),
        message: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional().nullable(),
        availablityFrom: z.coerce.date().optional().nullable(),
        availablityTo: z.coerce.date().optional().nullable(),
        views: z.number().optional(),
    })
    .strict();

export const PostUncheckedCreateInputObjectSchema = Schema;
