import { z } from "zod";
import { UserDescriptionSchema } from "../enums/UserDescription.schema";
import { UserCreaterolesInputObjectSchema } from "./UserCreaterolesInput.schema";
import { RoleSchema } from "../enums/Role.schema";
import { UserCreatepostsViewedInputObjectSchema } from "./UserCreatepostsViewedInput.schema";
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./AccountUncheckedCreateNestedManyWithoutUserInput.schema";
import { PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from "./PostUncheckedCreateNestedManyWithoutAuthorInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z
    .object({
        id: z.string().optional(),
        name: z.string().optional().nullable(),
        email: z.string().optional().nullable(),
        password: z.string().optional().nullable(),
        emailVerified: z.date().optional().nullable(),
        image: z.string().optional().nullable(),
        description: z
            .lazy(() => UserDescriptionSchema)
            .optional()
            .nullable(),
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
            .lazy(
                () =>
                    AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema
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

export const UserUncheckedCreateWithoutSessionsInputObjectSchema = Schema;
