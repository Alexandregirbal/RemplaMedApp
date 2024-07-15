import { PaymentStatus } from "@mollie/api-client";
import { getPaymentIntent } from "modules/payments/getPaymentIntent";
import { findPostByPaymentId } from "modules/post/dao/find";
import { setPublishedPost, updatePaymentStatus } from "modules/post/dao/update";
import type { NextApiRequest, NextApiResponse } from "next";

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id: paymentId } = req.body;

    if (!paymentId || typeof paymentId !== "string") {
        return res
            .status(400)
            .json({ message: "A valid payment id is required" });
    }

    const post = await findPostByPaymentId(paymentId);

    if (!post) {
        return res.status(400).json({
            message: "Payment id does not have any corresponding post",
        });
    }

    const payment = await getPaymentIntent({ id: paymentId });

    const { status } = payment;
    void updatePaymentStatus({ postId: post._id.toString(), status });
    if (status === PaymentStatus.paid) {
        await setPublishedPost(post._id.toString());
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
