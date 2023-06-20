import { z } from "zod";
import { StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema } from "./NullableDateTimeFieldUpdateOperationsInput.schema";
import { UserUpdaterolesInputObjectSchema } from "./UserUpdaterolesInput.schema";
import { RoleSchema } from "../enums/Role.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { UserUpdatepostsViewedInputObjectSchema } from "./UserUpdatepostsViewedInput.schema";
import { SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from "./SessionUncheckedUpdateManyWithoutUserNestedInput.schema";
import { PostUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema } from "./PostUncheckedUpdateManyWithoutAuthorNestedInput.schema";

import type { Prisma } from "@prisma/client";

const Schema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z
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
        sessions: z
            .lazy(
                () =>
                    SessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema
            )
            .optional(),
        posts: z
            .lazy(
                () =>
                    PostUncheckedUpdateManyWithoutAuthorNestedInputObjectSchema
            )
            .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutAccountsInputObjectSchema = Schema;
