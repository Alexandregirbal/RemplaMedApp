import { sendEmail } from "modules/email/send";
import { createOneUser } from "modules/user/dao/create";
import { findOneUser } from "modules/user/dao/find";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { UserDescriptionSchema } from "../../../../prisma/generated/schemas";

const addPostViewedPutBodySchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
    description: UserDescriptionSchema,
    phoneNumber: z.string().min(10).optional(),
});

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    const parsedBody = addPostViewedPutBodySchema.safeParse(req.body);

    if (!parsedBody.success) {
        console.error(parsedBody.error.format());
        return res.status(400).json({
            message: "failed",
            data: "Data is unvalid",
            errors: parsedBody.error,
        });
    }

    const userAlreadyExist = await findOneUser(parsedBody.data.email);
    if (userAlreadyExist) {
        return res.status(400).json({
            message: "failed",
            data: "User already exists",
        });
    }

    const user = await createOneUser(parsedBody.data);
    if (!user) {
        return res.status(400).json({
            message: "failed",
            data: "User not created",
        });
    }

    sendEmail({
        email: "alexandre@rempla-med.fr",
        subject: "New RemplaMed user",
        text: `New user: ${user.name ?? "unknown name"} (${
            user.email ?? "unknown email"
        })`,
    });

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
