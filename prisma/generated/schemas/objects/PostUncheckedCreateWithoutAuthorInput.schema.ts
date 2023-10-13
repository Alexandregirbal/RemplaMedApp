import { z } from "zod";
import { SourceSchema } from "../enums/Source.schema";
import { PaymentStatusSchema } from "../enums/PaymentStatus.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostUncheckedCreateWithoutAuthorInput> = z
    .object({
        id: z.string().optional(),
        published: z.boolean().optional(),
        title: z.string(),
        postalCode: z.string(),
        city: z.string().optional().nullable(),
        latitude: z.number().optional().nullable(),
        longitude: z.number().optional().nullable(),
        message: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional().nullable(),
        availablityFrom: z.date(),
        availablityTo: z.date().optional().nullable(),
        views: z.number().optional(),
        source: z
            .lazy(() => SourceSchema)
            .optional()
            .nullable(),
        paymentId: z.string().optional().nullable(),
        paymentStatus: z
            .lazy(() => PaymentStatusSchema)
            .optional()
            .nullable(),
    })
    .strict();

export const PostUncheckedCreateWithoutAuthorInputObjectSchema = Schema;
