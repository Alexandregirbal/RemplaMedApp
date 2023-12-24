import { z } from "zod";
import { StringFilterObjectSchema } from "./StringFilter.schema";
import { BoolFilterObjectSchema } from "./BoolFilter.schema";
import { EnumPostIntentFilterObjectSchema } from "./EnumPostIntentFilter.schema";
import { PostIntentSchema } from "../enums/PostIntent.schema";
import { StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
import { FloatNullableFilterObjectSchema } from "./FloatNullableFilter.schema";
import { DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { DateTimeNullableFilterObjectSchema } from "./DateTimeNullableFilter.schema";
import { IntFilterObjectSchema } from "./IntFilter.schema";
import { EnumSourceNullableFilterObjectSchema } from "./EnumSourceNullableFilter.schema";
import { SourceSchema } from "../enums/Source.schema";
import { EnumPaymentStatusNullableFilterObjectSchema } from "./EnumPaymentStatusNullableFilter.schema";
import { PaymentStatusSchema } from "../enums/PaymentStatus.schema";

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
        intent: z
            .union([
                z.lazy(() => EnumPostIntentFilterObjectSchema),
                z.lazy(() => PostIntentSchema),
            ])
            .optional(),
        title: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        postalCode: z
            .union([z.lazy(() => StringFilterObjectSchema), z.string()])
            .optional(),
        city: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        latitude: z
            .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
        longitude: z
            .union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()])
            .optional()
            .nullable(),
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
            .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
            .optional(),
        availablityTo: z
            .union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.date()])
            .optional()
            .nullable(),
        views: z
            .union([z.lazy(() => IntFilterObjectSchema), z.number()])
            .optional(),
        source: z
            .union([
                z.lazy(() => EnumSourceNullableFilterObjectSchema),
                z.lazy(() => SourceSchema),
            ])
            .optional()
            .nullable(),
        paymentId: z
            .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
            .optional()
            .nullable(),
        paymentStatus: z
            .union([
                z.lazy(() => EnumPaymentStatusNullableFilterObjectSchema),
                z.lazy(() => PaymentStatusSchema),
            ])
            .optional()
            .nullable(),
    })
    .strict();

export const PostScalarWhereInputObjectSchema = Schema;
