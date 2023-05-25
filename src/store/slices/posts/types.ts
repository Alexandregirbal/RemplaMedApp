import { type Post } from "@prisma/client";
import { type MetaData } from "modules/post/types/metadata";

export type PostsState = {
    metadata: MetaData;
    data: Post[];
};
