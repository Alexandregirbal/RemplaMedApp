import { baseMongooseObjectZod } from "server/database/types";
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
    authorId: z.string(),
    published: z.boolean(),
    intent: z.nativeEnum(PostIntent),
    title: z.string().optional(),
    postalCode: z.string(),
    city: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    message: z.string(),
    availablityFrom: z.coerce.string(),
    availablityTo: z.coerce.string().optional(),
    views: z.number(),
    source: z.nativeEnum(PostSource).optional(),
    paymentId: z.string().optional(),
    paymentStatus: z.nativeEnum(PaymentStatus).optional(),
});

export type PostData = z.infer<typeof postDataZod>;

const postZod = baseMongooseObjectZod.merge(postDataZod);

export type Post = z.infer<typeof postZod>;
