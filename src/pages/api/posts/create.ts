import authOptions from "modules/auth/server/options";
import { createOnePost } from "modules/post/dao/create";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { postDataZod } from "server/database/models/post/types";

const handleCreationForm = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const parsedPost = postDataZod.safeParse({
        authorId: session.user._id,
        ...req.body,
        published: true,
    });

    if (!parsedPost.success) {
        console.error(parsedPost.error.format());
        return res.status(400).json({
            code: "posts-creation-form-invalid",
            message: "Post content does not match validation schema",
            errors: parsedPost.error,
        });
    }
    const { data } = parsedPost;
    const post = await createOnePost(data);

    res.status(200).json({ message: "success", postId: post._id });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/posts/create`);

    if (req.method === "POST") {
        return await handleCreationForm(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
