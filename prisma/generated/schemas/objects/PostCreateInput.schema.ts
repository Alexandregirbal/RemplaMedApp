import { z } from "zod";
import { UserCreateNestedOneWithoutPostInputObjectSchema } from "./UserCreateNestedOneWithoutPostInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostCreateInput> = z
    .object({
        id: z.string().optional(),
        published: z.boolean().optional(),
        title: z.string(),
        postalCode: z.string(),
        message: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional().nullable(),
        availablityFrom: z.coerce.date().optional().nullable(),
        availablityTo: z.coerce.date().optional().nullable(),
        views: z.number().optional(),
        author: z.lazy(() => UserCreateNestedOneWithoutPostInputObjectSchema),
    })
    .strict();

export const PostCreateInputObjectSchema = Schema;
