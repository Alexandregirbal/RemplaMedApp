import { z } from "zod";
import { PaymentStatusSchema } from "../enums/PaymentStatus.schema";
import { NestedIntNullableFilterObjectSchema } from "./NestedIntNullableFilter.schema";
import { NestedEnumPaymentStatusNullableFilterObjectSchema } from "./NestedEnumPaymentStatusNullableFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.NestedEnumPaymentStatusNullableWithAggregatesFilter> =
    z
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
                    z.lazy(
                        () =>
                            NestedEnumPaymentStatusNullableWithAggregatesFilterObjectSchema
                    ),
                ])
                .optional()
                .nullable(),
            _count: z
                .lazy(() => NestedIntNullableFilterObjectSchema)
                .optional(),
            _min: z
                .lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema)
                .optional(),
            _max: z
                .lazy(() => NestedEnumPaymentStatusNullableFilterObjectSchema)
                .optional(),
        })
        .strict();

export const NestedEnumPaymentStatusNullableWithAggregatesFilterObjectSchema =
    Schema;
