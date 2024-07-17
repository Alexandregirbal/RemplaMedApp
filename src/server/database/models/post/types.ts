import { Types } from "mongoose";
import { baseMongoObject } from "server/database/types";
import { z } from "zod";

export enum PostSource {
    STETHONET = "STETHONET",
}

export enum PaymentStatus {
    open = "open",
    canceled = "canceled",
    pending = "pending",
    authorized = "authorized",
    expired = "expired",
    failed = "failed",
    paid = "paid",
}

export enum PostIntent {
    replacementOffer = "replacementOffer",
    replacementSearch = "replacementSearch",
    partnership = "partnership",
    transaction = "transaction",
    other = "other",
}

export const isPostIntent = (value: string): value is PostIntent => {
    const postIntentZod = z.nativeEnum(PostIntent);
    return postIntentZod.safeParse(value).success;
};

export const postDataZod = z.object({
    authorId: z.instanceof(Types.ObjectId),
    published: z.boolean().default(false),
    intent: z.nativeEnum(PostIntent),
    postalCode: z.string(),
    message: z.string(),
    availablityFrom: z.coerce.string(),
    views: z.number().default(0),
    title: z.string().optional(),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    availablityTo: z.coerce.string().optional(),
    source: z.nativeEnum(PostSource).optional(),
    paymentId: z.string().optional(),
    paymentStatus: z.nativeEnum(PaymentStatus).optional(),
});

export type PostData = z.infer<typeof postDataZod>;

const postZod = postDataZod.merge(baseMongoObject);

export type Post = z.infer<typeof postZod>;
