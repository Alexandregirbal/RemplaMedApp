import { z } from "zod";
import { UserCreaterolesInputObjectSchema } from "./UserCreaterolesInput.schema";
import { RoleSchema } from "../enums/Role.schema";
import { UserCreatepostsViewedInputObjectSchema } from "./UserCreatepostsViewedInput.schema";
import { AccountCreateNestedManyWithoutUserInputObjectSchema } from "./AccountCreateNestedManyWithoutUserInput.schema";
import { SessionCreateNestedManyWithoutUserInputObjectSchema } from "./SessionCreateNestedManyWithoutUserInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserCreateWithoutPostsInput> = z
    .object({
        id: z.string().optional(),
        name: z.string().optional().nullable(),
        email: z.string().optional().nullable(),
        password: z.string().optional().nullable(),
        emailVerified: z.date().optional().nullable(),
        image: z.string().optional().nullable(),
        roles: z
            .union([
                z.lazy(() => UserCreaterolesInputObjectSchema),
                z.lazy(() => RoleSchema).array(),
            ])
            .optional(),
        createdAt: z.date().optional(),
        postsViewed: z
            .union([
                z.lazy(() => UserCreatepostsViewedInputObjectSchema),
                z.string().array(),
            ])
            .optional(),
        accounts: z
            .lazy(() => AccountCreateNestedManyWithoutUserInputObjectSchema)
            .optional(),
        sessions: z
            .lazy(() => SessionCreateNestedManyWithoutUserInputObjectSchema)
            .optional(),
    })
    .strict();

export const UserCreateWithoutPostsInputObjectSchema = Schema;
