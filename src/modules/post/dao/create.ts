import { PostModel } from "server/database/models/post/model";
import { postDataZod } from "server/database/models/post/types";
import mongooseConnect from "server/database/mongoose";
import type { z } from "zod";

export const createPostInputZod = postDataZod.strict();

type CreatePostInput = z.infer<typeof createPostInputZod>;

export const createOnePost = async (post: CreatePostInput) => {
    await mongooseConnect();

    const newPost = await PostModel.create({
        ...post,
    });

    return newPost;
};
