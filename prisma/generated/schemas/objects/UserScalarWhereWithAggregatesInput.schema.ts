import { z } from "zod";
import { StringWithAggregatesFilterObjectSchema } from "./StringWithAggregatesFilter.schema";
import { StringNullableWithAggregatesFilterObjectSchema } from "./StringNullableWithAggregatesFilter.schema";
import { DateTimeNullableWithAggregatesFilterObjectSchema } from "./DateTimeNullableWithAggregatesFilter.schema";
import { EnumUserDescriptionNullableWithAggregatesFilterObjectSchema } from "./EnumUserDescriptionNullableWithAggregatesFilter.schema";
import { UserDescriptionSchema } from "../enums/UserDescription.schema";
import { EnumRoleNullableListFilterObjectSchema } from "./EnumRoleNullableListFilter.schema";
import { DateTimeWithAggregatesFilterObjectSchema } from "./DateTimeWithAggregatesFilter.schema";
import { StringNullableListFilterObjectSchema } from "./StringNullableListFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
                z
                    .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
                    .array(),
            ])
            .optional(),
        OR: z
            .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => UserScalarWhereWithAggregatesInputObjectSchema),
                z
                    .lazy(() => UserScalarWhereWithAggregatesInputObjectSchema)
                    .array(),
            ])
            .optional(),
        id: z
            .union([
                z.lazy(() => StringWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional(),
        name: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
        email: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
        password: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
        emailVerified: z
            .union([
                z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema),
                z.date(),
            ])
            .optional()
            .nullable(),
        image: z
            .union([
                z.lazy(() => StringNullableWithAggregatesFilterObjectSchema),
                z.string(),
            ])
            .optional()
            .nullable(),
        description: z
            .union([
                z.lazy(
                    () =>
                        EnumUserDescriptionNullableWithAggregatesFilterObjectSchema
                ),
                z.lazy(() => UserDescriptionSchema),
            ])
            .optional()
            .nullable(),
        roles: z.lazy(() => EnumRoleNullableListFilterObjectSchema).optional(),
        createdAt: z
            .union([
                z.lazy(() => DateTimeWithAggregatesFilterObjectSchema),
                z.date(),
            ])
            .optional(),
        postsViewed: z
            .lazy(() => StringNullableListFilterObjectSchema)
            .optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputObjectSchema = Schema;
