import { createOneUser } from "modules/user/dao/create";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { UserDescriptionSchema } from "../../../../prisma/generated/schemas";

const addPostViewedPutBodySchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
    description: UserDescriptionSchema,
});

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(`LOG by Girbal --- | handlePost | req.body---`, req.body);

    const parsedBody = addPostViewedPutBodySchema.safeParse(req.body);

    if (!parsedBody.success) {
        console.error(parsedBody.error.format());
        return res.status(400).json({
            message: "failed",
            data: "Data is unvalid",
            errors: parsedBody.error,
        });
    }

    const user = await createOneUser(parsedBody.data);
    if (!user) {
        return res.status(400).json({
            message: "failed",
            data: "User not created",
        });
    }

    res.status(200).json({ message: "success" });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/auth/signup`);

    if (req.method === "POST") {
        return await handlePost(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
