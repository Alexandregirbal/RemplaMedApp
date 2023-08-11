import { z } from "zod";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
import { DateTimeNullableFilterObjectSchema } from "./DateTimeNullableFilter.schema";
import { EnumUserDescriptionNullableFilterObjectSchema } from "./EnumUserDescriptionNullableFilter.schema";
import { UserDescriptionSchema } from "../enums/UserDescription.schema";
import { EnumRoleNullableListFilterObjectSchema } from "./EnumRoleNullableListFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { StringNullableListFilterObjectSchema } from "./StringNullableListFilter.schema";
import { AccountListRelationFilterObjectSchema } from "./AccountListRelationFilter.schema";
import { SessionListRelationFilterObjectSchema } from "./SessionListRelationFilter.schema";
import { PostListRelationFilterObjectSchema } from "./PostListRelationFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => UserWhereInputObjectSchema),
                z.lazy(() => UserWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => UserWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => UserWhereInputObjectSchema),
                z.lazy(() => UserWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        name: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        email: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        password: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        emailVerified: z
            .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
            .optional()
            .nullable(),
        image: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        description: z
            .union([
                z.lazy(() => EnumUserDescriptionNullableFilterObjectSchema),
                z.lazy(() => UserDescriptionSchema),
            ])
            .optional()
            .nullable(),
        roles: z.lazy(() => EnumRoleNullableListFilterObjectSchema).optional(),
        createdAt: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
            .optional(),
        postsViewed: z
            .lazy(() => StringNullableListFilterObjectSchema)
            .optional(),
        accounts: z
            .lazy(() => AccountListRelationFilterObjectSchema)
            .optional(),
        sessions: z
            .lazy(() => SessionListRelationFilterObjectSchema)
            .optional(),
        posts: z.lazy(() => PostListRelationFilterObjectSchema).optional(),
    })
    .strict();

export const UserWhereInputObjectSchema = Schema;
