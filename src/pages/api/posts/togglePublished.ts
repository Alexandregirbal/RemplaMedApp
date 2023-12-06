import { togglePublished } from "modules/post/dao/update";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const togglePublishedPutBodySchema = z.object({
    postId: z.string(),
});

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    const parsedBody = togglePublishedPutBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        console.error(parsedBody.error.format());
        return res.status(400).json({
            message: "failed",
            data: "Data is unvalid",
            errors: parsedBody.error,
        });
    }

    const result = await togglePublished(parsedBody.data.postId);
    if (!result.success) {
        return res.status(400).json({
            message: "failed",
            data: result.error,
        });
    }
    await Promise.all([res.revalidate(`/posts/${parsedBody.data.postId}`)]);
    res.status(200).json({ message: "success" });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/posts/togglePublished`);

    if (req.method === "PUT") {
        return await handlePut(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
