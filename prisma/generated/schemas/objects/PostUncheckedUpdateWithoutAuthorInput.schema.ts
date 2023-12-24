import { z } from "zod";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { BoolFieldUpdateOperationsInputObjectSchema } from "./BoolFieldUpdateOperationsInput.schema";
import { PostIntentSchema } from "../enums/PostIntent.schema";
import { EnumPostIntentFieldUpdateOperationsInputObjectSchema } from "./EnumPostIntentFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { NullableFloatFieldUpdateOperationsInputObjectSchema } from "./NullableFloatFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from "./NullableDateTimeFieldUpdateOperationsInput.schema";
import { IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { SourceSchema } from "../enums/Source.schema";
import { NullableEnumSourceFieldUpdateOperationsInputObjectSchema } from "./NullableEnumSourceFieldUpdateOperationsInput.schema";
import { PaymentStatusSchema } from "../enums/PaymentStatus.schema";
import { NullableEnumPaymentStatusFieldUpdateOperationsInputObjectSchema } from "./NullableEnumPaymentStatusFieldUpdateOperationsInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z
    .object({
        id: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        published: z
            .union([
                z.boolean(),
                z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        intent: z
            .union([
                z.lazy(() => PostIntentSchema),
                z.lazy(
                    () => EnumPostIntentFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional(),
        title: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        postalCode: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        city: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        latitude: z
            .union([
                z.number(),
                z.lazy(
                    () => NullableFloatFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        longitude: z
            .union([
                z.number(),
                z.lazy(
                    () => NullableFloatFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        message: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        createdAt: z
            .union([
                z.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        updatedAt: z
            .union([
                z.date(),
                z.lazy(
                    () => NullableDateTimeFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        availablityFrom: z
            .union([
                z.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        availablityTo: z
            .union([
                z.date(),
                z.lazy(
                    () => NullableDateTimeFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        views: z
            .union([
                z.number(),
                z.lazy(() => IntFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        source: z
            .union([
                z.lazy(() => SourceSchema),
                z.lazy(
                    () =>
                        NullableEnumSourceFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        paymentId: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        paymentStatus: z
            .union([
                z.lazy(() => PaymentStatusSchema),
                z.lazy(
                    () =>
                        NullableEnumPaymentStatusFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
    })
    .strict();

export const PostUncheckedUpdateWithoutAuthorInputObjectSchema = Schema;
