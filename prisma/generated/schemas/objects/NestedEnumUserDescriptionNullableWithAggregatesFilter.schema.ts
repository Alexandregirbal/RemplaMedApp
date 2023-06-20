import { z } from "zod";
import { UserDescriptionSchema } from "../enums/UserDescription.schema";
import { NestedIntNullableFilterObjectSchema } from "./NestedIntNullableFilter.schema";
import { NestedEnumUserDescriptionNullableFilterObjectSchema } from "./NestedEnumUserDescriptionNullableFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.NestedEnumUserDescriptionNullableWithAggregatesFilter> =
    z
        .object({
            equals: z
                .lazy(() => UserDescriptionSchema)
                .optional()
                .nullable(),
            in: z
                .lazy(() => UserDescriptionSchema)
                .array()
                .optional()
                .nullable(),
            notIn: z
                .lazy(() => UserDescriptionSchema)
                .array()
                .optional()
                .nullable(),
            not: z
                .union([
                    z.lazy(() => UserDescriptionSchema),
                    z.lazy(
                        () =>
                            NestedEnumUserDescriptionNullableWithAggregatesFilterObjectSchema
                    ),
                ])
                .optional()
                .nullable(),
            _count: z
                .lazy(() => NestedIntNullableFilterObjectSchema)
                .optional(),
            _min: z
                .lazy(() => NestedEnumUserDescriptionNullableFilterObjectSchema)
                .optional(),
            _max: z
                .lazy(() => NestedEnumUserDescriptionNullableFilterObjectSchema)
                .optional(),
        })
        .strict();

export const NestedEnumUserDescriptionNullableWithAggregatesFilterObjectSchema =
    Schema;
