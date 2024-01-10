import { PaymentStatus } from "@mollie/api-client";
import { getPaymentIntent } from "modules/payments/getPaymentIntent";
import { setPublishedPost } from "modules/post/dao/update";
import { updatePaymentStatus } from "modules/post/services/updatePaymentStatus";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "server/db";

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id } = req.body;

    if (!id || typeof id !== "string") {
        return res
            .status(400)
            .json({ message: "A valid payment id is required" });
    }

    const post = await prisma.post.findFirst({ where: { paymentId: id } });

    if (!post) {
        return res.status(400).json({
            message: "Payment id does not have any corresponding post",
        });
    }

    const payment = await getPaymentIntent({ id });

    const { status } = payment;
    void updatePaymentStatus({ postId: post.id, status });
    if (status === PaymentStatus.paid) {
        await setPublishedPost(post.id);
    }

    return res.status(200).json({ success: true });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(`${req.method ?? ""} /api/payment/webhook`);

    if (req.method === "POST") {
        return await handlePost(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
