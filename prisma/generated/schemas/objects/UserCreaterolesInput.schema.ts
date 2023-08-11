import { z } from "zod";
import { RoleSchema } from "../enums/Role.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserCreaterolesInput> = z
    .object({
        set: z.lazy(() => RoleSchema).array(),
    })
    .strict();

export const UserCreaterolesInputObjectSchema = Schema;
