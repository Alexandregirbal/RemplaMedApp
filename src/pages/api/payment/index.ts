import { getPayment } from "modules/payments";
import type { NextApiRequest, NextApiResponse } from "next";

const PRODUCTS = ["post"];

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(`~~~~~ LOG by Girbal | handleGet | req: `, req.query, req.body);
    const { product, postId } = req.query;
    if (!product || typeof product !== "string") {
        return res
            .status(400)
            .json({ message: "A valid product name is required" });
    }
    if (!postId || typeof postId !== "string") {
        return res.status(400).json({ message: "A valid post id is required" });
    }

    if (!PRODUCTS.includes(product)) {
        return res.status(400).json({ message: "Invalid product name" });
    }

    const { paymentUrl, paymentId } = await getPayment({
        paymentIntentParams: {
            amount: 5.9,
            description: "RemplaMed: Publication d'un post",
            metadata: {
                postId,
            },
            redirectUrl: `https://rempla-med.fr/posts/${postId}`,
            webhookUrl: `https://rempla-med.fr/api/payment/webhook`,
        },
    });
    console.log(
        `~~~~~ LOG by Girbal | file: index.ts:33 | handleGet | paymentId: `,
        paymentId
    );

    // TODO: save paymentId in the database
    return res.status(200).json({ paymentUrl });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/payment`);

    if (req.method === "GET") {
        return await handleGet(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
