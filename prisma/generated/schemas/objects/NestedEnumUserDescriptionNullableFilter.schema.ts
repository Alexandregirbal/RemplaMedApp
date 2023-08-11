import { z } from "zod";
import { UserDescriptionSchema } from "../enums/UserDescription.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.NestedEnumUserDescriptionNullableFilter> = z
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
                    () => NestedEnumUserDescriptionNullableFilterObjectSchema
                ),
            ])
            .optional()
            .nullable(),
    })
    .strict();

export const NestedEnumUserDescriptionNullableFilterObjectSchema = Schema;
