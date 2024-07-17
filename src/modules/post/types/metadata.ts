import { z } from "zod";

const metadataZod = z.object({
    totalOverallPosts: z.number(),
    totalRecentPosts: z.number(),
});

export type MetaData = z.infer<typeof metadataZod>;

export const isMetaData = (data: unknown): data is MetaData =>
    metadataZod.safeParse(data).success;
