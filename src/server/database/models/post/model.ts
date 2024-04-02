import { model } from "mongoose";
import { postSchema } from "./schema";

export const PostModel = model("Post", postSchema);
