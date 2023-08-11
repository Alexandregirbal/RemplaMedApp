import { z } from "zod";
import { UserDescriptionSchema } from "../enums/UserDescription.schema";
import { NestedEnumUserDescriptionNullableFilterObjectSchema } from "./NestedEnumUserDescriptionNullableFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.EnumUserDescriptionNullableFilter> = z
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

export const EnumUserDescriptionNullableFilterObjectSchema = Schema;
