import { z } from "zod";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { BoolFilterObjectSchema } from "./BoolFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { DateTimeNullableFilterObjectSchema } from "./DateTimeNullableFilter.schema";
import { IntFilterObjectSchema } from "./IntFilter.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostScalarWhereInput> = z
    .object({
        AND: z
            .union([
                z.lazy(() => PostScalarWhereInputObjectSchema),
                z.lazy(() => PostScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        OR: z
            .lazy(() => PostScalarWhereInputObjectSchema)
            .array()
            .optional(),
        NOT: z
            .union([
                z.lazy(() => PostScalarWhereInputObjectSchema),
                z.lazy(() => PostScalarWhereInputObjectSchema).array(),
            ])
            .optional(),
        id: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        authorId: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        published: z
            .union([z.lazy(() => BoolFilterObjectSchema), z.boolean()])
            .optional(),
        title: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        postalCode: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        message: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        createdAt: z
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
            .optional(),
        updatedAt: z
            .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
            .optional()
            .nullable(),
        availablityFrom: z
            .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
            .optional()
            .nullable(),
        availablityTo: z
            .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
            .optional()
            .nullable(),
        views: z
            .union([z.lazy(() => IntFilterObjectSchema), z.number()])
            .optional(),
    })
    .strict();

export const PostScalarWhereInputObjectSchema = Schema;
