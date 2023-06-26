import { getServerAuthSession } from "modules/auth/server";
import { updateProfile } from "modules/user/dao/update";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const updateBodySchema = z.object({
    name: z.string().nonempty(),
});

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerAuthSession({ req, res });
    if (!session) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const userId = session.user.id;

    const parsedBody = updateBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        console.error(parsedBody.error.format());
        return res.status(400).json({
            message: "failed",
            data: "Data is unvalid",
            errors: parsedBody.error,
        });
    }

    const result = await updateProfile({
        userId,
        name: parsedBody.data.name,
    });
    if (!result) {
        return res.status(400).json({
            message: "failed",
            data: "user not found",
        });
    }
    res.status(200).json({ message: "success" });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/users/update`);

    if (req.method === "PUT") {
        return await handlePut(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
