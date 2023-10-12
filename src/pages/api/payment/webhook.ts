import { PaymentStatus } from "@mollie/api-client";
import { getPaymentIntent } from "modules/payments/getPaymentIntent";
import { updatePaymentStatus } from "modules/post/services/updatePaymentStatus";
import type { NextApiRequest, NextApiResponse } from "next";

const PRODUCTS = ["post"];

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(
        `~~~~~ LOG by Girbal | file: webhook.ts:7 | handlePost | handlePost: `,
        req.query,
        req.body
    );

    const { id } = req.query;
    if (!id || typeof id !== "string") {
        return res
            .status(400)
            .json({ message: "A valid payment id is required" });
    }

    const payment = await getPaymentIntent({ id });
    const status = payment.status;

    // TODO: update payment status in database
    if (status === PaymentStatus.paid) {
        updatePaymentStatus({ paymentId: id, status });
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
