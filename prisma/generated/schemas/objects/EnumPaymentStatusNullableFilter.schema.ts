import { z } from "zod";
import { PaymentStatusSchema } from "../enums/PaymentStatus.schema";
import { NestedEnumPaymentStatusNullableFilterObjectSchema } from "./NestedEnumPaymentStatusNullableFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.EnumPaymentStatusNullableFilter> = z
    .object({
        equals: z
            .lazy(() => PaymentStatusSchema)
            .optional()
            .nullable(),
        in: z
            .lazy(() => PaymentStatusSchema)
            .array()
            .optional()
            .nullable(),
        notIn: z
            .lazy(() => PaymentStatusSchema)
            .array()
            .optional()
            .nullable(),
        not: z
            .union([
                z.lazy(() => PaymentStatusSchema),
                z.lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema),
            ])
            .optional()
            .nullable(),
    })
    .strict();

export const EnumPaymentStatusNullableFilterObjectSchema = Schema;
