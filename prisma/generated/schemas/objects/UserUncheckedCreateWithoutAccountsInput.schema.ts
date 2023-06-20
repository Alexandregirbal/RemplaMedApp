import { z } from "zod";
import { UserCreaterolesInputObjectSchema } from "./UserCreaterolesInput.schema";
import { RoleSchema } from "../enums/Role.schema";
import { UserCreatepostsViewedInputObjectSchema } from "./UserCreatepostsViewedInput.schema";
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./SessionUncheckedCreateNestedManyWithoutUserInput.schema";
import { PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from "./PostUncheckedCreateNestedManyWithoutAuthorInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z
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
        sessions: z
            .lazy(
                () =>
                    SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema
            )
            .optional(),
        posts: z
            .lazy(
                () =>
                    PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema
            )
            .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutAccountsInputObjectSchema = Schema;
