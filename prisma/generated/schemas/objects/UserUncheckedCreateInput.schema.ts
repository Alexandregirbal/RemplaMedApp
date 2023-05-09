import { z } from "zod";
import { UserCreaterolesInputObjectSchema } from "./UserCreaterolesInput.schema";
import { RoleSchema } from "../enums/Role.schema";
import { AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./AccountUncheckedCreateNestedManyWithoutUserInput.schema";
import { SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from "./SessionUncheckedCreateNestedManyWithoutUserInput.schema";
import { PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema } from "./PostUncheckedCreateNestedManyWithoutAuthorInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
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
        accounts: z
            .lazy(
                () =>
                    AccountUncheckedCreateNestedManyWithoutUserInputObjectSchema
            )
            .optional(),
        sessions: z
            .lazy(
                () =>
                    SessionUncheckedCreateNestedManyWithoutUserInputObjectSchema
            )
            .optional(),
        Post: z
            .lazy(
                () =>
                    PostUncheckedCreateNestedManyWithoutAuthorInputObjectSchema
            )
            .optional(),
    })
    .strict();

export const UserUncheckedCreateInputObjectSchema = Schema;
