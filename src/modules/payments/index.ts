import { createPayment } from "./createPaymentIntent";
import type { CreatePayment } from "./types";

export const getPayment = async ({
    createPaymentParams,
}: {
    createPaymentParams: Parameters<CreatePayment>[0];
}) => {
    const payment = await createPayment(createPaymentParams);

    const molliePaymentUrl = payment._links.checkout?.href;
    if (!molliePaymentUrl) throw new Error("Payment url is not defined."); // Undefined for recurring payments
    const paymentId = payment.id;

    return { paymentUrl: molliePaymentUrl, paymentId };
};
