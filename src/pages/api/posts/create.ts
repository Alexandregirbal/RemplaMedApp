import type { NextApiRequest, NextApiResponse } from "next";
import { PostCreateInputObjectSchema } from "../../../../prisma/generated/schemas";
import { getServerSession } from "next-auth";
import authOptions from "../../../modules/auth/server/options";

const handleCreationForm = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ message: "Authentication required" });
    }

    const parsedBody = PostCreateInputObjectSchema.safeParse({
        ...req.body,
        author: session.user.id,
    });

    if (!parsedBody.success) {
        console.error(parsedBody.error.format());
        return res.status(400).json({
            code: "000-000",
            data: "Form data is unvalid",
            errors: parsedBody.error,
        });
    }
    const { data } = parsedBody;
    console.log(data);

    res.status(200).json({ message: "success" });
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
