import { getServerAuthSession } from "modules/auth/server";
import { addPostViewed } from "modules/user/dao/update";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const addPostViewedPutBodySchema = z.object({
    postId: z.string(),
});

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerAuthSession({ req, res });
    if (!session) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const userId = session.user._id;

    const parsedBody = addPostViewedPutBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        console.error(parsedBody.error.format());
        return res.status(400).json({
            message: "failed",
            data: "Data is unvalid",
            errors: parsedBody.error,
        });
    }
    const result = await addPostViewed({
        postId: parsedBody.data.postId,
        userId: userId,
    });
    if (!result) {
        return res.status(400).json({
            message: "failed",
            data: "postId or user not found",
        });
    }
    res.status(200).json({ message: "success" });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/users/postViewed`);

    if (req.method === "PUT") {
        return await handlePut(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
