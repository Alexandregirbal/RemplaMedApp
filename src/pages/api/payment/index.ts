import { getServerAuthSession } from "modules/auth/server";
import { getPayment } from "modules/payments";
import { openPostPayment } from "modules/post/dao/update";
import type { NextApiRequest, NextApiResponse } from "next";
import { type Session } from "next-auth";
import { getDomainUrl } from "server/domain";
import { isMobile } from "server/isMobile";

const PRODUCTS = ["post"];

const handleGet = async ({
    req,
    res,
    user,
}: {
    req: NextApiRequest;
    res: NextApiResponse;
    user: Session["user"];
}) => {
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

    const domainUrl = getDomainUrl();
    const { id: userId, email: userEmail } = user;
    const { paymentUrl, paymentId } = await getPayment({
        paymentIntentParams: {
            amount: 5.9,
            description: "RemplaMed: Publication d'un post",
            metadata: {
                userId,
                userEmail,
                postId,
                domain: domainUrl,
                origin: isMobile(req) ? "mobile" : "desktop",
            },
            redirectUrl: `${domainUrl}/users/myPosts`,
            cancelUrl: `${domainUrl}`,
            webhookUrl: `${domainUrl}/api/payment/webhook`,
        },
    });

    await openPostPayment({ postId, paymentId });
    return res.status(200).json({ paymentUrl });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/payment`);
    const session = await getServerAuthSession({ req, res });
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "GET") {
        return await handleGet({ req, res, user: session.user });
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
