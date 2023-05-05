import type { NextApiRequest, NextApiResponse } from "next";
import { PostCreateInputObjectSchema } from "../../../../prisma/generated/schemas";

const handleCreationForm = (req: NextApiRequest, res: NextApiResponse) => {
    console.log(
        `LOG by Girbal --- | req.body---`,
        JSON.stringify(req.body, null, 2)
    );
    const parsedBody = PostCreateInputObjectSchema.safeParse(req.body);

    if (!parsedBody.success) {
        console.error(parsedBody.error.format());
        return res
            .status(400)
            .json({
                code: "000-000",
                data: "Form data is unvalid",
                errors: parsedBody.error,
            });
    }
    const { data } = parsedBody;
    console.log(data);

    res.status(200).json({ message: "success" });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(`${req.method ?? ""} /api/posts/create`);

    if (req.method === "POST") {
        handleCreationForm(req, res);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
