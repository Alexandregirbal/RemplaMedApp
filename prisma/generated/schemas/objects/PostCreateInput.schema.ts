import { z } from "zod";
import { PostIntentSchema } from "../enums/PostIntent.schema";
import { SourceSchema } from "../enums/Source.schema";
import { PaymentStatusSchema } from "../enums/PaymentStatus.schema";
import { UserCreateNestedOneWithoutPostsInputObjectSchema } from "./UserCreateNestedOneWithoutPostsInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostCreateInput> = z
    .object({
        id: z.string().optional(),
        published: z.boolean().optional(),
        intent: z.lazy(() => PostIntentSchema).optional(),
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
        author: z.lazy(() => UserCreateNestedOneWithoutPostsInputObjectSchema),
    })
    .strict();

export const PostCreateInputObjectSchema = Schema;
