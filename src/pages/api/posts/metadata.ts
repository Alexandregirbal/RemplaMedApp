import { getMetaData } from "modules/post/dao/find";
import type { NextApiRequest, NextApiResponse } from "next";

const handleGetMetadata = async (req: NextApiRequest, res: NextApiResponse) => {
    const metadata = await getMetaData();
    res.status(200).json({ message: "success", metadata });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/posts/metadata`);

    if (req.method === "GET") {
        return await handleGetMetadata(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
