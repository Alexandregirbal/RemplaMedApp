import { PostModel } from "server/database/models/post/model";
import type { PostData } from "server/database/models/post/types";
import mongooseConnect from "server/database/mongoose";

export const createOnePost = async (post: PostData) => {
    await mongooseConnect();

    const newPost = await PostModel.create(post);

    return newPost;
};
