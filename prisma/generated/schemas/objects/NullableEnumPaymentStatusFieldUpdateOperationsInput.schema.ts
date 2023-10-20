import { z } from "zod";
import { PaymentStatusSchema } from "../enums/PaymentStatus.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.NullableEnumPaymentStatusFieldUpdateOperationsInput> =
    z
        .object({
            set: z
                .lazy(() => PaymentStatusSchema)
                .optional()
                .nullable(),
        })
        .strict();

export const NullableEnumPaymentStatusFieldUpdateOperationsInputObjectSchema =
    Schema;
