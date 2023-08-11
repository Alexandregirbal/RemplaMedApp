import { z } from "zod";
import { UserDescriptionSchema } from "../enums/UserDescription.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.NullableEnumUserDescriptionFieldUpdateOperationsInput> =
    z
        .object({
            set: z
                .lazy(() => UserDescriptionSchema)
                .optional()
                .nullable(),
        })
        .strict();

export const NullableEnumUserDescriptionFieldUpdateOperationsInputObjectSchema =
    Schema;
