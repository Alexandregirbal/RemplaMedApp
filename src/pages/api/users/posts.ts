import { getServerAuthSession } from "modules/auth/server";
import { findUserPosts } from "modules/post/dao/find";
import type { NextApiRequest, NextApiResponse } from "next";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerAuthSession({ req, res });
    if (!session) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const userId = session.user.id;
    const userPosts = await findUserPosts(userId);

    res.status(200).json(userPosts);
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/users/posts`);

    if (req.method === "GET") {
        return await handleGet(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
