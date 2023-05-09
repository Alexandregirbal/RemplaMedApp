import { z } from "zod";
import { RoleSchema } from "../enums/Role.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.EnumRoleNullableListFilter> = z
    .object({
        equals: z
            .lazy(() => RoleSchema)
            .array()
            .optional()
            .nullable(),
        has: z
            .lazy(() => RoleSchema)
            .optional()
            .nullable(),
        hasEvery: z
            .lazy(() => RoleSchema)
            .array()
            .optional(),
        hasSome: z
            .lazy(() => RoleSchema)
            .array()
            .optional(),
        isEmpty: z.boolean().optional(),
    })
    .strict();

export const EnumRoleNullableListFilterObjectSchema = Schema;
