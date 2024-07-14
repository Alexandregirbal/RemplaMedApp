import type { Model } from "mongoose";
import { model, models } from "mongoose";
import { postSchema } from "./schema";
import type { Post } from "./types";

export const PostModel =
    (models.Post as Model<Post>) ?? model("Post", postSchema);
