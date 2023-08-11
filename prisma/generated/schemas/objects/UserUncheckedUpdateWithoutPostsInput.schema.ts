import { z } from "zod";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from "./NullableDateTimeFieldUpdateOperationsInput.schema";
import { UserDescriptionSchema } from "../enums/UserDescription.schema";
import { NullableEnumUserDescriptionFieldUpdateOperationsInputObjectSchema } from "./NullableEnumUserDescriptionFieldUpdateOperationsInput.schema";
import { UserUpdaterolesInputObjectSchema } from "./UserUpdaterolesInput.schema";
import { RoleSchema } from "../enums/Role.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { UserUpdatepostsViewedInputObjectSchema } from "./UserUpdatepostsViewedInput.schema";
import { AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./AccountUncheckedUpdateManyWithoutUserNestedInput.schema";
import { SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./SessionUncheckedUpdateManyWithoutUserNestedInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> = z
    .object({
        id: z
            .union([
                z.string(),
                z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        name: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        email: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        password: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        emailVerified: z
            .union([
                z.date(),
                z.lazy(
                    () => NullableDateTimeFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        image: z
            .union([
                z.string(),
                z.lazy(
                    () => NullableStringFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        description: z
            .union([
                z.lazy(() => UserDescriptionSchema),
                z.lazy(
                    () =>
                        NullableEnumUserDescriptionFieldUpdateOperationsInputObjectSchema
                ),
            ])
            .optional()
            .nullable(),
        roles: z
            .union([
                z.lazy(() => UserUpdaterolesInputObjectSchema),
                z.lazy(() => RoleSchema).array(),
            ])
            .optional(),
        createdAt: z
            .union([
                z.date(),
                z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
            ])
            .optional(),
        postsViewed: z
            .union([
                z.lazy(() => UserUpdatepostsViewedInputObjectSchema),
                z.string().array(),
            ])
            .optional(),
        accounts: z
            .lazy(
                () =>
                    AccountUncheckedUpdateManyWithoutUserNestedInputObjectSchema
            )
            .optional(),
        sessions: z
            .lazy(
                () =>
                    SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema
            )
            .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutPostsInputObjectSchema = Schema;
