import { z } from "zod";
import { RoleSchema } from "../enums/Role.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUpdaterolesInput> = z
    .object({
        set: z
            .lazy(() => RoleSchema)
            .array()
            .optional(),
        push: z
            .union([z.lazy(() => RoleSchema), z.lazy(() => RoleSchema).array()])
            .optional(),
    })
    .strict();

export const UserUpdaterolesInputObjectSchema = Schema;
